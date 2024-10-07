import { useEventsStore } from "@/stores";
import { EventCategoryEnum, Events } from "@/types/common";
import { MutableRefObject } from "react";
import { Cluster } from "@react-google-maps/marker-clusterer";

const useMap = (mapRef: MutableRefObject<google.maps.Map | null>) => {
  const filters = useEventsStore((state) => state.filters);

  //MARK: MAP BEHAVIORS
  //Move to cords
  const moveMapToCoords = (coords: { latitude: number; longitude: number }) => {
    if (mapRef.current) {
      mapRef.current.panTo(
        new google.maps.LatLng(coords.latitude, coords.longitude)
      );
    }
  };

  //On cluster click
  const onClusterClick = (
    cluster: Cluster,
    onBulkEventsSetCallback: (
      newPosition: google.maps.LatLng,
      eventsData: Events
    ) => void,
    events: Events
  ) => {
    const currentZoom = mapRef.current?.getZoom() ?? 20;
    const center = cluster.getCenter();
    if (center) {
      mapRef.current?.panTo(center);
    }

    if (currentZoom > 16) {
      const markers = cluster.getMarkers();
      //HERE WE WANT TO SHOW EVENTS DETAILS LIST
      const markersIds = markers.map((marker) => marker.getTitle());
      const eventsData = events.filter((event) =>
        markersIds.includes(event.id)
      );
      const newPosition = cluster.getCenter() as google.maps.LatLng;
      onBulkEventsSetCallback(newPosition, eventsData);
    } else {
      // Smooth center and zoom map
      setTimeout(() => mapRef.current?.setZoom(currentZoom + 2), 200);
    }
  };

  //MAP FILTER
  const filterEvents = (events: Events) =>
    events.filter((event) => {
      //CATEGORIES CHECK
      if (filters.categories && !filters.categories.includes(event.category)) {
        return false;
      }
      //SEARCH CHECK
      if (filters.search) {
        const search = filters.search.toLowerCase();
        const matchesSearch =
          event.name.toLowerCase().includes(search) ||
          event.description.toLowerCase().includes(search) ||
          (event.location.addressName ?? "").toLowerCase().includes(search);
        if (!matchesSearch) {
          return false;
        }
      }
      //DATES CHECK
      if (filters.dateRange) {
        const [startDate, endDate] = filters.dateRange.map((date) =>
          (date as Date).getTime()
        );

        if (event.category === EventCategoryEnum.TOURNAMENT) {
          const eventDate = (event.date as Date).getTime();
          if (eventDate < startDate || eventDate > endDate) {
            return false;
          }
        }

        if (event.category === EventCategoryEnum.CAMP) {
          const [eventStart, eventEnd] = (event.dateRange as [Date, Date]).map(
            (date) => date.getTime()
          );
          const overlaps =
            (eventStart >= startDate && eventStart <= endDate) ||
            (eventEnd >= startDate && eventEnd <= endDate);
          if (!overlaps) {
            return false;
          }
        }
      }
      return true;
    });

  return {
    moveMapToCoords,
    filterEvents,
    onClusterClick,
  };
};

export { useMap };
