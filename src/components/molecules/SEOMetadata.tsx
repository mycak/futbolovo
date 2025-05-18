import { locales, languageMappings } from '@/configs/i18n';
import Head from 'next/head';
import { generateHref } from '@/utils/seo.utils';
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/utils/jsonld.utils';
import { TranslationFunction } from '@/app/i18n/types';

type JsonLdType = {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
};

type SEOMetadataProps = {
  path: string;
  t: TranslationFunction;
  jsonLd?: JsonLdType; // Additional JSON-LD data specific to the page
  pageTitle?: string; // Optional custom page title
  pageDescription?: string; // Optional custom page description
  pageImage?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  }; // Optional custom page image
};

/**
 * SEOMetadata component adds essential SEO meta tags to pages
 * - Canonical and alternate language links
 * - JSON-LD structured data
 * - Open Graph meta tags
 * - Twitter card meta tags
 */
const SEOMetadata = ({
  path,
  t,
  jsonLd,
  pageTitle,
  pageDescription,
  pageImage,
}: SEOMetadataProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://futbolovo.net';
  const canonicalUrl = `${baseUrl}${path}`;

  // Base JSON-LD schemas that should be present on all pages
  const orgSchema = generateOrganizationSchema(t);
  const websiteSchema = generateWebsiteSchema(t);

  // Combine base schemas with page-specific schema if provided
  const baseSchemas = [orgSchema, websiteSchema];
  const schemas = jsonLd ? [...baseSchemas, jsonLd] : baseSchemas;

  // Default image for sharing
  const defaultImage = {
    url: 'https://i.ibb.co/kXK2MPN/og-futbolovo.webp',
    width: 1200,
    height: 630,
    alt: t('metatags.title'),
  };

  // Use custom page data or defaults
  const title = pageTitle || t('metatags.title');
  const description = pageDescription || t('metatags.description');
  const image = pageImage || defaultImage;

  return (
    <Head>
      {/* Basic SEO tags */}
      <title>{title}</title>
      <meta name='description' content={description} />

      {/* Canonical URL */}
      <link rel='canonical' href={canonicalUrl} />

      {/* Language alternates */}
      {locales.map((lang) => (
        <link
          key={lang}
          rel='alternate'
          hrefLang={
            languageMappings[lang as keyof typeof languageMappings].htmlLang
          }
          href={generateHref(lang, path)}
        />
      ))}

      {/* x-default for language negotiation */}
      <link rel='alternate' hrefLang='x-default' href={`${baseUrl}${path}`} />

      {/* Open Graph tags */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={canonicalUrl} />
      <meta property='og:image' content={image.url} />
      <meta property='og:image:width' content={String(image.width)} />
      <meta property='og:image:height' content={String(image.height)} />
      <meta property='og:image:alt' content={image.alt} />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Futbolovo' />

      {/* Additional meta tags for better SEO */}
      {locales.map((lang) => (
        <meta
          key={lang}
          property='og:locale:alternate'
          content={
            languageMappings[lang as keyof typeof languageMappings].ogLocale
          }
        />
      ))}

      {/* Twitter Card tags */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image.url} />
      <meta name='twitter:creator' content='@futbolovo' />

      {/* JSON-LD structured data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
    </Head>
  );
};

export default SEOMetadata;
