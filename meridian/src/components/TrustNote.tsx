import { getTranslations } from 'next-intl/server';
import { site } from '@/config/site';

/** Trust signal shown beside every call to action. Facts only — nothing unverified. */
export async function TrustNote({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const t = await getTranslations('Trust');
  const color = tone === 'dark' ? 'text-ivory/90' : 'text-slate/85';
  return (
    <ul className={`mt-3 flex flex-col gap-1 text-base ${color}`}>
      <li>✓ {t('attorney', { name: site.attorney.name })}</li>
      <li>✓ {t('local')}</li>
    </ul>
  );
}
