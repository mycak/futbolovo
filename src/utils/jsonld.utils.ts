import { TranslationFunction } from '@/app/i18n/types';
import { Event as FutbolovoEvent } from '@prisma/client';
import { Location } from '@/types/common';

/**
 * JSON-LD schema type for structured data
 */
export type JsonLdType = {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
};

/**
 * Generate Organization Schema for JSON-LD
 * @param t Translation function
 * @returns Organization schema object
 */

export const generateOrganizationSchema = (
  t: TranslationFunction
): JsonLdType => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Futbolovo',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://futbolovo.net',
  logo: `${process.env.NEXT_PUBLIC_APP_URL}/icons/logo-futbolovo.svg`,
  sameAs: ['https://facebook.com/futbolovo'],
  description: t('metatags.description'),
});

/**
 * Generate Website Schema for JSON-LD
 * @param t Translation function
 * @returns Website schema object
 */

export const generateWebsiteSchema = (t: TranslationFunction): JsonLdType => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Futbolovo',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://futbolovo.net',
  description: t('metatags.description'),
  inLanguage: ['pl-PL', 'en-US', 'de-DE', 'uk-UA'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

/**
 * Generate Event Schema for JSON-LD
 * @param event The event object with event details
 * @param t Translation function
 * @returns Event schema object
 */

export const generateEventSchema = (
  event: FutbolovoEvent,
  t: TranslationFunction
): JsonLdType => ({
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: event.name,
  description: event.description,
  url: `${process.env.NEXT_PUBLIC_APP_URL}/events/${event.id}`,
  startDate: event.startDate?.toISOString() || event.date?.toISOString(),
  endDate: event.endDate?.toISOString() || event.date?.toISOString(),
  location: event.location && {
    '@type': 'Place',
    name: (event.location as Location).addressName || '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: (event.location as Location).addressName || '',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: (event.location as Location).latitude,
      longitude: (event.location as Location).longitude,
    },
  },
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  isAccessibleForFree: event.priceFrom === 0,
  offers: event.priceFrom
    ? {
        '@type': 'Offer',
        price: event.priceFrom,
        priceCurrency: event.currency || 'PLN',
        availability: 'https://schema.org/InStock',
        validFrom: event.startDate?.toISOString() || event.date?.toISOString(),
      }
    : undefined,
  organizer: {
    '@type': 'Organization',
    name: event.name,
    email: event.email,
    telephone: event.phoneNumber,
  },
  performer: {
    '@type': 'SportsTeam',
    name: t('metatags.sportsTeamName'),
    sport: 'Soccer',
  },
});

/**
 * Generate Sports Facility Schema for JSON-LD
 * @param facility The facility object with details like location, contact info
 * @returns Sports Facility schema object
 */

export const generateSportsFacilitySchema = (facility: {
  name: string;
  location: {
    addressName: string;
    latitude: number;
    longitude: number;
  };
  category?: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
}): JsonLdType => ({
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  name: facility.name,
  '@id': `${process.env.NEXT_PUBLIC_APP_URL}/location/${facility.name}`,
  description: facility.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: facility.location.addressName,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: facility.location.latitude,
    longitude: facility.location.longitude,
  },
  publicAccess: true,
  additionalType: 'http://schema.org/SoccerField',
  ...(facility.email && { email: facility.email }),
  ...(facility.phoneNumber && { telephone: facility.phoneNumber }),
  amenityFeature: [
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Soccer Field',
      value: true,
    },
  ],
});
