import { PageContainer, SiteDescription } from "@/components/atoms/";
import { IconsSection, Hero } from "@/components/molecules";
import {
  usersIconsTexts,
  ownersIconsTexts,
  heroTexts,
  siteDescriptionTexts,
} from "@/constants/texts";
import { languages, fallbackLng } from "../i18n/settings";
import { useTranslation } from "../i18n";

export default async function DashboardPage({
  params: { lng },
}: Readonly<{
  params: { lng: string };
}>) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng);
  return (
    <PageContainer classNames="pb-0">
      <Hero
        heroTexts={heroTexts(t)}
        buttonTitle={t("hero.buttonTitle")}
        lng={lng}
      />
      <IconsSection
        title={t("iconsSection.forFootballEnthusiasts")}
        items={usersIconsTexts(t)}
      />
      <SiteDescription
        siteDescriptionTexts={siteDescriptionTexts(t)}
        lng={lng}
      />
      <IconsSection
        title={t("iconsSection.forOwners")}
        items={ownersIconsTexts(t)}
      />
    </PageContainer>
  );
}
