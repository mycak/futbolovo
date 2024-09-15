import type { Metadata } from "next";
import { Protest_Guerrilla } from "next/font/google";
import clsx from "clsx";

import "./globals.css";
import Script from "next/script";
import Footer from "@/components/molecules/Footer";
import Logo from "@/components/atoms/Logo";

const protestGuerilla = Protest_Guerrilla({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Futbolovo - find football everywhere",
  description: "By mycak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
        <Logo />
        {children}
        <Footer />
      </body>
    </html>
  );
}
