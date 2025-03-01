'use client';
import { useEffect, useRef, useState } from 'react';
import { InfoBox } from '@react-google-maps/api';
import { generateMapIcon, generatePriceDescription } from '@/utils';
import { format } from 'date-fns';
import { Event } from '@/types/common';
import { currentCurrencySign, DATE_FORMAT } from '@/constants/common';
import clsx from 'clsx';
import Image from 'next/image';
import { paths } from '@/constants/paths';
import EventImage from '../Events/EventImage';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { EventCategoryEnum } from '@prisma/client';
import Button from '@/components/atoms/Button';
import Divider from '@/components/atoms/Divider';
import { useClientMediaQuery } from '@/hooks/useClientMediaQuery';

const MapInfoBox = ({
  event,
  resetCurrent,
  currentId,
  saveMapData,
}: {
  currentId: string | number | null;
  event: Event;
  resetCurrent: () => void;
  saveMapData: () => void;
}) => {
  const { lng } = useParams();
  const { t } = useTranslation(lng as string);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isMobileView = useClientMediaQuery('(max-width: 768px)');

  // InfoBox options for positioning and disabling default close button
  const boxOptions = {
    enableEventPropagation: true,
    pixelOffset: new google.maps.Size(isMobileView ? -144 : -285, -250),
    closeBoxURL: '', // Remove default close icon
  };

  // Effect to handle showing and hiding the InfoBox with animation
  useEffect(() => {
    if (currentId === event.id) {
      setIsRendered(true);
      timeoutId.current = setTimeout(() => setIsVisible(true), 10); // Trigger fade-in animation after a small delay
    } else {
      setIsVisible(false);
      timeoutId.current = setTimeout(() => setIsRendered(false), 300); // Remove component from DOM after animation
    }

    return () => clearTimeout(timeoutId.current);
  }, [currentId, event.id]);

  const handleClose = () => {
    setIsVisible(false);
    timeoutId.current = setTimeout(() => {
      resetCurrent();
      setIsRendered(false);
    }, 300);
  };

  if (!isRendered) return null;

  return (
    <InfoBox
      position={
        new google.maps.LatLng(
          event.location.latitude as number,
          event.location.longitude as number
        )
      }
      options={boxOptions}
      onCloseClick={handleClose}
    >
      <div
        className={clsx(
          'relative flex flex-col w-72 md:w-full md:max-w-full md:flex-row border border-grass-50 rounded-lg bg-emerald-900 p-5 text-ivory-150',
          'hover:cursor-pointer focus:outline-none focus:border-grass-40',
          'transition-all duration-300 ease-out',
          isVisible ? 'opacity-95 ' : 'opacity-0'
        )}
      >
        <EventImage
          eventData={event}
          classNames='w-3/5 mt-6 md:mt-0 md:w-48 md:mr-4'
        />
        <button
          className='absolute top-2 right-2 text-ivory-150 hover:text-grass-30 text-lg md:text-base'
          onClick={handleClose}
        >
          &#10005;
        </button>
        <div className='flex flex-col gap-1 md:w-80 mt-4 md:mt-0'>
          <div className='hidden md:flex justify-center'>
            <Image
              src={generateMapIcon(event.category)}
              alt={event.name}
              width={40}
              height={40}
              priority
            />
          </div>
          <div>
            <h1 className='text-xl font-bold text-center text-grass-30'>
              {event.name}
            </h1>
            <Divider contained classNames='!my-3' />
          </div>

          <div className='flex flex-col gap-1'>
            {event.category === EventCategoryEnum.TOURNAMENT && (
              <div className='flex items-center gap-3'>
                <div className='w-3 flex flex-col items-center'>
                  <i className='fa-solid fa-calendar-days text-grass-50' />
                </div>
                <p className='text-sm'>
                  {event.date ? format(new Date(event.date), DATE_FORMAT) : '-'}
                </p>
              </div>
            )}
            {(event.category === EventCategoryEnum.CAMP ||
              event.category === EventCategoryEnum.MATCH) && (
              <div className='flex items-center gap-3'>
                <div className='w-3 flex flex-col items-center'>
                  <i className='fa-solid fa-calendar-days text-grass-50' />
                </div>
                <p className='text-sm'>
                  {event.startDate && event.endDate
                    ? `${format(
                        new Date(event.startDate),
                        DATE_FORMAT
                      )} - ${format(new Date(event.endDate), DATE_FORMAT)}`
                    : '-'}
                </p>
              </div>
            )}
            {(
              [
                EventCategoryEnum.CAMP,
                EventCategoryEnum.MATCH,
                EventCategoryEnum.TOURNAMENT,
                EventCategoryEnum.SCHOOL,
              ] as EventCategoryEnum[]
            ).includes(event.category) && (
              <div className='flex items-center gap-3'>
                <div className='w-3 flex flex-col items-center'>
                  <i className='fa-solid fa-child-reaching text-grass-50' />
                </div>
                <p className='text-sm'>
                  {event.ageCategories
                    ? event.ageCategories.join(', ').replace('9999', 'Open')
                    : '-'}
                </p>
              </div>
            )}
            {([EventCategoryEnum.SERVICE] as EventCategoryEnum[]).includes(
              event.category
            ) && (
              <div className='flex items-center gap-3'>
                <div className='w-3 flex flex-col items-center'>
                  <i className='fa-regular fa-comment text-grass-50' />
                </div>
                <p
                  className='whitespace-pre-line text-sm'
                  style={{
                    width: '-webkit-fill-available',
                    wordBreak: 'break-word',
                    display: '-webkit-box',
                    WebkitLineClamp: 15,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {event.description}
                </p>
              </div>
            )}
            <div className='flex items-center gap-3'>
              <div className='w-3 flex flex-col items-center'>
                <i className='fa-solid fa-coins text-grass-50' />
              </div>
              <p className='text-sm'>
                {generatePriceDescription(event, currentCurrencySign)}
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-3 flex flex-col items-center'>
                <i className='fa-solid fa-location-dot text-grass-50' />
              </div>
              <p className='text-sm'>{event?.location.addressName}</p>
            </div>
          </div>

          <div className='mt-auto self-center mb-2'>
            <Button
              asLink
              href={paths.Event(event.id)}
              onClick={saveMapData}
              text={t('more')}
              classNames='text-sm px-2 py-0'
              color='bg-grass-40'
            />
          </div>
        </div>
      </div>
    </InfoBox>
  );
};

export default MapInfoBox;
