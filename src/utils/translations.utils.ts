import { EventCategoryEnum } from "@/types/common";

export const translateEventType = (event: EventCategoryEnum) => {
  switch (event) {
    case EventCategoryEnum.TOURNAMENT:
      return "Turniej";
    case EventCategoryEnum.SCHOOL:
      return "Szkoła/Akademia";
    case EventCategoryEnum.SPORT_FIELD:
      return "Boisko";
    case EventCategoryEnum.CAMP:
      return "Obóz";
    case EventCategoryEnum.SIX_LEAGUE:
      return "Liga 6";
    case EventCategoryEnum.SERVICE:
      return "Usługa";
    default:
      return "Nieznany";
  }
};
