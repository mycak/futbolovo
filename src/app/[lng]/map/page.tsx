import Divider from '@/components/atoms/Divider';
import PageContainer from '@/components/atoms/PageContainer';
import AddPlaceSection from '@/components/molecules/AddPlaceSection';
import MapSet from '@/components/organism/MapSet';

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
