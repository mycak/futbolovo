import { locales, languageMappings } from '@/configs/i18n';
import Head from 'next/head';
import { generateHref } from '@/utils/seo.utils';

type SEOCanonicalProps = {
  path: string;
};

const SEOCanonical = ({ path }: SEOCanonicalProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://futbolovo.net';
  const canonicalUrl = `${baseUrl}${path}`;

  return (
    <Head>
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
    </Head>
  );
};

export default SEOCanonical;
