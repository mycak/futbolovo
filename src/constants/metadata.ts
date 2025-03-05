import { TranslationFunction } from '@/app/i18n/types';

export const mainPagesMetadata = (t: TranslationFunction) => ({
  title: t('metatags.title'),
  description: t('metatags.description'),
  metadataBase: new URL('https://futbolovo.net'),
  openGraph: {
    type: 'website',
    siteName: 'Futbolovo',
    locale: 'pl_PL',
    title: t('metatags.title'),
    description: t('metatags.description'),
    url: 'https://futbolovo.net/',
    images: [
      {
        url: 'https://i.ibb.co/kXK2MPN/og-futbolovo.webp',
        width: 1200,
        height: 630,
        alt: t('metatags.title'),
      },
    ],
    localeAlternates: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: t('metatags.title'),
    description: t('metatags.description'),
    images: [
      {
        url: 'https://i.ibb.co/kXK2MPN/og-futbolovo.webp',
        width: 1200,
        height: 630,
        alt: t('metatags.title'),
      },
    ],
  },
  robots: {
    follow: true,
    index: true,
  },
  keywords: ['futbol', 'piłka nożna', 'soccer', 'sporty', 'boiska'],
});
