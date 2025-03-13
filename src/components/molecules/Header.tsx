'use client';

import React from 'react';
import NavigationMenu from '@/components/organisms/NavigationMenu';
import { useTranslation } from '@/app/i18n/client';
import { mainTopics } from '@/constants/texts';
import { navigationItems } from '@/constants/navigation';
import PageWrapper from '../atoms/PageWrapper';
import Logo from '../atoms/Logo';
import DashboardHeading from '../atoms/DashboardHeading';
import Divider from '../atoms/Divider';
import { useSession } from 'next-auth/react';
import UserNavigationMenu from '../organisms/UserNavigationMenu';
import LanguageSwitcher from '../organisms/LanguageSwitcher';

const Header = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const { status } = useSession();

  // Window.location.href is used to achieve full page reload (google elements - apiJsLoader issue with language change)
  return (
    <>
      <PageWrapper classNames='grid grid-cols-[30px_auto_30px] items-center w-full pt-4'>
        <LanguageSwitcher classNames='flex items-center mr-6' lng={lng} />

        <Logo />
        <div className='justify-self-end flex gap-4'>
          <NavigationMenu
            navigationItems={navigationItems(status === 'authenticated', t)}
          />
          <UserNavigationMenu />
        </div>
      </PageWrapper>
      <DashboardHeading mainTopics={mainTopics(t)} classNames='my-4' />
      <PageWrapper>
        <Divider classNames='!mt-0 mb-6' />
      </PageWrapper>
    </>
  );
};

export default Header;
