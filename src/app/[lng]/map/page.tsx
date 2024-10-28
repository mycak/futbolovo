"use client";

import {
  PageContainer,
  Divider,
  PageWrapper,
  Loader,
} from "@/components/atoms/";
import { AddPlaceSection } from "@/components/molecules";
import { Filters, MapComponent } from "@/components/organism/";
import { useJsApiLoader } from "@react-google-maps/api";
import { googleApiConfig, initialMapCords } from "@/configs/googleApi";
import { useEffect } from "react";
import { generateMapCoordsFromCurrentLocation } from "@/utils";
import { useMapStore } from "@/stores";

const MapPage = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const lng = params.lng;
  const { isLoaded } = useJsApiLoader(googleApiConfig);
  const mapCenter = useMapStore((state) => state.center);
  const setMapCenter = useMapStore((state) => state.setCenter);

  //GET USER LOCATION
  useEffect(() => {
    if (mapCenter) return;
    if (navigator.geolocation) {
      //SET 3 SEC TIMEOUT FOR GEOLOCATION REQUEST TO PREVENT INFINITE LOADING
      const timeoutId = setTimeout(() => {
        console.log("Geolocation request timed out");
        setMapCenter(initialMapCords);
      }, 3000);

      navigator.geolocation.getCurrentPosition(
        (data) => {
          clearTimeout(timeoutId);
          generateMapCoordsFromCurrentLocation(data, setMapCenter);
        },
        () => {
          clearTimeout(timeoutId);
          console.log("Geolocation not supported");
          setMapCenter(initialMapCords);
        }
      );
    } else {
      setMapCenter(initialMapCords);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer>
      {isLoaded && mapCenter ? (
        <div>
          <Filters />
          <MapComponent mapInitialPosition={mapCenter} />
        </div>
      ) : (
        <PageWrapper classNames="min-h-96 pt-16">
          <Loader lng={lng} />
        </PageWrapper>
      )}
      <Divider />
      <AddPlaceSection lng={lng} />
    </PageContainer>
  );
};

export default MapPage;
