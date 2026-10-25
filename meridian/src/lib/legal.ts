import { getTranslations } from 'next-intl/server';
import { resolveLegalLocale, type LegalNamespace } from '@/i18n/catalog';

/** Translator for a legal namespace: reviewed translation, or the English source plus a banner flag. */
export async function getLegalTranslations<N extends LegalNamespace>(locale: string, namespace: N) {
  const resolved = resolveLegalLocale(locale, namespace);
  const t = await getTranslations({ locale: resolved.locale, namespace });
  return { t, lang: resolved.locale, englishOnly: resolved.englishOnly };
}
