"use client";

import { PageContainer, Divider } from "@/components/atoms/";
import { AddPlaceSection } from "@/components/molecules";
import { Filters, MapComponent } from "@/components/organism/";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

const DashboardPage = () => {
  const [libraries] = useState<Libraries>([
    "places",
    "routes",
    "maps",
    "marker",
  ]);
  const { isLoaded } = useJsApiLoader({
    id: "futbolovo",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY as string,
    language: "pl",
    region: "PL",
    version: "weekly",
    libraries,
  });

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
