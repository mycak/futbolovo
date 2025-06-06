'use client';
import React, { JSX, useEffect } from 'react';
import AddEventForm from './AddEventForm';
import { useAddEventWizardStore } from '@/stores';
import AddEventPreview from './AddEventPreview';
import { useJsApiLoader } from '@react-google-maps/api';
import { googleApiConfig } from '@/configs/googleApi';
import DynamicLoader from '@/components/atoms/DynamicLoader';
import { usePathname, useSearchParams } from 'next/navigation';

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
  const pathname = usePathname();
  const params = useSearchParams();
  const clearState = useAddEventWizardStore((state) => state.clearState);

  const currentStep = useAddEventWizardStore((state) => state.currentStep);
  const { Component } = steps[currentStep];

  useEffect(() => {
    if (pathname.includes('add') && !params.get('repost')) {
      clearState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return isLoaded ? <Component /> : <DynamicLoader classNames='mt-8' />;
};

export default AddEventWizard;
