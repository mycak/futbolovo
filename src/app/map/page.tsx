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

const MapPage = () => {
  const { isLoaded } = useJsApiLoader(googleApiConfig);
  const mapCenter = useMapStore((state) => state.center);
  const setMapCenter = useMapStore((state) => state.setCenter);

  //GET USER LOCATION
  useEffect(() => {
    if (mapCenter) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (data) => generateMapCoordsFromCurrentLocation(data, setMapCenter),
        () => console.log("Geolocation not supported")
      );
    } else {
      setMapCenter(initialMapCords);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer>
      <Divider />
      {isLoaded && mapCenter ? (
        <div>
          <Filters />
          <MapComponent mapInitialPosition={mapCenter} />
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
