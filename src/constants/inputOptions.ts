import { SelectOptions } from "@/types/common";
import { AgeCategoryCategoryEnum, EventCategoryEnum } from "@prisma/client";

import { TFunction } from "i18next";

export const categoryOptions = (
  t: TFunction<"translation", undefined>
): SelectOptions => [
  { value: EventCategoryEnum.TOURNAMENT, label: t("tournament") },
  { value: EventCategoryEnum.SCHOOL, label: t("academyOrSchool") },
  { value: EventCategoryEnum.SPORT_FIELD, label: t("pitchOrIndoor") },
  { value: EventCategoryEnum.CAMP, label: t("camp") },
  { value: EventCategoryEnum.LEAGUE, label: t("league") },
  { value: EventCategoryEnum.SERVICE, label: t("service") },
  { value: EventCategoryEnum.MATCH, label: t("match") },
];

export const ageCategoryOptions: SelectOptions = (
  Object.keys(AgeCategoryCategoryEnum) as Array<
    keyof typeof AgeCategoryCategoryEnum
  >
).map((key) => ({
  value: AgeCategoryCategoryEnum[key],
  label: AgeCategoryCategoryEnum[key],
}));
