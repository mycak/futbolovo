'use client';
import React from 'react';
import AddEventForm from './AddEventForm';
import { useAddEventWizardStore } from '@/stores';
import AddEventPreview from './AddEventPreview';
import { useJsApiLoader } from '@react-google-maps/api';
import { googleApiConfig } from '@/configs/googleApi';
import { Loader } from '@/components/atoms/';

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

const AddEventWizard = ({ lng }: { lng: string }) => {
  const { isLoaded } = useJsApiLoader(googleApiConfig(lng));

  const currentStep = useAddEventWizardStore((state) => state.currentStep);
  const { Component } = steps[currentStep];

  return isLoaded ? <Component /> : <Loader lng={lng} />;
};

export default AddEventWizard;
