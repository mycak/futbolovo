"use client";
import { PageContainer, PageWrapper, Loader } from "@/components/atoms/";
import { AddEventWizard } from "@/components/organism";
import { useJsApiLoader } from "@react-google-maps/api";
import { googleApiConfig } from "@/configs/googleApi";
import { Back } from "@/components/molecules";

const AddEventPage = () => {
  const { isLoaded } = useJsApiLoader(googleApiConfig);
  return (
    <PageContainer>
      <PageWrapper>
        <div className="md:bg-gray-900 py-8 sm:px-4 md:px-8 mx-auto max-w-max rounded-sm">
          <div className="mx-auto max-w-max">
            <i className="fa-solid fa-map-location-dot fa-5x text-ivory-150 mx-auto" />
          </div>
          <h2 className="text-2xl md:text-3xl text-center text-grass-20 mt-4 md:mt-8">
            Dodaj punkt na mapie
          </h2>
          {isLoaded ? <AddEventWizard /> : <Loader />}
        </div>
        <Back classNames="mx-auto mt-8" />
      </PageWrapper>
    </PageContainer>
  );
};

export default AddEventPage;
