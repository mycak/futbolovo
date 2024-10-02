import { AddEventInputs } from "@/schemas/addEventSchema";

export type IconText = {
  icon: string;
  title: string;
  text: string;
};
export type SelectOption = {
  value: string | number;
  label: string;
};

export type SelectOptions = SelectOption[];

//GOOGLE AUTOCOMPLETE
export type GooglePlace = {
  latitude: number | undefined;
  longitude: number | undefined;
  route: string | undefined;
  streetNr: string | undefined;
  locality: string | undefined;
  country: string | undefined;
  postcode: string | undefined;
};

export type LocationInputState = {
  streetAddress: string;
  country: string;
  zipCode: string;
  city: string;
  state: string;
  latitude: number | undefined;
  longitude: number | undefined;
  location: string;
};

//MAP FILTERS
export type MapFilters = {
  categories: EventCategoryEnum[] | undefined;
  coords:
    | {
        latitude: number | undefined;
        longitude: number | undefined;
      }
    | undefined;
  search: string | undefined;
  dateRange: [Date | null, Date | null] | undefined;
};

//EVENTS
export type Event = AddEventInputs & {
  id: string;
  dateRange?: [Date | null, Date | null] | Date[];
};
export type Events = Event[];

//NAVIGATION
export type NavigationKey = "mainPage" | "map" | "auth";

export type NavigationItem = {
  text: string;
  to: string;
};

export enum EventCategoryEnum {
  TOURNAMENT = "tournament",
  SCHOOL = "school",
  CAMP = "camp",
  SPORT_FIELD = "sportField",
  SIX_LEAGUE = "sixLeague",
  SERVICE = "service",
}
