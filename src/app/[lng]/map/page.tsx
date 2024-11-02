import { PageContainer, Divider } from "@/components/atoms/";
import { AddPlaceSection } from "@/components/molecules";
import MapSet from "@/components/organism/MapSet";

const MapPage = async ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const lng = params.lng;

  return (
    <PageContainer>
      <MapSet lng={lng} />
      <Divider />
      <AddPlaceSection lng={lng} />
    </PageContainer>
  );
};

export default MapPage;
