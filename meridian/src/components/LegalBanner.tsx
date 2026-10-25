import { getTranslations } from 'next-intl/server';

/** Shown (in the reader's language) when a legal page falls back to the English source. */
export async function LegalBanner() {
  const t = await getTranslations('LegalBanner');
  return (
    <div role="note" className="mb-6 rounded-card border-l-4 border-brass bg-ivory-dark p-4" data-testid="english-only-banner">
      <p className="font-semibold text-navy">{t('title')}</p>
      <p>{t('text')}</p>
    </div>
  );
}
