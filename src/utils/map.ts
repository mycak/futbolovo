import { Dispatch, SetStateAction } from "react";

export const generateMapCoordsFromCurrentLocation = (
  coords: GeolocationPosition,
  callback: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    } | null>
  >
) => {
  const parsedCoords = {
    lat: coords.coords.latitude,
    lng: coords.coords.longitude,
  };
  callback(parsedCoords);
};
