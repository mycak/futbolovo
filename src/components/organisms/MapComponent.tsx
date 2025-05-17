'use client';
import { GoogleMap, MarkerF, MarkerClustererF } from '@react-google-maps/api';
import { generateMapIcon } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import { BulkEvents, Events } from '@/types/common';
import { useEventsStore, useMapStore } from '@/stores';
import { clusterConfig } from '@/configs/googleApi';
import { useMap } from '@/hooks';
import { Cluster } from '@react-google-maps/marker-clusterer';
import { MAX_ZOOM_LEVEL } from '@/constants/common';
import PageWrapper from '../atoms/PageWrapper';
import MapInfoBox from '../molecules/MapComponents/MapInfoBox';
import MapInfoBoxExtended from '../molecules/MapComponents/MapInfoBoxExtended';
import DynamicLoader from '../atoms/DynamicLoader';

const containerStyle = {
  width: '100%',
  height: '65vh',
  minHeight: '600px',
  borderRadius: '0.125rem',
};

const MapComponent = ({
  mapInitialPosition,
}: {
  mapInitialPosition: { lng: number; lat: number };
}) => {
  const filters = useEventsStore((state) => state.filters);
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapZoom = useMapStore((state) => state.mapZoom);

  const [bulkEvents, setBulkEvents] = useState<BulkEvents>({
    position: undefined,
    items: [],
  });
  const { onClusterClick, saveMapData, events, areEventsLoading } =
    useMap(mapRef);

  useEffect(() => {
    if (filters.coords?.latitude && filters.coords?.longitude) {
      mapRef.current?.panTo(
        new google.maps.LatLng(
          filters.coords.latitude,
          filters.coords.longitude
        )
      );
    }
  }, [filters]);

  const [currentEventId, setCurrentEventId] = useState<string | number | null>(
    null
  );

  const googlePinIconConfig = {
    scaledSize: new window.google.maps.Size(45, 45),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(10, 20),
  };

  const handleEventClick = (
    id: string | number,
    markerPosition: google.maps.LatLng
  ) => {
    setBulkEvents({ items: [], position: undefined });
    setCurrentEventId(id); // Center the map on the marker with a slight offset for better mobile viewing
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      const offsetY = -30; // Increased offset to make room for the InfoBox at the top
      const latLng = new google.maps.LatLng(
        markerPosition.lat(),
        markerPosition.lng()
      );

      // Use panTo with a slight delay to ensure smooth transition
      setTimeout(() => {
        mapRef.current?.panTo(latLng);
        // Additional offset for mobile view to ensure the top of the InfoBox is visible
        mapRef.current?.panBy(0, offsetY);
      }, 50);
    } else {
      mapRef.current?.panTo(markerPosition);
    }
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
        center={mapInitialPosition}
        options={{ clickableIcons: false, maxZoom: MAX_ZOOM_LEVEL }}
        zoom={mapZoom}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {areEventsLoading ? (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <DynamicLoader />
          </div>
        ) : null}

        <MarkerClustererF
          options={clusterConfig}
          onClick={onClusterClickAction}
          zoomOnClick={false}
        >
          {(clusterer) => (
            <>
              {events.map((event) => {
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
                    onClick={(marker) => {
                      const markerPosition =
                        marker.latLng as google.maps.LatLng;
                      handleEventClick(event.id, markerPosition);
                    }}
                  >
                    <MapInfoBox
                      event={event}
                      resetCurrent={() => setCurrentEventId(null)}
                      saveMapData={saveMapData}
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
            saveMapData={saveMapData}
            close={() => setBulkEvents({ items: [], position: undefined })}
          />
        ) : null}
      </GoogleMap>
    </PageWrapper>
  );
};

export default MapComponent;
