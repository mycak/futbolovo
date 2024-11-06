import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.indexOf("icon") > -1 ||
    req.nextUrl.pathname.indexOf("chrome") > -1 ||
    ["icons", "images", "favicon"].some((el) =>
      req.nextUrl.pathname.includes(el),
    )
  )
    return NextResponse.next();
  let lng;
  const pathnameParts = req.nextUrl.pathname.split("/");
  const lngFromPath = pathnameParts[1];

  if (languages.includes(lngFromPath)) lng = lngFromPath;

  if (req.cookies.has(cookieName) && !lng) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  }

  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));

  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    console.log(1, fallbackLng, lng);
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url),
    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") as string);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }
  return NextResponse.next();
}
