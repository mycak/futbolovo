import { NavigationItem, NavigationKey } from '@/types/common';
import { paths } from './paths';
import { TFunction } from 'i18next';

export const navigationItems: (
  isSignIn: boolean,
  t: TFunction<'translation', undefined>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
) => Record<NavigationKey, NavigationItem[]> = (_isSignIn, t) => ({
  mainPage: [
    {
      text: t('navigation.mainPage'),
      to: paths.Dashboard,
    },
  ],
  map: [
    {
      text: t('navigation.map'),
      to: paths.Map,
    },
    {
      text: t('navigation.addPoint'),
      to: paths.EventAdd,
    },
  ],
  other: [
    {
      text: t('navigation.contact'),
      to: paths.Contact,
    },
    {
      text: t('navigation.cooperation'),
      to: paths.Cooperation,
    },
    {
      text: t('privacyPolicyPage.title'),
      to: paths.PrivacyPolicy,
    },
    {
      text: t('statutePage.title'),
      to: paths.Statute,
    },
  ],
  // auth: isSignIn
  //   ? [
  //       {
  //         text: "Wyloguj",
  //         to: "/signout",
  //       },
  //     ]
  //   : [
  //       {
  //         text: "Zaloguj",
  //         to: "/login",
  //       },
  //       {
  //         text: "Zarejestruj",
  //         to: "/register",
  //       },
  //     ],
});
