import type { Metadata } from "next";
import { Protest_Guerrilla } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import Script from "next/script";
import { Footer, Header } from "@/components/molecules";

const protestGuerilla = Protest_Guerrilla({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Futbolovo - find football everywhere",
  description: "By mycak",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
