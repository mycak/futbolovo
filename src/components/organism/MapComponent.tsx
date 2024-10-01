"use client";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { PageWrapper } from "../atoms";
import { generateMapIcon } from "@/utils";
import { mockedEvents } from "@/constants/mocks";
import { useState } from "react";
import { MapInfoBox } from "../molecules";
import { AddEventInputs } from "@/schemas/addEventSchema";

const containerStyle = {
  width: "100%",
  height: "65vh",
  minHeight: "600px",
  borderRadius: "0.125rem",
};

const center = {
  lat: 52.229676,
  lng: 21.017532,
};

const MapComponent = () => {
  const [currentEventId, setCurrentEventId] = useState<string | number | null>(
    null
  );

  const googlePinIconConfig = {
    scaledSize: new window.google.maps.Size(45, 45),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(10, 20),
  };

  return (
    <PageWrapper>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {mockedEvents.map((event) => {
          //TODO: Add default pin instead
          if (!event.location.latitude || !event.location.longitude)
            return null;
          return (
            <Marker
              key={event.id}
              position={{
                lat: event.location.latitude,
                lng: event.location.longitude,
              }}
              icon={{
                url: generateMapIcon(event.category),
                ...googlePinIconConfig,
              }}
              onClick={() => setCurrentEventId(event.id)}
            >
              <MapInfoBox
                event={event as AddEventInputs & { id: string }}
                resetCurrent={() => setCurrentEventId(null)}
                currentId={currentEventId}
              />
            </Marker>
          );
        })}
      </GoogleMap>
    </PageWrapper>
  );
};

export default MapComponent;
