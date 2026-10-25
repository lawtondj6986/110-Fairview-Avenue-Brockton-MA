import { getLocale, getTranslations } from 'next-intl/server';
import { isNamespaceReviewed } from '@/i18n/catalog';
import { sourceLocale } from '@/i18n/locales';

/**
 * Global disclaimer. Until a lawyer approves the translation, the English original
 * is shown alongside the drafted translation so the legal meaning is never lost.
 */
export async function Disclaimer({ tone = 'light', id }: { tone?: 'light' | 'dark'; id?: string }) {
  const locale = await getLocale();
  const t = await getTranslations('Disclaimer');
  const reviewed = isNamespaceReviewed(locale, 'Disclaimer');
  const tEn = reviewed ? null : await getTranslations({ locale: sourceLocale, namespace: 'Disclaimer' });
  const box =
    tone === 'dark' ? 'border-ivory/25 bg-navy-deep text-ivory/90' : 'border-brass/40 bg-white text-slate';
  return (
    <aside id={id} className={`rounded-card border p-4 text-base ${box}`} data-testid="disclaimer" aria-label={t('title')}>
      <p>
        <strong>{t('title')}:</strong> {t('text')}
      </p>
      {tEn && (
        <p lang="en" className="mt-3 text-[1rem] opacity-90">
          <strong>{tEn('englishOriginal')}:</strong> {tEn('text')}
        </p>
      )}
    </aside>
  );
}
