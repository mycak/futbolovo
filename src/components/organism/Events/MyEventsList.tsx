'use client';

import React from 'react';
import Link from 'next/link';
import { Event, EventCategoryEnum } from '@prisma/client';
import { useTranslation } from '@/app/i18n/client';
import { format } from 'date-fns';
import { DATE_FORMAT } from '@/constants/common';
import { translateEventType } from '@/utils';
import { paths } from '@/constants/paths';
import Button from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';
import { useAddEventWizardStore } from '@/stores';
import { Location } from '@/types/common';
import { deleteEvent } from '@/app/actions/events';
import { useNotifications } from '@/hooks/useNotifications';

interface UserEventsListProps {
  events: Event[];
  lng: string;
}

const UserEventsList: React.FC<UserEventsListProps> = ({ events, lng }) => {
  const { t } = useTranslation(lng);
  const router = useRouter();
  const { showNotification } = useNotifications();
  const setAddData = useAddEventWizardStore((state) => state.setAddData);

  const handleRedirect = (
    e: React.SyntheticEvent,
    eventId: string,
    editMode: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(editMode ? paths.EventEdit : paths.EventRepost);
    const eventData = events.find((event) => event.id === eventId);
    if (eventData) {
      setAddData({
        ...eventData,
        termsAccepted: true,
        additionalLocations: [],
        priceFrom: eventData.priceFrom ?? eventData.price ?? 0,
        authorId: eventData.authorId ?? '',
        location: eventData.location as Location,
        id: editMode ? eventId : undefined,
      });
    }
  };

  const handleGoToAddEvent = () => {
    router.push(paths.EventAdd);
  };

  const handleDelete = async (e: React.SyntheticEvent, eventId: string) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await deleteEvent(eventId);
      showNotification(t('eventsForm.deleteSuccess'), 'success');
      // Refresh the page to get updated data
      router.refresh();
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  if (!events.length) {
    return (
      <div className='flex flex-col items-center justify-center bg-gray-800 rounded-lg p-8 text-center my-8'>
        <i className='fa-solid fa-calendar-plus text-grass-50 text-4xl mb-4'></i>
        <h3 className='text-xl font-semibold text-white mb-2'>
          {t('myEvents.noEventsFound')}
        </h3>
        <p className='text-gray-400 mb-6'>{t('myEvents.description')}</p>
        <Button
          onClick={handleGoToAddEvent}
          color='bg-grass-45'
          classNames='text-white py-2 px-6'
          text={t('myEvents.createFirst')}
        />
      </div>
    );
  }

  return (
    <div className='w-full'>
      <Button
        classNames='h-[38px] text-xl pl-3 pr-5 mx-auto my-8'
        color='bg-grass-45'
        variant='icon'
        icon='plus'
        text={t('navigation.addEvent')}
        onClick={handleGoToAddEvent}
      />
      <div className='flex flex-col gap-4'>
        {events.map((event) => (
          <Link href={paths.Event(event.id)} key={event.id}>
            <div className='bg-gray-800 hover:bg-gray-750 rounded-lg p-4 flex flex-col md:flex-row md:justify-between transition-colors cursor-pointer'>
              {/* Event details section */}
              <div className='flex flex-col mb-4 md:mb-0'>
                <h3 className='text-lg font-semibold text-white'>
                  {event.name}
                </h3>
                <div className='flex items-center gap-3 mt-2'>
                  <i className='fa-solid fa-futbol text-grass-50' />
                  <p className='text-gray-300'>
                    {translateEventType(event.category, t)}
                  </p>
                </div>
                {event.category === EventCategoryEnum.TOURNAMENT && (
                  <div className='flex items-center gap-3 col-span-2'>
                    <i className='fa-solid fa-calendar-days text-grass-50' />
                    <p>
                      {event.date
                        ? format(new Date(event.date), DATE_FORMAT)
                        : '-'}
                    </p>
                  </div>
                )}
                {(event.category === EventCategoryEnum.CAMP ||
                  event.category === EventCategoryEnum.MATCH) && (
                  <div className='flex items-center gap-3 col-span-2'>
                    <i className='fa-solid fa-calendar-days text-grass-50' />
                    <p>
                      {event.startDate && event.endDate
                        ? `${format(
                            new Date(event.startDate),
                            DATE_FORMAT
                          )} - ${format(new Date(event.endDate), DATE_FORMAT)}`
                        : '-'}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions section - separate row on mobile */}
              <div className='flex justify-between items-center border-t pt-3 md:pt-0 md:border-0'>
                <div className='flex gap-3 items-center'>
                  <button
                    onClick={(ev: React.SyntheticEvent) =>
                      handleDelete(ev, event.id)
                    }
                    className='text-red-500 hover:text-red-400 p-2 cursor-pointer'
                    aria-label={t('remove')}
                    title={t('remove')}
                  >
                    <i className='fa-solid fa-trash text-lg'></i>
                  </button>
                  <button
                    onClick={(ev: React.SyntheticEvent) =>
                      handleRedirect(ev, event.id, true)
                    }
                    className='text-grass-50 hover:text-grass-40 p-2 cursor-pointer'
                    aria-label={t('edit')}
                    title={t('edit')}
                  >
                    <i className='fa-solid fa-edit text-lg'></i>
                  </button>
                </div>
                <Button
                  size='sm'
                  onClick={(ev: React.SyntheticEvent) =>
                    handleRedirect(ev, event.id, false)
                  }
                  color='bg-grass-45'
                  classNames='text-white py-1.5 px-3 md:ml-4'
                  text={t('repost')}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserEventsList;
