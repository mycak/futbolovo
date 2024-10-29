import { PageContainer, PageWrapper } from "@/components/atoms/";
import { AddEventWizard } from "@/components/organism";

import { Back } from "@/components/molecules";
import { useTranslation } from "@/app/i18n";

const AddEventPage = async ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { t } = await useTranslation(params.lng);

  return (
    <PageContainer>
      <PageWrapper>
        <div className="md:bg-gray-900 py-8 sm:px-4 md:px-8 mx-auto max-w-max rounded-sm">
          <div className="mx-auto max-w-max">
            <i className="fa-solid fa-map-location-dot fa-5x text-ivory-150 mx-auto" />
          </div>
          <h2 className="text-2xl md:text-3xl text-center text-grass-20 mt-4 md:mt-8">
            {t("navigation.addPoint")}
          </h2>
          <AddEventWizard lng={params.lng} />
        </div>
        <Back classNames="mx-auto mt-8" lng={params.lng} />
      </PageWrapper>
    </PageContainer>
  );
};

export default AddEventPage;
