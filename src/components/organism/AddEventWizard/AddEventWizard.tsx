"use client";
import React from "react";
import AddEventForm from "./AddEventForm";
import { useAddEventWizardStore } from "@/stores";
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
  const currentStep = useAddEventWizardStore((state) => state.currentStep);
  const { Component } = steps[currentStep];

  return <Component />;
};

export default AddEventWizard;
