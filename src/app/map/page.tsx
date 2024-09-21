"use client";

import { PageContainer, Divider } from "@/components/atoms/";
import { AddPlaceSection } from "@/components/molecules";
import { Filters, MapComponent } from "@/components/organism/";
import { useJsApiLoader } from "@react-google-maps/api";
import { googleApiConfig } from "@/configs/googleApi";

const DashboardPage = () => {
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
        <div>Loading...</div>
      )}
      <Divider />
      <AddPlaceSection />
    </PageContainer>
  );
};

export default DashboardPage;
