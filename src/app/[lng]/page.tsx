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

export default async function DashboardPage({
  params: { lng },
}: Readonly<{
  params: { lng: string };
}>) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await translate(lng);
  return (
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
      <SiteDescription
        siteDescriptionTexts={siteDescriptionTexts(t)}
        lng={lng}
      />
      <IconsSection
        title={t('iconsSection.forOwners')}
        items={ownersIconsTexts(t)}
      />
    </PageContainer>
  );
}
