"use client";
import React from "react";
import AddEventForm from "./AddEventForm";
import { useAddEventStore } from "@/stores";
import AddEventPreview from "./AddEventPreview";

const steps: {
  key: "addEventForm" | "preview" | "confirmMessage";
  Component: () => JSX.Element;
}[] = [
  { key: "addEventForm", Component: AddEventForm },
  {
    key: "preview",
    Component: AddEventPreview,
  },
] as const;

const AddEventWizard = () => {
  const currentStep = useAddEventStore((state) => state.currentStep);
  const { Component } = steps[currentStep];

  return <Component />;
};

export default AddEventWizard;
