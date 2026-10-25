import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { isLocale } from './i18n/locales';
import { LOCALE_COOKIE, routing } from './i18n/routing';

const intl = createMiddleware(routing);

/** Path the first-visit language chooser is served from (rendered in English chrome; names are native). */
const CHOOSER_PATH = `/${routing.defaultLocale}/choose-language`;

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;

  // First visit to the home page with no saved language → full-screen chooser (URL stays "/").
  if (pathname === '/' && !(cookie && isLocale(cookie))) {
    return NextResponse.rewrite(new URL(CHOOSER_PATH, request.url));
  }

  const response = intl(request);

  // Persist the language whenever someone lands on a localized page by full navigation
  // (chooser links, language switcher, deep links). next-intl skips this when the
  // browser language already matches; we always want the choice remembered.
  const segment = pathname.split('/')[1] ?? '';
  const isDocument = (request.headers.get('sec-fetch-dest') ?? 'document') === 'document';
  if (isDocument && isLocale(segment) && cookie !== segment && !pathname.endsWith('/choose-language')) {
    response.cookies.set(LOCALE_COOKIE, segment, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
  }
  return response;
}

export const config = {
  // Skip API, Next internals, Vercel internals and any file with an extension (sw.js, icons, etc.).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
