import type { Metadata } from 'next';
import { Protest_Guerrilla } from 'next/font/google';
import clsx from 'clsx';
import '../../globals.css';
import Script from 'next/script';
import { mainPagesMetadata } from '@/constants/metadata';
import { dir } from 'i18next';
import { languages, fallbackLng } from '../i18n/settings';
import { translate } from '../i18n';
import Header from '@/components/molecules/Header';
import Footer from '@/components/molecules/Footer';
import Providers from '../providers';

const protestGuerilla = Protest_Guerrilla({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
});

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata({
  params: { lng },
}: {
  params: { lng: string };
}): Promise<Metadata> {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await translate(lng);
  return {
    ...mainPagesMetadata(t),
    icons: {
      icon: '/favicon.png',
      shortcut: '/favicon.png',
      apple: '/favicon.png',
    },
    // Google site verification meta tag
    other: {
      'google-site-verification': 'dAI8EDPV-YcgL-Y67csG4n06zMXekj9MESY-Ywbl1lM',
    },
  };
}

export default function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: {
    lng: string;
  };
}>) {
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
        <Providers>
          <Header lng={lng} />
          {children}
          <Footer lng={lng} />
        </Providers>
      </body>
    </html>
  );
}
