/**
 * Locale registry — the ONLY place to add a language.
 * To add zh or vi: append an entry here and create messages/{code}.json. Nothing else changes.
 * Order = priority order shown in the language chooser.
 */
export type LocaleConfig = {
  code: string;
  /** Language name in its own language (no flags, ever). */
  nativeName: string;
  /** Locale to borrow missing keys from. Absent = English source. */
  fallback?: string;
  /** Locale used for Intl date/number formatting (ICU lacks data for some codes). */
  intl: string;
  /** Voices to try for "Listen to this page", in order. */
  speech: string[];
  dir: 'ltr' | 'rtl';
};

export const localeConfigs = [
  { code: 'ht', nativeName: 'Kreyòl Ayisyen', intl: 'fr-HT', speech: ['ht', 'fr'], dir: 'ltr' },
  { code: 'pt', nativeName: 'Português', intl: 'pt-BR', speech: ['pt-BR', 'pt'], dir: 'ltr' },
  { code: 'kea', nativeName: 'Kriolu Kabuverdianu', fallback: 'pt', intl: 'pt-CV', speech: ['kea', 'pt-PT', 'pt'], dir: 'ltr' },
  { code: 'es', nativeName: 'Español', intl: 'es-US', speech: ['es-US', 'es'], dir: 'ltr' },
  { code: 'en', nativeName: 'English', intl: 'en-US', speech: ['en-US', 'en'], dir: 'ltr' },
] as const satisfies readonly LocaleConfig[];

export type Locale = (typeof localeConfigs)[number]['code'];

export const locales = localeConfigs.map((l) => l.code) as Locale[];

/** English is the reviewed source and the default for unmatched requests. */
export const defaultLocale: Locale = 'en';
export const sourceLocale: Locale = 'en';

export function getLocaleConfig(code: string): LocaleConfig {
  const found = (localeConfigs as readonly LocaleConfig[]).find((l) => l.code === code);
  if (!found) throw new Error(`Unknown locale: ${code}`);
  return found;
}

export function isLocale(code: string): code is Locale {
  return (locales as string[]).includes(code);
}

/** Ordered chain of locales to read messages from, ending at the source. kea → pt → en. */
export function fallbackChain(code: string): string[] {
  const chain: string[] = [];
  let current: string | undefined = code;
  while (current && !chain.includes(current)) {
    chain.push(current);
    current = getLocaleConfig(current).fallback ?? (current === sourceLocale ? undefined : sourceLocale);
  }
  return chain;
}
