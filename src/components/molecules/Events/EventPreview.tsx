'use client';

import React from 'react';
import { Divider } from '../../atoms';
import EventImage from './EventImage';
import { formatPhoneNumber, translateEventType } from '@/utils';
import { currentCurrencySign, DATE_FORMAT } from '@/constants/common';
import { differenceInDays, format } from 'date-fns';
import { AddEventInputs } from '@/schemas/addEventSchema';
import { useTranslation } from '@/app/i18n/client';
import { Event, EventCategoryEnum } from '@prisma/client';
import { Location } from '@/types/common';

const EventPreview = ({
  eventData,
  children,
  lng,
  isEventPage,
}: {
  eventData: Event | AddEventInputs;
  children: React.ReactNode;
  lng: string;
  isEventPage?: boolean;
}) => {
  const { t } = useTranslation(lng);
  return (
    <div>
      {!isEventPage ? <Divider /> : null}
      <h1 className='text-2xl md:text-3xl font-bold text-center text-grass-30 mb-6'>
        {eventData.name}
      </h1>
      <div className='flex flex-col lg:flex-row'>
        <div className='mx-auto max-w-96 lg:ml-auto lg:mr-0'>
          <EventImage eventData={eventData} />
        </div>
        <Divider classNames='block lg:hidden' wrapperClassNames='lg:hidden' />

        <div className='grid md:grid-cols-2 gap-y-4 gap-x-8 justify-center max-w-lg mx-auto mt-4 lg:mt-0 lg:mr-auto lg:ml-12 lg:h-max'>
          <div className='flex items-center gap-3 col-span-2'>
            <i className='fa-solid fa-futbol text-grass-50' />
            <p>{translateEventType(eventData.category, t)}</p>
          </div>

          {eventData.category === EventCategoryEnum.TOURNAMENT && (
            <div className='flex items-center gap-3 col-span-2'>
              <i className='fa-solid fa-calendar-days text-grass-50' />
              <p>
                {eventData.date
                  ? format(new Date(eventData.date), DATE_FORMAT)
                  : '-'}
              </p>
            </div>
          )}
          {(eventData.category === EventCategoryEnum.CAMP ||
            eventData.category === EventCategoryEnum.MATCH) && (
            <div className='flex items-center gap-3 col-span-2'>
              <i className='fa-solid fa-calendar-days text-grass-50' />
              <p>
                {eventData.startDate && eventData.endDate
                  ? `${format(
                      new Date(eventData.startDate),
                      DATE_FORMAT
                    )} - ${format(new Date(eventData.endDate), DATE_FORMAT)}`
                  : '-'}
              </p>
            </div>
          )}
          {eventData.category === EventCategoryEnum.CAMP && (
            <div className='flex items-center gap-3 col-span-2'>
              <i className='fa-solid fa-calendar-plus text-grass-50' />
              <p>
                {eventData.startDate && eventData.endDate
                  ? differenceInDays(
                      new Date(eventData.startDate),
                      new Date(eventData.endDate)
                    )
                  : '-'}{' '}
                dni
              </p>
            </div>
          )}
          {(
            [
              EventCategoryEnum.MATCH,
              EventCategoryEnum.CAMP,
              EventCategoryEnum.TOURNAMENT,
              EventCategoryEnum.SCHOOL,
            ] as EventCategoryEnum[]
          ).includes(eventData.category) && (
            <div className='flex items-center gap-3 col-span-2 '>
              <i className='fa-solid fa-child-reaching text-grass-50' />
              <p>
                {eventData.ageCategories
                  ? eventData.ageCategories.join(', ')
                  : '-'}
              </p>
            </div>
          )}
          <div className='flex items-center gap-3 col-span-2 '>
            <i className='fa-solid fa-coins text-grass-50' />
            <p>
              {eventData.price} {currentCurrencySign}
            </p>
          </div>
          <div className='flex items-center gap-3 col-span-2 '>
            <i className='fa-regular fa-envelope text-grass-50' />
            <p>{eventData.email}</p>
          </div>
          <div className='flex items-center gap-3 col-span-2 '>
            <i className='fa-solid fa-phone-flip text-grass-50' />
            <p>{formatPhoneNumber(eventData.phoneNumber)}</p>
          </div>
          <div className='flex items-center gap-3 col-span-2'>
            <i className='fa-solid fa-location-dot text-grass-50' />
            <p>{(eventData?.location as Location)?.addressName ?? '-'}</p>
          </div>
          <div className='flex items-center gap-3 col-span-2'>
            <i className='fa-regular fa-comment text-grass-50' />
            <p>{eventData.description}</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* class="border-b w-11/12 my-4 md:my-8 mx-auto border border-grass-50" */}
      {/* border-b w-11/12 my-4 md:my-8 mx-auto border border-grass-50 !mt-0 mb-6 md:mb-12 */}
      {children}
    </div>
  );
};

export default EventPreview;
