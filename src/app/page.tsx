import DashboardHeading from "@/components/atoms/DashboardHeading";
import Hero from "@/components/molecules/Hero";
import PageContainer from "@/components/atoms/PageContainer";
import IconsSection from "@/components/molecules/IconsSection";
import { usersIconsTexts, ownersIconsTexts } from "@/constants/texts";
import SiteDescription from "@/components/atoms/SiteDescription";

const DashboardPage = () => {
  return (
    <PageContainer>
      <DashboardHeading classNames="my-4" />
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
