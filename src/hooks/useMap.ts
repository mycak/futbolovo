'use client';
import { useEventsStore, useMapStore } from '@/stores';
import { Events } from '@/types/common';
import { MutableRefObject, useEffect } from 'react';
import { Cluster } from '@react-google-maps/marker-clusterer';
import { MAX_ZOOM_LEVEL } from '@/constants/common';
import { getEvents } from '@/app/actions';
import { useQuery } from '@tanstack/react-query';

const useMap = (mapRef: MutableRefObject<google.maps.Map | null>) => {
  const filters = useEventsStore((state) => state.filters);
  const events = useEventsStore((state) => state.events);
  const setEvents = useEventsStore((state) => state.setEvents);

  const setMapZoom = useMapStore((state) => state.setZoom);
  const setMapCenter = useMapStore((state) => state.setCenter);

  const { data, isLoading: areEventsLoading } = useQuery({
    queryKey: ['events', JSON.stringify(filters)],
    queryFn: () => getEvents(filters),
  });

  useEffect(() => {
    if (data) {
      setEvents(data as unknown as Events);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const saveMapData = () => {
    const zoom = mapRef.current?.getZoom();
    setMapZoom(zoom ?? 20);
    const center = mapRef.current?.getCenter();
    if (center) {
      const lat = center.lat();
      const lng = center.lng();
      setMapCenter({ lat, lng });
    }
  };
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

    if (currentZoom > MAX_ZOOM_LEVEL - 1) {
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

  return {
    moveMapToCoords,
    onClusterClick,
    saveMapData,
    events,
    areEventsLoading,
  };
};

export { useMap };
