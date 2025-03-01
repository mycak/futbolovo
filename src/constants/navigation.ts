import { NavigationItem, NavigationKey } from '@/types/common';
import { paths } from './paths';
import { TFunction } from 'i18next';
import { signOut } from 'next-auth/react';

export const navigationItems = (
  isSignedIn: boolean,
  t: TFunction<'translation', undefined>
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
  auth: isSignedIn
    ? [
        {
          text: t('auth.changePassword.title'),
          to: paths.ChangePassword,
        },
        {
          text: t('auth.logout'),
          to: paths.Map,
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
