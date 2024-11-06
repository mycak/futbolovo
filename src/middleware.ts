import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from './app/i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)',
  ],
};

import { NextRequest, NextResponse } from 'next/server';

// Function to format URL by replacing double slashes with a single slash
function formatUrl(url: string): string {
  return url.replace(/\/{2,}/g, '/');
}

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.indexOf('icon') > -1 ||
    req.nextUrl.pathname.indexOf('chrome') > -1 ||
    ['icons', 'images', 'favicon'].some((el) =>
      req.nextUrl.pathname.includes(el)
    )
  )
    return NextResponse.next();
  let lng;
  const pathnameParts = req.nextUrl.pathname.split('/');
  const lngFromPath = pathnameParts[1];

  if (languages.includes(lngFromPath)) lng = lngFromPath;

  if (req.cookies.has(cookieName) && !lng) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  }

  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));

  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    const pathname = req.nextUrl.pathname.endsWith('/')
      ? req.nextUrl.pathname.slice(0, -1)
      : req.nextUrl.pathname;
    const formattedUrl = formatUrl(`/${lng}${pathname}${req.nextUrl.search}`);
    return NextResponse.redirect(new URL(formattedUrl, req.url));
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') as string);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }
  return NextResponse.next();
}
