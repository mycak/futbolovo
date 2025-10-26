import type { Metadata } from 'next';
import { Protest_Guerrilla } from 'next/font/google';
import clsx from 'clsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import '../../globals.css';
import Script from 'next/script';
import { mainPagesMetadata } from '@/constants/metadata';
import { dir } from 'i18next';
import { languages, fallbackLng } from '../i18n/settings';
import { translate } from '../i18n';
import Header from '@/components/molecules/Header';
import Footer from '@/components/molecules/Footer';
import Providers from '../providers';
import { Notifications } from '@/components/organisms/Notifications';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 6,
  userScalable: true,
  colorScheme: 'dark',
};

const protestGuerilla = Protest_Guerrilla({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
});

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata(props: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  let { lng } = params;

  if (languages.indexOf(lng) < 0) lng = fallbackLng;

  const { t } = await translate(lng);
  const metadata = mainPagesMetadata(t, lng);

  return {
    ...metadata,
    icons: {
      icon: '/favicon.png',
      shortcut: '/favicon.png',
      apple: '/favicon.png',
    },
  };
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: {
      lng: string;
    };
  }>
) {
  const params = await props.params;

  const { lng } = params;

  const { children } = props;

  return (
    <html lang={lng} dir={dir(lng)}>
      <Script
        src='https://kit.fontawesome.com/2cbff78358.js'
        crossOrigin='anonymous'
        rel='preload'
        referrerPolicy='no-referrer'
      />
      <body
        className={clsx(protestGuerilla.className, 'text-ivory-150')}
        style={
          {
            '--font-guerrilla': protestGuerilla.style.fontFamily,
          } as React.CSSProperties
        }
      >
        <GoogleAnalytics />
        <Providers>
          <Header lng={lng} />
          {children}
          <Footer lng={lng} />
          <Notifications />
        </Providers>
      </body>
    </html>
  );
}
