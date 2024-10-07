export const generateMapCoordsFromCurrentLocation = (
  coords: GeolocationPosition,
  callback: (coords: { lat: number; lng: number }) => void
) => {
  const parsedCoords = {
    lat: coords.coords.latitude,
    lng: coords.coords.longitude,
  };
  callback(parsedCoords);
};
