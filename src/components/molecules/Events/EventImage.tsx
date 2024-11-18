'use client';
import React, { useState } from 'react';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import { generateDummyPoster } from '@/utils';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { Event } from '@prisma/client';
import { AddEventInputs } from '@/schemas/addEventSchema';
import Loader from '@/components/atoms/Loader';

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
  const { lng } = useParams();

  return (
    <div className={clsx('relative mx-auto max-w-full', classNames)}>
      {isLoading ? (
        !onPageImage ? (
          <div className='absolute left-[20%] flex items-center justify-center mx-auto w-28'>
            <Loader lng={lng as string} small />
          </div>
        ) : (
          <>
            <div className='flex items-center justify-center mx-auto w-64'>
              <Loader lng={lng as string} small />
            </div>
          </>
        )
      ) : (
        <></>
      )}

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
