import {
  AgeCategoryCategoryEnum,
  EventCategoryEnum,
  SelectOptions,
} from "@/types/common";

export const categoryOptions: SelectOptions = [
  { value: EventCategoryEnum.TOURNAMENT, label: "Turniej" },
  { value: EventCategoryEnum.SCHOOL, label: "Szkółka lub akademia" },
  { value: EventCategoryEnum.SPORT_FIELD, label: "Boisko lub hala na wynajem" },
  { value: EventCategoryEnum.CAMP, label: "Obóz" },
  { value: EventCategoryEnum.LEAGUE, label: "Liga szóstek" },
  { value: EventCategoryEnum.SERVICE, label: "Usługa" },
  { value: EventCategoryEnum.MATCH, label: "Mecz" },
];

export const ageCategoryOptions: SelectOptions = (
  Object.keys(AgeCategoryCategoryEnum) as Array<
    keyof typeof AgeCategoryCategoryEnum
  >
).map((key) => ({
  value: AgeCategoryCategoryEnum[key],
  label: AgeCategoryCategoryEnum[key],
}));
