# Futbolovo SEO Implementation

This document outlines the SEO structure and best practices used in the Futbolovo application.

## Architecture

The SEO implementation is organized into the following components:

1. **SEO Metadata Component**: `src/components/molecules/SEOMetadata.tsx`

   - Handles page-specific metadata
   - Manages canonical URLs and alternate language links
   - Includes JSON-LD structured data

2. **JSON-LD Utilities**: `src/utils/jsonld.utils.ts`

   - Generates structured data for different entity types
   - Organization, Website, Event, and Sports Facility schemas

3. **SEO Utilities**: `src/utils/seo/*.ts`

   - Dynamic image generation (`dynamic-images.ts`)
   - Sitemap generation (`sitemap-generator.ts`)

4. **Next.js Metadata API**: `src/app/*.ts`
   - `sitemap.ts` - Dynamic sitemap generation
   - `robots.ts` - Robots.txt configuration

## Features

- **Internationalization Support**: Proper handling of multiple languages with hreflang tags
- **Structured Data**: Rich JSON-LD data for better search engine understanding
- **Dynamic Metadata**: Page-specific titles, descriptions, and images
- **Validation**: Schema validation to ensure compliance with Schema.org
- **Sitemap Generation**: Automatic sitemap.xml and robots.txt generation

## Usage

### Adding SEO metadata to a page:

```tsx
// In your page component
import SEOMetadata from '@/components/molecules/SEOMetadata';
import { paths } from '@/constants/paths';

// Basic usage
<SEOMetadata path={paths.YourPage} t={t} />

// With custom page-specific structured data
<SEOMetadata
  path={paths.Event(id)}
  t={t}
  jsonLd={generateEventSchema(eventData, t)}
/>

// With custom page title and description
<SEOMetadata
  path={paths.Event(id)}
  t={t}
  jsonLd={generateEventSchema(eventData, t)}
  pageTitle={`Event: ${eventData.name}`}
  pageDescription={eventData.description}
/>
```

### Generating JSON-LD schemas:

```tsx
import {
  generateOrganizationSchema,
  generateEventSchema,
  generateSportsFacilitySchema,
} from '@/utils/jsonld.utils';

// Generate organization schema
const orgSchema = generateOrganizationSchema(t);

// Generate event schema
const eventSchema = generateEventSchema(eventData, t);

// Generate sports facility schema
const facilitySchema = generateSportsFacilitySchema(facilityData);
```

### Scripts

The project includes scripts for SEO-related tasks:

1. **Generate Sitemap**: Run `npm run generate:sitemap` to create sitemap.xml and robots.txt files

## Testing

To test your structured data:

1. Use the Google Rich Results Test: https://search.google.com/test/rich-results
2. Use the Schema.org Validator: https://validator.schema.org/

## Best Practices

1. **Always include SEO metadata** on every page
2. **Use descriptive titles and descriptions** that include relevant keywords
3. **Add structured data** for all relevant content types
4. **Generate and update sitemaps** when adding new pages
5. **Use localized metadata** for better international SEO

## Maintenance

Regularly check:

1. Schema validity as Schema.org specifications evolve
2. SEO performance through Google Search Console
3. Sitemap.xml to ensure all pages are included
