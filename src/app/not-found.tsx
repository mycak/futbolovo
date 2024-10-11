import { PageContainer } from "@/components/atoms";
import { NotFound } from "@/components/molecules";

const NotFoundPage = () => {
  return (
    <PageContainer>
      <NotFound is404 />
    </PageContainer>
  );
};

export default NotFoundPage;
