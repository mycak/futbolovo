'use client';
import React, { useState } from 'react';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import { generateDummyPoster } from '@/utils';
import clsx from 'clsx';
import { Event } from '@prisma/client';
import { AddEventInputs } from '@/schemas/addEventSchema';
import DynamicLoader from '@/components/atoms/DynamicLoader';

const EventImage = ({
  eventData,
  classNames,
  onPageImage,
}: {
  eventData: Event | AddEventInputs;
  classNames?: string;
  onPageImage?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className={clsx('relative mx-auto max-w-full', classNames)}>
      {isLoading ? (
        <div
          className={clsx(
            !onPageImage
              ? 'absolute left-[20%] flex items-center justify-center mx-auto w-28'
              : 'flex items-center justify-center'
          )}
        >
          <div className='scale-50'>
            <DynamicLoader />
          </div>
        </div>
      ) : null}

      {eventData.image ? (
        <CldImage
          width='424'
          priority
          height='600'
          src={eventData?.image}
          alt={eventData?.name}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      ) : (
        <Image
          src={generateDummyPoster(eventData.category)}
          width={400}
          height={610}
          priority
          alt={eventData?.name}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      )}
    </div>
  );
};

export default EventImage;
