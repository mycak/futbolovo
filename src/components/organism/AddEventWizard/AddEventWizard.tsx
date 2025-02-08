'use client';
import React, { JSX } from 'react';
import AddEventForm from './AddEventForm';
import { useAddEventWizardStore } from '@/stores';
import AddEventPreview from './AddEventPreview';
import { useJsApiLoader } from '@react-google-maps/api';
import { googleApiConfig } from '@/configs/googleApi';
import DynamicLoader from '@/components/atoms/DynamicLoader';

const steps: {
  key: 'addEventForm' | 'preview' | 'confirmMessage';
  Component: () => JSX.Element;
}[] = [
  { key: 'addEventForm', Component: AddEventForm },
  {
    key: 'preview',
    Component: AddEventPreview,
  },
] as const;

const AddEventWizard = () => {
  const { isLoaded } = useJsApiLoader(googleApiConfig);

  const currentStep = useAddEventWizardStore((state) => state.currentStep);
  const { Component } = steps[currentStep];

  return isLoaded ? <Component /> : <DynamicLoader classNames='mt-8' />;
};

export default AddEventWizard;
