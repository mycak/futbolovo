"use client";

import DashboardHeading from "@/components/atoms/DashboardHeading";
import PageContainer from "@/components/atoms/PageContainer";
import PageWrapper from "@/components/atoms/PageWrapper";
import Filters from "@/components/organism/Filters";
import { Libraries, LoadScript } from "@react-google-maps/api";
import { useState } from "react";
import MapComponent from "@/components/organism/MapComponent";

const DashboardPage = () => {
  const [libraries] = useState<Libraries>([
    "places",
    "routes",
    "maps",
    "marker",
  ]);

  return (
    <LoadScript
      id="futbolovo"
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY as string}
      language="pl"
      region="PL"
      version="weekly"
      libraries={libraries}
    >
      <PageContainer>
        <DashboardHeading classNames="my-4" />
        <PageWrapper classNames="mb-8">
          <Filters />
        </PageWrapper>
        <MapComponent />
      </PageContainer>
    </LoadScript>
  );
};

export default DashboardPage;
