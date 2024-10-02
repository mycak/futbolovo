"use client";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { PageWrapper } from "../atoms";
import { generateMapIcon } from "@/utils";
import { mockedEvents } from "@/constants/mocks";
import { useEffect, useState } from "react";
import { MapInfoBox } from "../molecules";
import { EventCategoryEnum, Events } from "@/types/common";
import { useEventsStore } from "@/stores";

const containerStyle = {
  width: "100%",
  height: "65vh",
  minHeight: "600px",
  borderRadius: "0.125rem",
};

const center = {
  lat: 52.229676,
  lng: 21.017532,
};

const MapComponent = () => {
  const filters = useEventsStore((state) => state.filters);

  //TEMMPORARY EVENTS STATE
  const [events, setEvents] = useState<Events>(mockedEvents);

  useEffect(() => {
    const filteredEvents = mockedEvents.filter((event) => {
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
      //TODO: LOCATION CHECK

      return true;
    });

    setEvents(filteredEvents);
  }, [filters]);

  const [currentEventId, setCurrentEventId] = useState<string | number | null>(
    null
  );

  const googlePinIconConfig = {
    scaledSize: new window.google.maps.Size(45, 45),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(10, 20),
  };

  return (
    <PageWrapper>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {events.map((event) => {
          //TODO: Add default pin instead
          if (!event.location.latitude || !event.location.longitude)
            return null;
          return (
            <Marker
              key={event.id}
              position={{
                lat: event.location.latitude,
                lng: event.location.longitude,
              }}
              icon={{
                url: generateMapIcon(event.category),
                ...googlePinIconConfig,
              }}
              onClick={() => setCurrentEventId(event.id)}
            >
              <MapInfoBox
                event={event}
                resetCurrent={() => setCurrentEventId(null)}
                currentId={currentEventId}
              />
            </Marker>
          );
        })}
      </GoogleMap>
    </PageWrapper>
  );
};

export default MapComponent;
