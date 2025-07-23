import { AddEventInputs } from '@/schemas/addEventSchema';
import { AgeCategoryCategoryEnum, EventCategoryEnum } from '@prisma/client';
import { DefaultUser } from 'next-auth';

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
  startDate: Date | undefined;
  endDate: Date | undefined;
  ageCategories: AgeCategoryCategoryEnum[] | undefined;
  female: boolean | undefined;
};

//EVENTS
export type Event = AddEventInputs & {
  id: string;
};
export type Events = Event[];

//NAVIGATION
export type NavigationKey = 'mainPage' | 'map' | 'auth' | 'news';

export type NavigationItem = {
  text: string;
  to: string;
  className?: string;
  callback?: () => void;
  icon?: string;
};

export type Location = {
  latitude: number;
  longitude: number;
  addressName: string;
};

export interface IUser extends DefaultUser {
  id: string;
  firstName: string;
  lastName: string;
  companyName?: string | null;
  email: string;
  createdAt: string;
  resetToken?: string | null;
  resetTokenExpires?: Date | null;
}

export type JsonLdType = {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
};
