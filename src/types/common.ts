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

//MAP BULK EVENTS
export type BulkEvents = {
  position: google.maps.LatLng | undefined;
  items: Events;
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
  LEAGUE = "league",
  SERVICE = "service",
}

export enum AgeCategoryCategoryEnum {
  OPEN = "Open",
  U21 = "U21",
  U20 = "U20",
  U19 = "U19",
  U18 = "U18",
  U17 = "U17",
  U16 = "U16",
  U15 = "U15",
  U14 = "U14",
  U13 = "U13",
  U12 = "U12",
  U11 = "U11",
  U10 = "U10",
  U9 = "U9",
  U8 = "U8",
  U7 = "U7",
  U6 = "U6",
}
