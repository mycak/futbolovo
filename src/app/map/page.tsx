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
import { useEffect, useState } from "react";
import { generateMapCoordsFromCurrentLocation } from "@/utils";

const MapPage = () => {
  const { isLoaded } = useJsApiLoader(googleApiConfig);
  const [mapInitialPosition, setMapInitialPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  //GET USER LOCATION
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (data) =>
          generateMapCoordsFromCurrentLocation(data, setMapInitialPosition),
        () => console.log("Geolocation not supported")
      );
    } else {
      setMapInitialPosition(initialMapCords);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer>
      <Divider />
      {isLoaded && mapInitialPosition ? (
        <div>
          <Filters />
          <MapComponent mapInitialPosition={mapInitialPosition} />
        </div>
      ) : (
        <PageWrapper>
          <Loader />
        </PageWrapper>
      )}
      <Divider />
      <AddPlaceSection />
    </PageContainer>
  );
};

export default MapPage;
