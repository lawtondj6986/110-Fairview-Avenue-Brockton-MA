import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { mergedCatalog } from './catalog';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return {
    locale,
    messages: mergedCatalog(locale),
    timeZone: 'America/New_York',
    formats: { dateTime: { short: { day: 'numeric', month: 'numeric', year: 'numeric' } } },
    // Missing keys must never crash a crisis page; the parity check catches them at build time.
    onError: () => {},
    getMessageFallback: ({ namespace, key }) => [namespace, key].filter(Boolean).join('.'),
  };
});
