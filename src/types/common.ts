export type IconText = {
  icon: string;
  title: string;
  text: string;
};

export type SelectOptions = {
  value: string;
  label: string;
}[];

export type GooglePlace = {
  latitude: number | undefined;
  longitude: number | undefined;
  route: string | undefined;
  streetNr: string | undefined;
  locality: string | undefined;
  country: string | undefined;
  postcode: string | undefined;
};
