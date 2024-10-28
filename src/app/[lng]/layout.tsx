import type { Metadata } from "next";
import { Protest_Guerrilla } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import Script from "next/script";
import { Footer, Header } from "@/components/molecules";
import { mainPagesMetadata } from "@/constants/metadata";
import { dir } from "i18next";
import { languages, fallbackLng } from "../i18n/settings";
import { useTranslation } from "../i18n";

const protestGuerilla = Protest_Guerrilla({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
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
  const { t } = await useTranslation(lng);
  return {
    ...mainPagesMetadata(t),
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
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
        src="https://kit.fontawesome.com/2cbff78358.js"
        crossOrigin="anonymous"
      />
      <body
        className={clsx(protestGuerilla.className, "text-ivory-150")}
        style={
          {
            "--font-guerrilla": protestGuerilla.style.fontFamily,
          } as React.CSSProperties
        }
      >
        <Header lng={lng} />
        {children}
        <Footer lng={lng} />
      </body>
    </html>
  );
}
