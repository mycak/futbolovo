'use client';
import { useJsApiLoader } from '@react-google-maps/api';
import { googleApiConfig, initialMapCords } from '@/configs/googleApi';
import { useEffect } from 'react';
import { generateMapCoordsFromCurrentLocation } from '@/utils';
import { useMapStore } from '@/stores';
import { Filters, MapComponent } from '@/components/organism/';
import { PageWrapper, Loader } from '@/components/atoms/';

const MapSet = ({ lng }: { lng: string }) => {
  const { isLoaded } = useJsApiLoader(googleApiConfig(lng));
  const mapCenter = useMapStore((state) => state.center);
  const setMapCenter = useMapStore((state) => state.setCenter);
  const setZoom = useMapStore((state) => state.setZoom);

  //GET USER LOCATION
  useEffect(() => {
    if (mapCenter) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        generateMapCoordsFromCurrentLocation(data, setMapCenter);
        setZoom(11);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isLoaded ? (
        <div>
          <Filters />
          <MapComponent mapInitialPosition={initialMapCords} />
        </div>
      ) : (
        <PageWrapper classNames='min-h-96 pt-16'>
          <Loader lng={lng} />
        </PageWrapper>
      )}
    </div>
  );
};

export default MapSet;
