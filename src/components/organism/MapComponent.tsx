"use client";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { PageWrapper } from "../atoms";

const containerStyle = {
  width: "100%",
  height: "65vh",
  minHeight: "600px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MapComponent = () => {
  return (
    <PageWrapper>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} zIndex={565656}></Marker>
      </GoogleMap>
    </PageWrapper>
  );
};

export default MapComponent;
