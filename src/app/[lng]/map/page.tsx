import { translate } from '@/app/i18n';
import Divider from '@/components/atoms/Divider';
import PageContainer from '@/components/atoms/PageContainer';
import AddPlaceSection from '@/components/molecules/AddPlaceSection';
import MapSet from '@/components/organism/MapSet';
import { Metadata } from 'next';

export async function generateMetadata(props: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { lng } = params;

  const { t } = await translate(lng);
  return {
    title: t('metatags.title'),
    description: t('metatags.description'),
  };
}

const MapPage = async (props: {
  params: Promise<{
    lng: string;
  }>;
}) => {
  const params = await props.params;
  const lng = params.lng;

  return (
    <PageContainer>
      <MapSet />
      <Divider />
      <AddPlaceSection lng={lng} />
    </PageContainer>
  );
};

export default MapPage;
