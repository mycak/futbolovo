import {
  PageContainer,
  Divider,
  DashboardHeading,
  PageWrapper,
} from "@/components/atoms/";
import { AddEventConfirm } from "@/components/organism";

const AddEventConfirmPage = () => {
  return (
    <PageContainer>
      <DashboardHeading classNames="my-4" />
      <Divider />
      <PageWrapper classNames="pt-4">
        <div className="bg-gray-900 py-8 px-8 mx-auto max-w-max rounded-sm">
          <div className="mx-auto max-w-max">
            <i className="fa-solid fa-map-location-dot fa-5x text-ivory-150 mx-auto" />
          </div>
          <h2 className="text-3xl text-center text-grass-20 mt-8">
            Dodaj punkt na mapie
          </h2>
          <AddEventConfirm />
        </div>
      </PageWrapper>
    </PageContainer>
  );
};

export default AddEventConfirmPage;
