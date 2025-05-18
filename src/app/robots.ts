import { MetadataRoute } from 'next';

/**
 * Generate robots.txt for the Next.js app
 * This uses the new Next.js 13+ app router metadata API
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://futbolovo.net';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
