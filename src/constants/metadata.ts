import { TFunction } from "i18next";

export const mainPagesMetadata = (t: TFunction<"translation", undefined>) => ({
  title: t("metatags.title"),
  description: t("metatags.description"),
  openGraph: {
    title: t("metatags.title"),
    description: t("metatags.description"),
    url: "https://futbolovo.netlify.app/",
    images: [
      {
        url: "/images/media.jpg",
        width: 1200,
        height: 630,
        alt: t("metatags.title"),
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: t("metatags.title"),
    description: t("metatags.description"),
    images: ["/images/media.jpg"],
  },
  robots: {
    follow: true,
    index: true,
  },
});
