import { AddEventInputs } from "@/schemas/addEventSchema";
import { EventCategoryEnum } from "@/types/common";
import { add } from "date-fns";

export const generateDummyPoster = (category: EventCategoryEnum) => {
  switch (category) {
    case EventCategoryEnum.TOURNAMENT:
      return "/images/posters/tournament-poster.jpg";
    case EventCategoryEnum.SCHOOL:
      return "/images/posters/academy-poster.jpg";
    case EventCategoryEnum.CAMP:
      return "/images/posters/camp-poster.jpg";
    case EventCategoryEnum.LEAGUE:
      return "/images/posters/match-poster.jpg";
    case EventCategoryEnum.SPORT_FIELD:
      return "/images/posters/pitch-poster.jpg";
    case EventCategoryEnum.SERVICE:
      return "/images/posters/service-poster.jpg";
    default:
      return "/images/posters/tournament-poster.jpg";
  }
};

export type CategoryOrCluster = EventCategoryEnum | "cluster";

export const generateMapIcon = (category: CategoryOrCluster) => {
  switch (category) {
    case EventCategoryEnum.TOURNAMENT:
      return "/icons/pins/trophy-pin.svg";
    case EventCategoryEnum.SCHOOL:
      return "/icons/pins/school-pin.svg";
    case EventCategoryEnum.CAMP:
      return "/icons/pins/camp-pin.svg";
    case EventCategoryEnum.LEAGUE:
      return "/icons/pins/six-league-pin.svg";
    case EventCategoryEnum.SPORT_FIELD:
      return "/icons/pins/pitch-pin.svg";
    case EventCategoryEnum.SERVICE:
      return "/icons/pins/service-pin.svg";
    case "cluster":
      return "/icons/pins/ball-pin.svg";
    default:
      return "/icons/pins/ball-pin.svg";
  }
};

export const generateEventVisibilityEndDate = (
  category: EventCategoryEnum,
  eventData: AddEventInputs
): Date => {
  switch (category) {
    case EventCategoryEnum.TOURNAMENT:
      return eventData.date as Date;
    case EventCategoryEnum.SCHOOL:
      return add(new Date(), { months: 6 });
    case EventCategoryEnum.CAMP:
      return eventData.dateRange?.[0] ?? add(new Date(), { months: 6 });
    case EventCategoryEnum.LEAGUE:
      return add(new Date(), { months: 6 });
    case EventCategoryEnum.SPORT_FIELD:
      return add(new Date(), { months: 6 });
    case EventCategoryEnum.SERVICE:
      return add(new Date(), { months: 6 });
    default:
      return add(new Date(), { months: 6 });
  }
};
