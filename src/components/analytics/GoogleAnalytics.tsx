import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';

export const GoogleAnalytics = () => {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_TAG;

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return <NextGoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
};
