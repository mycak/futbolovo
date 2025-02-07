'use client';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { InfoBox } from '@react-google-maps/api';
import { generateMapIcon } from '@/utils';
import { format } from 'date-fns';
import { BulkEvents } from '@/types/common';
import { currentCurrencySign, DATE_FORMAT } from '@/constants/common';
import clsx from 'clsx';
import Image from 'next/image';
import { paths } from '@/constants/paths';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { EventCategoryEnum } from '@prisma/client';
import Button from '@/components/atoms/Button';
import Divider from '@/components/atoms/Divider';
import EventImage from '../Events/EventImage';

const MapInfoBoxExtended = ({
  events,
  close,
  mapRef,
  saveMapData,
}: {
  events: BulkEvents;
  close: () => void;
  saveMapData: () => void;
  mapRef: MutableRefObject<google.maps.Map | null>;
}) => {
  const { lng } = useParams();
  const { t } = useTranslation(lng as string);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();

  const categories = [...new Set(events.items.map((item) => item.category))];
  const [activeCategory, setActiveCategory] = useState<EventCategoryEnum>(
    categories[0]
  );
  const eventsToRender = events.items.filter(
    (event) => event.category === activeCategory
  );

  // InfoBox options for positioning and disabling default close button
  const boxOptions = {
    enableEventPropagation: true,
    pixelOffset: new google.maps.Size(-160, -250),
    closeBoxURL: '', // Remove default close icon
  };

  // Effect to handle showing and hiding the InfoBox with animation
  useEffect(() => {
    if (events.items?.length > 0) {
      setIsRendered(true);
      timeoutId.current = setTimeout(() => setIsVisible(true), 10); // Trigger fade-in animation after a small delay
    } else {
      setIsVisible(false);
      timeoutId.current = setTimeout(() => setIsRendered(false), 300); // Remove component from DOM after animation
    }

    return () => clearTimeout(timeoutId.current);
  }, [events.items]);

  const handleClose = () => {
    setIsVisible(false);
    timeoutId.current = setTimeout(() => {
      close();
      handleScrollWheel(true);
      setIsRendered(false);
    }, 300);
  };

  const handleScrollWheel = (disabled: boolean) => {
    mapRef.current?.setOptions({
      scaleControl: disabled,
      mapTypeControl: disabled,
      draggable: disabled,
    });
  };

  if (!isRendered) return null;

  return (
    <InfoBox
      position={new google.maps.LatLng(events.position as google.maps.LatLng)}
      options={boxOptions}
      onCloseClick={handleClose}
    >
      <div
        onMouseEnter={() => handleScrollWheel(false)}
        onMouseLeave={() => handleScrollWheel(true)}
        aria-labelledby='infoBox-title'
        role='dialog'
        className={clsx(
          'max-h-full relative border border-grass-50 rounded-lg bg-emerald-900 text-ivory-150 w-80 max-w-80',
          'hover:cursor-pointer focus:outline-none focus:border-grass-40',
          'transition-all duration-300 ease-out',
          isVisible ? 'opacity-95 ' : 'opacity-0'
        )}
      >
        <button
          className='absolute top-2 right-2 text-ivory-150 hover:text-grass-30 text-lg md:text-base'
          onClick={handleClose}
        >
          &#10005;
        </button>
        {/* TAB MENU */}
        <div className='flex justify-center gap-2 p-1 mt-4 md:mt-7'>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={clsx(
                'border border-emerald-900 p-1 rounded-sm transition-all duration-200 ease-in-out', // animation
                category === activeCategory &&
                  'border !border-grass-20 bg-grass-45',
                'hover:border-grass-30 hover:bg-grass-40' //hover
              )}
            >
              <Image
                src={generateMapIcon(category)}
                alt={category}
                className='object-cover'
                width={35}
                priority
                height={35}
              />
            </button>
          ))}
        </div>
        <Divider classNames='!mt-2 !mb-3' contained />
        <div className='max-h-96 overflow-y-auto overflow-x-hidden px-4 flex flex-col scrollbar-grass'>
          {eventsToRender.map((event, index) => (
            <div key={event.id}>
              <h1 className='text-xl font-bold text-center text-grass-30 mb-1'>
                {event.name}
              </h1>
              <EventImage
                eventData={event}
                classNames='w-3/5 mt-6 md:mt-0 md:w-48 mb-4'
              />
              {event.category === EventCategoryEnum.TOURNAMENT && (
                <div className='flex items-center gap-3'>
                  <div className='w-3 flex flex-col items-center'>
                    <i className='fa-solid fa-calendar-days text-grass-50' />
                  </div>

                  <p className='text-sm'>
                    {event.date
                      ? format(new Date(event.date), DATE_FORMAT)
                      : '-'}
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
                  EventCategoryEnum.MATCH,
                  EventCategoryEnum.CAMP,
                  EventCategoryEnum.TOURNAMENT,
                  EventCategoryEnum.SCHOOL,
                ] as EventCategoryEnum[]
              ).includes(event.category) && (
                <div className='flex items-center gap-3'>
                  <div className='w-3 flex flex-col items-center'>
                    <i className='fa-solid fa-child-reaching text-grass-50' />
                  </div>

                  <p className='text-sm'>
                    {event.ageCategories ? event.ageCategories.join(', ') : '-'}
                  </p>
                </div>
              )}
              <div className='flex items-center gap-3'>
                <div className='w-3 flex flex-col items-center'>
                  <i className='fa-solid fa-coins text-grass-50' />
                </div>
                <p className='text-sm'>
                  {event.price} {currentCurrencySign}
                </p>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-3 flex flex-col items-center'>
                  <i className='fa-solid fa-location-dot text-grass-50' />
                </div>
                <p className='text-sm'>{event?.location.addressName}</p>
              </div>

              <div className='flex justify-center'>
                <Button
                  asLink
                  href={paths.Event(event.id)}
                  onClick={saveMapData}
                  text={t('more')}
                  classNames='mt-2 text-sm px-2 py-0 bg-grass-40 '
                />
              </div>
              {index !== eventsToRender.length - 1 ? (
                <Divider contained classNames='!my-4 ' />
              ) : (
                <div className='mb-4' />
              )}
            </div>
          ))}
        </div>
      </div>
    </InfoBox>
  );
};

export default MapInfoBoxExtended;
