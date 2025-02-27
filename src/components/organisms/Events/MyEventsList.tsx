'use client';

import React from 'react';
import Link from 'next/link';
import { Event } from '@prisma/client';
import { useTranslation } from '@/app/i18n/client';
import { format } from 'date-fns';
import { DATE_FORMAT } from '@/constants/common';
import { translateEventType } from '@/utils';
import { paths } from '@/constants/paths';
import Button from '@/components/atoms/Button';

interface MyEventsListProps {
  events: Event[];
  lng: string;
}

const MyEventsList: React.FC<MyEventsListProps> = ({ events, lng }) => {
  const { t } = useTranslation(lng);

  const handleRepost = (eventId: string) => {
    console.log('repeat event', eventId);
  };

  if (!events.length) {
    return (
      <div className='text-center py-8'>
        <p className='text-gray-400 text-lg'>{t('noEventsFound')}</p>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-4'>
        {events.map((event) => (
          <Link href={paths.Event(event.id)} key={event.id}>
            <div className='bg-gray-800 hover:bg-gray-750 rounded-lg p-4 flex justify-between items-center transition-colors cursor-pointer'>
              <div className='flex flex-col'>
                <h3 className='text-lg font-semibold text-white'>
                  {event.name}
                </h3>
                <div className='flex items-center gap-3 mt-2'>
                  <i className='fa-solid fa-futbol text-grass-50' />
                  <p className='text-gray-300'>
                    {translateEventType(event.category, t)}
                  </p>
                </div>
                <div className='flex items-center gap-3 mt-1'>
                  <i className='fa-solid fa-calendar-days text-grass-50' />
                  <p className='text-gray-300'>
                    {event.date
                      ? format(new Date(event.date), DATE_FORMAT)
                      : event.startDate && event.endDate
                      ? `${format(
                          new Date(event.startDate),
                          DATE_FORMAT
                        )} - ${format(new Date(event.endDate), DATE_FORMAT)}`
                      : '-'}
                  </p>
                </div>
              </div>
              <Button
                asLink
                href={`/${lng}/${paths.Map}`}
                size='lg'
                onClick={(e) => handleRepost(event.id)}
                color='bg-grass-45'
                classNames='text-white py-2 px-4'
                text={t('repost')}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyEventsList;
