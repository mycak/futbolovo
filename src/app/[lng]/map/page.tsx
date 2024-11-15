import { translate } from '@/app/i18n';
import Divider from '@/components/atoms/Divider';
import PageContainer from '@/components/atoms/PageContainer';
import AddPlaceSection from '@/components/molecules/AddPlaceSection';
import MapSet from '@/components/organism/MapSet';
import { Metadata } from 'next';

export async function generateMetadata({
  params: { lng },
}: {
  params: { lng: string };
}): Promise<Metadata> {
  const { t } = await translate(lng);
  return {
    title: t('metatags.title'),
    description: t('metatags.description'),
  };
}

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
