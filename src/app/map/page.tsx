"use client";

import { PageContainer, Divider } from "@/components/atoms/";
import { AddPlaceSection } from "@/components/molecules";
import { Filters, MapComponent } from "@/components/organism/";
import { Libraries, LoadScript } from "@react-google-maps/api";
import { useState } from "react";

const DashboardPage = () => {
  const [libraries] = useState<Libraries>([
    "places",
    "routes",
    "maps",
    "marker",
  ]);

  // TODO: Swith LoadScript

  return (
    <LoadScript
      id="futbolovo"
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY as string}
      language="pl"
      mapIds={["futbolovo"]}
      region="PL"
      version="weekly"
      libraries={libraries}
    >
      <PageContainer>
        <Divider />
        <Filters />
        <MapComponent />
        <Divider />
        <AddPlaceSection />
      </PageContainer>
    </LoadScript>
  );
};

export default DashboardPage;
