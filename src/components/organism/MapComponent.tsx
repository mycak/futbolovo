"use client";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { PageWrapper } from "../atoms";
import { EventCategoryEnum } from "@/types/common";

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
      latitude: 50.0619474,
      longitude: 19.9368564,
      addressName: "Main Camp Location",
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
      latitude: null,
      longitude: null,
      addressName: "Virtual Classroom",
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
