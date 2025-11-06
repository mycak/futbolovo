import { TranslationFunction } from '@/app/i18n/types';
import { Metadata } from 'next';
import { languageMappings } from '@/configs/i18n';

export const ogMainImage = 'https://i.ibb.co/tp9wPvLv/og-Futbolovo.png';

export const generateKeywords = (t: TranslationFunction, locale: string) => {
  const commonKeywords = ['futbolovo', 'sport', 'soccer', 'football'];

  const eventKeywords = [
    t('tournament'),
    t('academyOrSchool'),
    t('field'),
    t('camp'),
    t('league'),
    t('service'),
    t('match'),
  ];

  const facilityKeywords = [
    t('facilities'),
    t('fields'),
    t('grounds'),
    t('indoor'),
    t('outdoor'),
  ];

  const activityKeywords = [
    t('training'),
    t('practice'),
    t('games'),
    t('tournaments'),
    t('academy'),
    t('youth'),
    t('camps'),
    t('schools'),
  ];

  // Locale-specific keywords
  const localeSpecificKeywords = {
    pl: [
      'piłka nożna',
      'szkółka piłkarska',
      'akademia piłki nożnej',
      'treningi piłkarskie',
      'obozy piłkarskie',
      'turnieje piłkarskie',
      'mecze piłkarskie',
      'liga piłkarska',
      'boiska piłkarskie',
      'wynajem boisk',
    ],
    en: [
      'football',
      'soccer school',
      'football academy',
      'soccer training',
      'football camps',
      'soccer tournaments',
      'football matches',
      'soccer league',
      'football fields',
      'field rental',
    ],
    de: [
      'Fußball',
      'Fußballschule',
      'Fußballakademie',
      'Fußballtraining',
      'Fußballcamp',
      'Fußballturniere',
      'Fußballspiele',
      'Fußballliga',
      'Fußballplätze',
      'Platzmiete',
    ],
    uk: [
      'футбол',
      'футбольна школа',
      'футбольна академія',
      'футбольні тренування',
      'футбольні табори',
      'футбольні турніри',
      'футбольні матчі',
      'футбольна ліга',
      'футбольні поля',
      'оренда полів',
    ],
  };

  return [
    ...commonKeywords,
    ...eventKeywords,
    ...facilityKeywords,
    ...activityKeywords,
    ...(localeSpecificKeywords[locale as keyof typeof localeSpecificKeywords] ||
      localeSpecificKeywords.en),
  ];
};

export const mainPagesMetadata = (
  t: TranslationFunction,
  locale = 'pl'
): Metadata => ({
  title: t('metatags.title'),
  description: t('metatags.description'),
  metadataBase: new URL('https://futbolovo.net'),
  keywords: generateKeywords(t, locale).join(', '),
  openGraph: {
    type: 'website',
    siteName: 'Futbolovo',
    locale: languageMappings[locale as keyof typeof languageMappings].ogLocale,
    title: t('metatags.title'),
    description: t('metatags.description'),
    url: 'https://futbolovo.net/',
    images: [
      {
        url: ogMainImage,
        width: 1200,
        height: 630,
        alt: t('metatags.title'),
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: t('metatags.title'),
    description: t('metatags.description'),
    creator: '@futbolovo',
    images: [
      {
        url: ogMainImage,
        width: 1200,
        height: 630,
        alt: t('metatags.title'),
      },
    ],
  },
  alternates: {
    canonical: 'https://futbolovo.net',
    languages: {
      'en-US': '/en',
      'pl-PL': '/pl',
      'de-DE': '/de',
      'uk-UA': '/uk',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'dAI8EDPV-YcgL-Y67csG4n06zMXekj9MESY-Ywbl1lM',
  },
});
