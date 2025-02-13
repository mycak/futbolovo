'use client';
import { useAddEventWizardStore } from '@/stores';
import React, { useState } from 'react';
import { generateEventVisibilityEndDate } from '@/utils';
import { format } from 'date-fns';
import { DATE_FORMAT } from '@/constants/common';
import { useParams, useRouter } from 'next/navigation';
import { paths } from '@/constants/paths';
import { useTranslation } from '@/app/i18n/client';
import { addEvent } from '@/app/actions';
import EventPreview from '@/components/molecules/Events/EventPreview';
import Button from '@/components/atoms/Button';
import DynamicLoader from '@/components/atoms/DynamicLoader';

const AddEventPreview = () => {
  const router = useRouter();
  const { lng } = useParams();
  const { t } = useTranslation(lng as string);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const eventData = useAddEventWizardStore((state) => state.addData);
  const prevStep = useAddEventWizardStore((state) => state.prevStep);
  const setTempAddData = useAddEventWizardStore(
    (state) => state.setTempAddData
  );

  const onAddEvent = async () => {
    if (eventData === undefined) return;
    setTempAddData(eventData);
    setIsLoading(true);

    const payload = { ...eventData };
    const allLocations = [...eventData.additionalLocations, eventData.location];

    // @ts-expect-error - Remove additionalLocations from payload to fit payload type
    delete payload.additionalLocations;
    // @ts-expect-error - Remove termsAccepted from payload to fit payload type
    delete payload.termsAccepted;

    const addEventPromises = allLocations.map((location) =>
      addEvent({ ...payload, location })
    );

    await Promise.all(addEventPromises)
      .then((data) => {
        const eventIds = data.map((event) => event.id);
        const successPageQuery = {
          email: eventData.email,
          endDate: format(
            generateEventVisibilityEndDate(eventData.category, eventData),
            DATE_FORMAT
          ),
          eventIds: encodeURIComponent(JSON.stringify(eventIds)),
        };
        const params = new URLSearchParams(successPageQuery).toString();
        const fullPath = `${paths.EventAddConfirm}?${params}`;
        router.push(fullPath);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  if (!eventData || isLoading) return <DynamicLoader classNames='mt-16' />;
  return (
    <EventPreview eventData={eventData} lng={lng as string}>
      <div className='flex justify-center gap-8'>
        <Button
          classNames='h-[38px] md:text-xl pl-3 pr-5'
          color='bg-red-500'
          variant='icon'
          text={t('fix')}
          icon='pen-to-square'
          onClick={prevStep}
        />
        <Button
          classNames='h-[38px] md:text-xl pl-3 pr-5'
          color='bg-grass-45'
          variant='icon'
          icon='futbol'
          text={t('accept')}
          onClick={onAddEvent}
        />
      </div>
    </EventPreview>
  );
};

export default AddEventPreview;
