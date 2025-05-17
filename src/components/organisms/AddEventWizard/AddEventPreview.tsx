'use client';
import { useAddEventWizardStore } from '@/stores';
import React, { useState, useEffect } from 'react';
import { generateEventVisibilityEndDate } from '@/utils';
import { format } from 'date-fns';
import { DATE_FORMAT } from '@/constants/common';
import { useParams, useRouter } from 'next/navigation';
import { paths } from '@/constants/paths';
import { useTranslation } from '@/app/i18n/client';
import { addEvent, editEvent } from '@/app/actions/events';
import { sendEventAddedEmail } from '@/app/actions/email';

import EventPreview from '@/components/molecules/Events/EventPreview';
import Button from '@/components/atoms/Button';
import DynamicLoader from '@/components/atoms/DynamicLoader';
import { useSession } from 'next-auth/react';
import { useNotifications } from '@/hooks/useNotifications';

const AddEventPreview = () => {
  const { status, data } = useSession();
  const { showNotification } = useNotifications();

  const router = useRouter();
  const { lng } = useParams();
  const { t } = useTranslation(lng as string);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditSucceeded, setIsEditSucceeded] = useState<boolean>(false);
  const eventData = useAddEventWizardStore((state) => state.addData);
  const prevStep = useAddEventWizardStore((state) => state.prevStep);
  const setTempAddData = useAddEventWizardStore(
    (state) => state.setTempAddData
  );

  const isEditMode = !!eventData?.id;

  useEffect(() => {
    if (isEditSucceeded) {
      const redirectTimer = setTimeout(() => {
        router.push(paths.MyEvents);
      }, 2000);

      return () => clearTimeout(redirectTimer);
    }
  }, [isEditSucceeded, router]);

  const onAddEvent = async () => {
    if (eventData === undefined) return;
    setTempAddData(eventData);
    setIsLoading(true);

    const { additionalLocations, termsAccepted, ...payload } = eventData;

    if (!isEditMode) {
      //ADD EVENTS
      const allLocations = [...additionalLocations, eventData.location];

      const addEventPromises = allLocations.map((location) =>
        addEvent({
          ...payload,
          location,
          ...(status === 'authenticated'
            ? { authorId: data?.user?.id, isPublished: true }
            : {}),
        })
      );

      await Promise.all(addEventPromises)
        .then((events) => {
          const eventIds = events.map((event) => event.id);
          const endDateFormatted = format(
            generateEventVisibilityEndDate(eventData.category, eventData),
            DATE_FORMAT
          );
          const successPageQuery = {
            email: eventData.email,
            endDate: endDateFormatted,
            eventIds: encodeURIComponent(JSON.stringify(eventIds)),
          };

          // Send notification email
          const isSignedIn = status === 'authenticated';
          const emailToUse =
            isSignedIn && data?.user.email ? data.user.email : eventData.email;

          // Only send one email even if multiple locations were added
          const firstEventId = eventIds[0];

          // Send email using server action
          sendEventAddedEmail(
            { ...eventData, email: emailToUse },
            firstEventId,
            isSignedIn,
            lng as string // Pass the language code instead of translations
          ).catch((err) =>
            console.error('Failed to send notification email:', err)
          );

          const params = new URLSearchParams(successPageQuery).toString();
          const fullPath = `${paths.EventAddConfirm}?${params}`;
          router.push(fullPath);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    } else {
      //EDIT EVENTS
      editEvent(eventData?.id as string, {
        ...payload,
      })
        .then(() => {
          setIsLoading(false);
          setIsEditSucceeded(true);
          showNotification(t('eventsForm.editSuccess'), 'success');
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
          showNotification(t('eventsForm.editError'), 'error');
        });
    }
  };

  if (!eventData || isLoading) return <DynamicLoader classNames='mt-16' />;

  if (isEditSucceeded) {
    return (
      <div className='flex flex-col items-center justify-center mt-16 text-center'>
        <h2 className='text-2xl font-bold text-grass-45 mb-4'>
          {t('hero.successUpdate')}
        </h2>
      </div>
    );
  }

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
