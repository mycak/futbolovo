import { EventCategoryEnum } from "@prisma/client";
import { TFunction } from "i18next";

export const descriptionHints = (
  t: TFunction<"translation", undefined>
): Record<EventCategoryEnum, string> => ({
  [EventCategoryEnum.TOURNAMENT]: t("descriptionHints.option1"),
  [EventCategoryEnum.CAMP]: t("descriptionHints.option2"),
  [EventCategoryEnum.SCHOOL]: t("descriptionHints.option2"),
  [EventCategoryEnum.LEAGUE]: t("descriptionHints.option1"),
  [EventCategoryEnum.SERVICE]: t("descriptionHints.option3"),
  [EventCategoryEnum.SPORT_FIELD]: t("descriptionHints.option4"),
  [EventCategoryEnum.MATCH]: t("descriptionHints.option1"),
});
