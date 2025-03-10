import { defaultLocale, locales } from '@/configs/i18n';
import Head from 'next/head';
import { generateHref } from '@/utils/seo.utils';
type SEOCanonicalProps = {
  path: string;
};

const SEOCanonical = ({ path }: SEOCanonicalProps) => {
  const canonicalUrl = generateHref(defaultLocale, path);

  return (
    <Head>
      <link rel='canonical' href={canonicalUrl} />

      {locales.map((lang) => (
        <link
          key={lang}
          rel='alternate'
          hrefLang={lang}
          href={generateHref(lang, path)}
        />
      ))}

      <link rel='alternate' hrefLang='x-default' href={canonicalUrl} />
    </Head>
  );
};

export default SEOCanonical;
