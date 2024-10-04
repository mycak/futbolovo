import { EventCategoryEnum } from "@/types/common";

export const descriptionHints: Record<EventCategoryEnum, string> = {
  [EventCategoryEnum.TOURNAMENT]: "Ramy czasowe, zasady, itp.",
  [EventCategoryEnum.CAMP]: "Istotne informacje",
  [EventCategoryEnum.SCHOOL]: "Istotne informacje",
  [EventCategoryEnum.LEAGUE]: "Ramy czasowe, zasady, itp.",
  [EventCategoryEnum.SERVICE]: "Opis usługi",
  [EventCategoryEnum.SPORT_FIELD]: "Opis obiektu",
};
