import { getLocaleConfig } from '@/i18n/locales';

/**
 * All user-visible dates go through here. ICU has no data for `ht` or `kea`, so each locale
 * maps to an Intl locale in locales.ts (ht → fr-HT, kea → pt-CV). Numeric months avoid
 * showing French/Portuguese month names to Creole readers.
 */
export function formatDate(date: Date, locale: string, timeZone = 'America/New_York'): string {
  const { intl } = getLocaleConfig(locale);
  return new Intl.DateTimeFormat(intl, { day: 'numeric', month: 'numeric', year: 'numeric', timeZone }).format(date);
}

export function formatTime(date: Date, locale: string, timeZone = 'America/New_York'): string {
  const { intl } = getLocaleConfig(locale);
  return new Intl.DateTimeFormat(intl, { hour: 'numeric', minute: '2-digit', timeZone }).format(date);
}
