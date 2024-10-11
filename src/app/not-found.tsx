import { DashboardHeading, Divider, PageContainer } from "@/components/atoms";
import { NotFound } from "@/components/molecules";

const NotFoundPage = () => {
  return (
    <PageContainer>
      <DashboardHeading classNames="my-4" />
      <Divider wrapperClassNames="mb-11 !mt-0 pt-0" />
      <NotFound is404 classNames="mt-32" />
    </PageContainer>
  );
};

export default NotFoundPage;
