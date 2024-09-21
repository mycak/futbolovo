"use client";
import {
  PageContainer,
  Divider,
  DashboardHeading,
  PageWrapper,
} from "@/components/atoms/";
import { AddEventForm } from "@/components/organism";
import { useJsApiLoader } from "@react-google-maps/api";
import { googleApiConfig } from "@/configs/googleApi";

const DashboardPage = () => {
  const { isLoaded } = useJsApiLoader(googleApiConfig);
  return (
    <PageContainer>
      <DashboardHeading classNames="my-4" />
      <Divider />
      <PageWrapper classNames="pt-4">
        <div className="bg-gray-900 py-8 px-12 mx-auto max-w-max rounded-sm">
          <div className="mx-auto max-w-max">
            <i className="fa-solid fa-map-location-dot fa-5x text-ivory-150 mx-auto" />
          </div>
          <h2 className="text-3xl text-center text-grass-20 mt-8">
            Dodaj punkt na mapie
          </h2>
          {isLoaded ? <AddEventForm /> : <div>Loading... </div>}
        </div>
      </PageWrapper>
    </PageContainer>
  );
};

export default DashboardPage;
