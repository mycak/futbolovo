'use client';

import React, { useState } from 'react';
import { Event } from '@prisma/client';
import { Location } from '@/types/common';
import EventImage from '@/components/molecules/Events/EventImage';
import { useTranslation } from '@/app/i18n/client';

interface ServiceCardProps {
  service: Event;
  lng: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, lng }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation(lng);

  const location = service.location as Location | null;
  const description = service.description || '';

  // Check if description is longer than 2 lines (approximately 150 characters)
  const needsExpansion = description.length > 150;
  const truncatedDescription = needsExpansion
    ? description.slice(0, 150) + '...'
    : description;

  // Generate price description
  const getPriceDescription = () => {
    const currency = service.currency || 'zł';
    if (service.price) {
      return `${service.price} ${currency}`;
    } else if (service.priceFrom && service.priceTo) {
      return `${service.priceFrom} - ${service.priceTo} ${currency}`;
    } else if (service.priceFrom) {
      return `${service.priceFrom} ${currency}`;
    }
    return t('servicesPage.priceNegotiable');
  };

  return (
    <div className='bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-grass-50 transition-all duration-300'>
      <div className='grid md:grid-cols-[300px_1fr] gap-6'>
        {/* Image Section */}
        <EventImage eventData={service} classNames='max-h-full' />

        {/* Content Section */}
        <div className='p-6'>
          {/* Title */}
          <h3 className='text-2xl font-semibold text-grass-20 mb-4'>
            {service.name}
          </h3>

          {/* Info Grid */}
          <div className='grid gap-3 mb-4'>
            {/* Location */}
            {location?.addressName && (
              <div className='flex items-center gap-3'>
                <i className='fa-solid fa-location-dot text-grass-50 flex-shrink-0' />
                <p className='text-ivory-150'>{location.addressName}</p>
              </div>
            )}

            {/* Price */}
            <div className='flex items-center gap-3'>
              <i className='fa-solid fa-coins text-grass-50 flex-shrink-0' />
              <p className='text-ivory-150'>{getPriceDescription()}</p>
            </div>

            {/* Contact */}
            <div className='flex items-center gap-3'>
              <i className='fa-solid fa-phone-flip text-grass-50 flex-shrink-0' />
              <p className='text-ivory-150'>{service.phoneNumber}</p>
            </div>

            {/* Email */}
            <div className='flex items-center gap-3'>
              <i className='fa-regular fa-envelope text-grass-50 flex-shrink-0' />
              <p className='text-ivory-150'>{service.email}</p>
            </div>
          </div>

          {/* Description */}
          {description && (
            <div className='mt-4'>
              <div className='flex items-start gap-3'>
                <i className='fa-regular fa-comment text-grass-50 flex-shrink-0 mt-1' />
                <div className='flex-1'>
                  <p className='text-ivory-150 leading-relaxed whitespace-pre-line'>
                    {isExpanded ? description : truncatedDescription}
                  </p>
                  {needsExpansion && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className='mt-3 text-grass-50 hover:text-grass-30 transition-colors duration-200 font-medium text-sm flex items-center gap-2'
                    >
                      {isExpanded ? (
                        <>
                          <span>{t('servicesPage.showLess')}</span>
                          <i className='fa-solid fa-chevron-up text-xs' />
                        </>
                      ) : (
                        <>
                          <span>{t('servicesPage.readMore')}</span>
                          <i className='fa-solid fa-chevron-down text-xs' />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
