import {
  DashboardHeading,
  Divider,
  PageContainer,
  SiteDescription,
} from "@/components/atoms/";
import { IconsSection, Hero } from "@/components/molecules";
import { usersIconsTexts, ownersIconsTexts } from "@/constants/texts";

const DashboardPage = () => {
  return (
    <PageContainer>
      <DashboardHeading classNames="my-4" />
      <Divider wrapperClassNames="mb-11 !mt-0 pt-0" />
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
