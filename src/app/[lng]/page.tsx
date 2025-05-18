import { Metadata } from 'next';
import {
  usersIconsTexts,
  ownersIconsTexts,
  heroTexts,
  siteDescriptionTexts,
} from '@/constants/texts';
import { languages, fallbackLng } from '../i18n/settings';
import { translate } from '../i18n';
import PageContainer from '@/components/atoms/PageContainer';
import Hero from '@/components/molecules/Hero';
import IconsSection from '@/components/molecules/IconsSection';
import SiteDescription from '@/components/atoms/SiteDescription';
import SEOMetadata from '@/components/molecules/SEOMetadata';
import { paths } from '@/constants/paths';

export async function generateMetadata(props: {
  params: Promise<{
    lng: string;
  }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { lng } = params;

  const { t } = await translate(lng);
  return {
    title: t('metatags.home.title'),
    description: t('metatags.home.description'),
  };
}

export default async function DashboardPage(props: {
  params: Promise<{
    lng: string;
  }>;
}) {
  const params = await props.params;

  let { lng } = params;

  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await translate(lng);
  return (
    <>
      <SEOMetadata path={paths.Dashboard} t={t} />
      <PageContainer classNames='pb-0'>
        <Hero
          heroTexts={heroTexts(t)}
          buttonTitle={t('hero.buttonTitle')}
          lng={lng}
        />
        <IconsSection
          title={t('iconsSection.forFootballEnthusiasts')}
          items={usersIconsTexts(t)}
        />
        <SiteDescription siteDescriptionTexts={siteDescriptionTexts(t)} />
        <IconsSection
          title={t('iconsSection.forOwners')}
          items={ownersIconsTexts(t)}
        />
      </PageContainer>
    </>
  );
}
