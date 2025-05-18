/**
 * Utility for generating dynamic Open Graph images
 * This can be expanded to integrate with services like Vercel OG Image or similar
 */

// Types for dynamic image generation
export type OGImageParams = {
  title?: string;
  description?: string;
  imageType?: 'event' | 'facility' | 'default';
  locale?: string;
};

/**
 * Generate a dynamic Open Graph image URL
 * Currently returns a static image, but this can be expanded
 * to create dynamic images based on page content
 */
export const generateOGImage = (_params: OGImageParams = {}) => {
  // Default OG image
  const defaultImage = {
    url: 'https://i.ibb.co/kXK2MPN/og-futbolovo.webp',
    width: 1200,
    height: 630,
    alt: 'Futbolovo',
  };

  // In the future, this could generate a dynamic image URL based on params
  // For example: `/api/og?title=${params.title}&locale=${params.locale}`

  // For now, return the default image
  return defaultImage;
};

/**
 * Generate event-specific Open Graph image
 */
export const generateEventOGImage = (eventName: string) => {
  // This could be expanded to create dynamic event images
  // For demonstration, we're returning the default image
  return {
    url: 'https://i.ibb.co/kXK2MPN/og-futbolovo.webp',
    width: 1200,
    height: 630,
    alt: eventName || 'Futbolovo Event',
  };
};

/**
 * Generate facility-specific Open Graph image
 */
export const generateFacilityOGImage = (facilityName: string) => {
  // This could be expanded to create dynamic facility images
  // For demonstration, we're returning the default image
  return {
    url: 'https://i.ibb.co/kXK2MPN/og-futbolovo.webp',
    width: 1200,
    height: 630,
    alt: facilityName || 'Futbolovo Facility',
  };
};
