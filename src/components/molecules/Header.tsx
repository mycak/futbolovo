'use client';

import React from 'react';
import NavigationMenu from '@/components/organism/NavigationMenu';
import { useTranslation } from '@/app/i18n/client';
import { mainTopics } from '@/constants/texts';
import { navigationItems } from '@/constants/navigation';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import PageWrapper from '../atoms/PageWrapper';
import Logo from '../atoms/Logo';
import DashboardHeading from '../atoms/DashboardHeading';
import Divider from '../atoms/Divider';

const Header = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const pathname = usePathname().slice(4); // Pathname without language prefix
  // Window.location.href is used to achieve full page reload (google elements - apiJsLoader issue with language change)
  return (
    <>
      <PageWrapper classNames='grid grid-cols-[30px_auto_30px] items-center w-full pt-4'>
        <div className='flex items-center mr-6'>
          {['en', 'pl'].map((lang) => (
            <React.Fragment key={lang}>
              <button
                onClick={() => (window.location.href = `/${lang}/${pathname}`)}
                className={clsx(lng === lang && 'hidden', 'text-sm opacity-45')}
              >
                {lang.toUpperCase()}
              </button>
            </React.Fragment>
          ))}
        </div>
        <Logo />
        <div className='justify-self-end'>
          <NavigationMenu navigationItems={navigationItems(true, t)} />
        </div>
      </PageWrapper>
      <DashboardHeading mainTopics={mainTopics(t)} classNames='my-4' />
      <PageWrapper>
        <Divider classNames='!mt-0 mb-6 md:mb-12' />
      </PageWrapper>
    </>
  );
};

export default Header;
