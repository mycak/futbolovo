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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Get all available images - prioritize new images array, fallback to legacy image field
  const images = (() => {
    const eventDataWithImages = eventData as AddEventInputs;
    if (eventDataWithImages.images && eventDataWithImages.images.length > 0) {
      return [
        eventDataWithImages.image as string,
        ...eventDataWithImages.images.filter((img) => img),
      ]; // Filter out empty strings
    }
    if (eventData.image) {
      return [eventData.image];
    }
    return [];
  })();

  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

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

      {images.length > 0 ? (
        <div className='relative min-w-[200px]'>
          <CldImage
            width='424'
            priority
            height='600'
            src={images[currentImageIndex]}
            alt={`${eventData?.name} - Image ${currentImageIndex + 1}`}
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

          {hasMultipleImages && (
            <>
              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity'
                aria-label='Previous image'
              >
                <i className='fa-solid fa-chevron-left' />
              </button>
              <button
                onClick={nextImage}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity'
                aria-label='Next image'
              >
                <i className='fa-solid fa-chevron-right' />
              </button>

              {/* Image indicators */}
              <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={clsx(
                      'w-3 h-3 rounded-full transition-colors',
                      index === currentImageIndex
                        ? 'bg-white'
                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    )}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
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
