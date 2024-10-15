import { PageContainer, PageWrapper, Loader } from "@/components/atoms/";
import { AddEventConfirm } from "@/components/organism";
import { Suspense } from "react";

const AddEventConfirmPage = () => {
  return (
    <PageContainer>
      <PageWrapper>
        <div className="bg-gray-900 py-8 px-8 mx-auto max-w-max rounded-sm">
          <div className="mx-auto max-w-max">
            <i className="fa-solid fa-map-location-dot fa-5x text-ivory-150 mx-auto" />
          </div>
          <Suspense fallback={<Loader />}>
            <AddEventConfirm />
          </Suspense>
        </div>
      </PageWrapper>
    </PageContainer>
  );
};

export default AddEventConfirmPage;
