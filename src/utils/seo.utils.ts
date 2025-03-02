export const generateHref = (lang: string, path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  return `${baseUrl}/${lang}${path}`;
};
