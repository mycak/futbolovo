import { PageContainer, SiteDescription } from "@/components/atoms/";
import { IconsSection, Hero } from "@/components/molecules";
import { usersIconsTexts, ownersIconsTexts } from "@/constants/texts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Futbolowa mapa Polski",
  description: "Bierz udział w piłkarskich wydarzeniach w Twojej okolicy.",
};

const DashboardPage = () => {
  return (
    <PageContainer>
      <Hero />
      <IconsSection
        title="Dla Piłkarskich Entuzjastów"
        items={usersIconsTexts}
      />
      <SiteDescription />
      <IconsSection
        title="Dla Organizatorów i Właścicieli"
        items={ownersIconsTexts}
      />
    </PageContainer>
  );
};

export default DashboardPage;
