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
    case EventCategoryEnum.LEAGUE:
      return "Liga";
    case EventCategoryEnum.SERVICE:
      return "Usługa";
    default:
      return "Nieznany";
  }
};
