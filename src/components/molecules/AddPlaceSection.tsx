import React from "react";
import { Button, PageWrapper } from "../atoms";
import { paths } from "@/constants/paths";
import { useTranslation } from "@/app/i18n";

const AddPlaceSection = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng);

  return (
    <PageWrapper>
      <div className="mx-auto max-w-max">
        <i className="fa-solid fa-map-location-dot fa-5x text-ivory-150 mx-auto" />
      </div>
      <h3 className="text-3xl md:text-5xl text-center text-grass-20 mt-4 md:mt-8">
        {t("addPlace.title")}
      </h3>
      <Button
        asLink
        size="lg"
        href={paths.EventAdd}
        classNames="mt-4 md:mt-8 mx-auto animate-shake block"
        text={t("addPlace.addPlaceButton")}
      />
      <p className="text-center text-ivory-150-60 text-lg md:text-2xl mt-4 md:mt-8">
        {t("addPlace.text1")}{" "}
        <span className="text-grass-50">{t("addPlace.text2")}</span>
      </p>
    </PageWrapper>
  );
};

export default AddPlaceSection;
