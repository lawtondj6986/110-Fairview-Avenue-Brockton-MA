import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales } from './locales';

export const LOCALE_COOKIE = 'NEXT_LOCALE';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeCookie: { name: LOCALE_COOKIE, maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' },
  // hreflang links are emitted in <head> via generateMetadata (see lib/seo.ts).
  alternateLinks: false,
});
