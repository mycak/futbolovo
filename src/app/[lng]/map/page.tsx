import { translate } from '@/app/i18n';
import Divider from '@/components/atoms/Divider';
import PageContainer from '@/components/atoms/PageContainer';
import AddPlaceSection from '@/components/molecules/AddPlaceSection';
import SEOMetadata from '@/components/molecules/SEOMetadata';
import MapSet from '@/components/organisms/MapSet';
import { paths } from '@/constants/paths';
import { Metadata } from 'next';
import {
  generateWebsiteSchema,
  generateSportsFacilitySchema,
} from '@/utils/jsonld.utils';
import { JsonLdType, Location, MapFilters } from '@/types/common';
import { getEvents } from '@/app/actions/events';
import { EventCategoryEnum } from '@prisma/client';

export async function generateMetadata(props: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { lng } = params;

  const { t } = await translate(lng);
  return {
    title: t('metatags.map.title'),
    description: t('metatags.map.description'),
  };
}

const MapPage = async (props: {
  params: Promise<{
    lng: string;
  }>;
  searchParams?: Promise<{ categories?: string }>;
}) => {
  const params = await props.params;
  const searchParams = props.searchParams ? await props.searchParams : {};
  const { t } = await translate(params.lng);
  const lng = params.lng;

  // Check if category in query params is SPORT_FIELD
  const isSportFieldCategory = searchParams.categories?.includes(
    EventCategoryEnum.SPORT_FIELD
  );

  // Get all sports facilities for JSON-LD, but only if needed
  const facilities = isSportFieldCategory
    ? await getEvents({
        categories: [EventCategoryEnum.SPORT_FIELD],
      } as MapFilters)
    : [];

  // Generate schema for the map page and all facilities
  const facilitiesSchemas = facilities.map((facility) => {
    const location = facility.location as unknown as Location;
    return generateSportsFacilitySchema({
      name: facility.name,
      location: {
        addressName: location?.addressName || '',
        latitude: location?.latitude || 0,
        longitude: location?.longitude || 0,
      },
      description: facility.description,
      category: facility.category,
      email: facility.email,
      phoneNumber: facility.phoneNumber,
    });
  });

  const mapJsonLd: JsonLdType = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('metatags.map.title'),
    description: t('metatags.map.description'),
    url: `${process.env.NEXT_PUBLIC_APP_URL}${paths.Map}`,
    isPartOf: generateWebsiteSchema(t),
    mainContentOfPage: {
      '@type': 'Map',
      about: facilitiesSchemas,
    },
  };

  return (
    <>
      <SEOMetadata
        path={paths.Map}
        t={t}
        jsonLd={isSportFieldCategory ? mapJsonLd : undefined}
        currentLanguage={lng}
      />
      <PageContainer>
        <MapSet />
        <Divider classNames='!mb-0' />
        <AddPlaceSection lng={lng} />
      </PageContainer>
    </>
  );
};

export default MapPage;
