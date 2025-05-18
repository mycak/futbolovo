import { MetadataRoute } from 'next';
import { locales } from '@/configs/i18n';

/**
 * Generate sitemap entries for the Next.js app
 * This uses the new Next.js 13+ app router metadata API
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://futbolovo.net';

  // Define all the pages manually based on the paths constants
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add entries for each locale
  locales.forEach((locale) => {
    // Main pages - high priority
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    });

    sitemapEntries.push({
      url: `${baseUrl}/${locale}/map`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Events pages
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/events/add`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    sitemapEntries.push({
      url: `${baseUrl}/${locale}/events/add/confirm`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Information pages
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    });

    sitemapEntries.push({
      url: `${baseUrl}/${locale}/cooperation`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    });

    sitemapEntries.push({
      url: `${baseUrl}/${locale}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    });

    sitemapEntries.push({
      url: `${baseUrl}/${locale}/statute`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    });

    // Auth pages
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    sitemapEntries.push({
      url: `${baseUrl}/${locale}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    sitemapEntries.push({
      url: `${baseUrl}/${locale}/password-reset`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    });

    sitemapEntries.push({
      url: `${baseUrl}/${locale}/password-remind`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    });

    sitemapEntries.push({
      url: `${baseUrl}/${locale}/register-confirm`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    });

    // User pages (these might be behind auth, but still good for sitemap)
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/my-events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    sitemapEntries.push({
      url: `${baseUrl}/${locale}/profile`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // You can fetch dynamic content here and add it to the sitemap
  // For example, events with their IDs, facilities, etc.

  return sitemapEntries;
}
