"use client";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { PageWrapper } from "../atoms";
import { EventCategoryEnum } from "@/types/common";
import { generateMapIcon } from "@/utils";

const containerStyle = {
  width: "100%",
  height: "65vh",
  minHeight: "600px",
  borderRadius: "0.125rem",
};

const mockData = [
  {
    category: EventCategoryEnum.CAMP,
    location: {
      latitude: 54.352025,
      longitude: 18.646368,
      addressName: "Gdańsk Marina, Gdańsk",
    },
    ageCategories: ["2016", "2015", "Open"],
    dateRange: [new Date("2024-07-01"), new Date("2024-07-15")],
    date: null,
    name: "Summer Adventure Camp",
    price: 1500,
    description: "A two-week adventure camp for kids and teens.",
    phoneNumber: "123456789",
    email: "camp@adventure.com",
    image: "https://example.com/camp-image.jpg",
  },

  {
    category: EventCategoryEnum.TOURNAMENT,
    location: {
      latitude: 51.107883,
      longitude: 17.038538,
      addressName: "Tournament Arena",
    },
    ageCategories: ["2010", "2008"],
    dateRange: null,
    date: new Date("2024-09-10"),
    name: "National Football Tournament",
    price: 50,
    description: "A nationwide football tournament for adults.",
    phoneNumber: "987654321",
    email: "tournament@football.com",
    image: "https://example.com/tournament-image.jpg",
  },
  {
    category: EventCategoryEnum.SCHOOL,
    location: {
      latitude: 52.229676,
      longitude: 21.012229,
      addressName: "Palace of Culture and Science, Warsaw",
    },
    ageCategories: ["2018", "2019"],
    dateRange: null,
    date: null,
    name: "Online Coding School for Kids",
    price: 500,
    description: "An introductory coding course for young children.",
    phoneNumber: "555666777",
    email: "school@codingforkids.com",
    image: null,
  },
];

const center = {
  lat: 52.229676,
  lng: 21.017532,
};

const MapComponent = () => {
  return (
    <PageWrapper>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {mockData.map((event) => {
          return (
            <Marker
              key={event.name}
              position={{
                lat: event.location.latitude,
                lng: event.location.longitude,
              }}
              icon={{
                url: generateMapIcon(event.category),
                fillColor: "#FF0000",
                scaledSize: new window.google.maps.Size(45, 45),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(10, 20),
              }}
              zIndex={666666}
            />
          );
        })}
      </GoogleMap>
    </PageWrapper>
  );
};

export default MapComponent;
