'use client';

import { useState, useMemo } from 'react';
import ServiceCard from '@/components/molecules/ServiceCard';
import { useTranslation } from '@/app/i18n/client';
import { Event } from '@prisma/client';
import { Location } from '@/types/common';

const ServicesSearch = ({
  lng,
  services,
}: {
  lng: string;
  services: Event[];
}) => {
  const { t } = useTranslation(lng);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter services based on search query
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) {
      return services;
    }

    const query = searchQuery.toLowerCase();
    return services.filter((service) => {
      const title = service.name.toLowerCase();
      const description = service.description?.toLowerCase() || '';
      const location =
        (service.location as Location)?.addressName?.toLowerCase() || '';
      return (
        title.includes(query) ||
        description.includes(query) ||
        location.includes(query)
      );
    });
  }, [searchQuery, services]);

  return (
    <>
      {/* Search Input Section */}
      <div className='max-w-4xl mx-auto mt-8'>
        <div className='relative'>
          <input
            type='search'
            placeholder={t('servicesPage.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg text-ivory-150 placeholder-gray-400 focus:outline-none focus:border-grass-50 transition-colors duration-200'
          />
          <i className='fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-grass-50' />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ivory-150 transition-colors duration-200'
              aria-label='Clear search'
            >
              <i className='fa-solid fa-times' />
            </button>
          )}
        </div>
      </div>

      {/* Services List Section */}
      <div className='max-w-4xl mx-auto mt-8'>
        {services.length === 0 ? (
          <div className='text-center py-12 text-gray-400'>
            <i className='fa-solid fa-briefcase text-4xl mb-4' />
            <p className='text-lg'>{t('servicesPage.noServicesInDatabase')}</p>
            <p className='text-sm mt-2'>
              {t('servicesPage.servicesWillAppear')}
            </p>
          </div>
        ) : filteredServices.length > 0 ? (
          <div className='grid gap-6 md:gap-8'>
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} lng={lng} />
            ))}
          </div>
        ) : (
          <div className='text-center py-12 text-gray-400'>
            <i className='fa-solid fa-search text-4xl mb-4' />
            <p className='text-lg'>{t('servicesPage.noResults')}</p>
            <p className='text-sm mt-2'>
              {t('servicesPage.tryDifferentKeywords')}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ServicesSearch;
