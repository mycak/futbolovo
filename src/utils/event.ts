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
    case EventCategoryEnum.MATCH:
      return "/images/posters/match-2-poster.jpg";
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
    case EventCategoryEnum.MATCH:
      return "/icons/pins/match-pin.svg";
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
    case EventCategoryEnum.MATCH:
    case EventCategoryEnum.CAMP:
      return eventData.dateRange?.[0] ?? add(new Date(), { months: 6 });
    case EventCategoryEnum.SCHOOL:
    case EventCategoryEnum.LEAGUE:
    case EventCategoryEnum.SPORT_FIELD:
    case EventCategoryEnum.SERVICE:
      return add(new Date(), { months: 6 });

    default:
      return add(new Date(), { months: 6 });
  }
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  // Space deletion
  const cleaned = phoneNumber.replace(/\s+/g, "");

  if (cleaned.startsWith("+48")) {
    const number = cleaned.slice(3);
    if (number.length === 9) {
      return `+48 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(
        6
      )}`;
    }
  } else {
    const length = cleaned.length;
    if (length === 7) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(
        5
      )}`;
    } else if (length === 9) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(
        6
      )}`;
    } else if (length === 10) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(
        6,
        8
      )} ${cleaned.slice(8)}`;
    }
  }
  return phoneNumber;
};
