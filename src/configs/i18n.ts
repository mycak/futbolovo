export const defaultLocale = 'pl';
export const locales = ['pl', 'uk', 'en', 'de'];

export const languageMappings = {
  pl: {
    htmlLang: 'pl-PL',
    ogLocale: 'pl_PL',
  },
  en: {
    htmlLang: 'en-US',
    ogLocale: 'en_US',
  },
  de: {
    htmlLang: 'de-DE',
    ogLocale: 'de_DE',
  },
  uk: {
    htmlLang: 'uk-UA',
    ogLocale: 'uk_UA',
  },
} as const;
