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
import { googleApiConfig } from "@/configs/googleApi";

const MapPage = () => {
  const { isLoaded } = useJsApiLoader(googleApiConfig);

  return (
    <PageContainer>
      <Divider />
      {isLoaded ? (
        <div>
          <Filters />
          <MapComponent />
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
