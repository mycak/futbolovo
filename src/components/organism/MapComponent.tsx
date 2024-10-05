"use client";
import { GoogleMap, MarkerF, MarkerClustererF } from "@react-google-maps/api";
import { PageWrapper } from "../atoms";
import { generateMapIcon } from "@/utils";
import { mockedEvents } from "@/constants/mocks";
import { useEffect, useRef, useState } from "react";
import { MapInfoBox, MapInfoBoxExtended } from "../molecules";
import { BulkEvents, Events } from "@/types/common";
import { useEventsStore } from "@/stores";
import { clusterConfig } from "@/configs/googleApi";
import { useMap } from "@/hooks";
import { Cluster } from "@react-google-maps/marker-clusterer";

const containerStyle = {
  width: "100%",
  height: "65vh",
  minHeight: "600px",
  borderRadius: "0.125rem",
};

//TODO: make it dynamic based on user location
const center = {
  lat: 52.229676,
  lng: 21.017532,
};

const MapComponent = () => {
  const filters = useEventsStore((state) => state.filters);
  const mapRef = useRef<google.maps.Map | null>(null);

  const [bulkEvents, setBulkEvents] = useState<BulkEvents>({
    position: undefined,
    items: [],
  });

  const { filterEvents, onClusterClick } = useMap(mapRef);

  //TEMPORARY EVENTS STATE
  const [events, setEvents] = useState<Events>(mockedEvents);
  useEffect(() => {
    const filteredEvents = filterEvents(mockedEvents);
    setEvents(filteredEvents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const [currentEventId, setCurrentEventId] = useState<string | number | null>(
    null
  );

  const googlePinIconConfig = {
    scaledSize: new window.google.maps.Size(45, 45),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(10, 20),
  };

  const handleEventClick = (id: string | number) => {
    setBulkEvents({ items: [], position: undefined });
    setCurrentEventId(id);
  };

  const onBulkEventsSetCallback = (
    newPosition: google.maps.LatLng,
    eventsData: Events
  ) => {
    setCurrentEventId(null);
    setBulkEvents({ position: newPosition, items: eventsData });
  };

  const onClusterClickAction = (cluster: Cluster) => {
    onClusterClick(cluster, onBulkEventsSetCallback, events);
  };

  return (
    <PageWrapper>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        <MarkerClustererF
          options={clusterConfig}
          onClick={onClusterClickAction}
          zoomOnClick={false}
        >
          {(clusterer) => (
            <>
              {events.map((event) => {
                //TODO: Add default pin instead
                if (!event.location.latitude || !event.location.longitude)
                  return null;
                return (
                  <MarkerF
                    key={event.id}
                    clusterer={clusterer}
                    title={event.id}
                    position={{
                      lat: event.location.latitude,
                      lng: event.location.longitude,
                    }}
                    animation={google.maps.Animation.DROP}
                    icon={{
                      url: generateMapIcon(event.category),
                      ...googlePinIconConfig,
                    }}
                    onClick={() => handleEventClick(event.id)}
                  >
                    <MapInfoBox
                      event={event}
                      resetCurrent={() => setCurrentEventId(null)}
                      currentId={currentEventId}
                    />
                  </MarkerF>
                );
              })}
            </>
          )}
        </MarkerClustererF>
        {bulkEvents.items.length > 0 ? (
          <MapInfoBoxExtended
            events={bulkEvents}
            mapRef={mapRef}
            close={() => setBulkEvents({ items: [], position: undefined })}
          />
        ) : null}
      </GoogleMap>
    </PageWrapper>
  );
};

export default MapComponent;
