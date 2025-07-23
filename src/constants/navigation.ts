import { NavigationItem, NavigationKey } from '@/types/common';
import { paths } from './paths';
import { signOut } from 'next-auth/react';
import { TranslationFunction } from '@/app/i18n/types';

export const navigationItems = (
  isSignedIn: boolean,
  t: TranslationFunction
): Record<NavigationKey, NavigationItem[]> => ({
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
    ...(isSignedIn
      ? [
          {
            text: t('myList'),
            to: paths.MyEvents,
          },
        ]
      : []),
  ],
  news: [
    {
      text: t('navigation.news'),
      to: paths.News,
    },
  ],
  auth: isSignedIn
    ? [
        {
          text: t('auth.changePassword.title'),
          to: paths.ChangePassword,
        },
        {
          text: t('auth.logout'),
          icon: 'fa-solid fa-power-off',
          to: paths.Dashboard,
          callback: () => signOut({ callbackUrl: paths.Dashboard }),
        },
      ]
    : [
        {
          text: t('auth.login'),
          to: paths.Login,
        },
        {
          text: t('auth.register'),
          to: paths.Register,
        },
      ],
});
