import { languages } from "@/app/i18n/settings";
import { PageContainer } from "@/components/atoms";
import { NotFound } from "@/components/molecules";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const NotFoundPage = async (params) => {
  console.log(params);
  return (
    <PageContainer>
      <NotFound is404 />
    </PageContainer>
  );
};

export default NotFoundPage;
