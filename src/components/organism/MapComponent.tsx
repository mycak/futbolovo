"use client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "800px",
  height: "800px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: "futbolovo",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY as string,
  });

  return isLoaded ? (
    <div className="mx-auto max-w-[800px]">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} zIndex={565656}></Marker>
      </GoogleMap>
    </div>
  ) : (
    <p>Esa loading</p>
  );
};

export default MapComponent;
