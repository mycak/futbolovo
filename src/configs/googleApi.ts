import { Libraries } from "@react-google-maps/api";

export const libraries: Libraries = ["places", "routes", "maps", "marker"];

export const googleApiConfig = {
  id: "futbolovo",
  language: "pl",
  region: "PL",
  version: "weekly",
  libraries,
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY as string,
};
