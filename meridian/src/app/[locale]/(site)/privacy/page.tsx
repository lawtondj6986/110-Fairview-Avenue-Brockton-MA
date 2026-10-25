import type { Metadata } from 'next';
import { LegalBanner } from '@/components/LegalBanner';
import { getLegalTranslations } from '@/lib/legal';
import { initLocale, type LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getLegalTranslations(locale, 'Privacy');
  return pageMetadata({ locale, path: '/privacy', title: t('title'), description: t('lead') });
}

const SECTIONS = [
  { title: 'collectTitle', items: ['collect1', 'collect2', 'collect3'] },
  { title: 'keepTitle', items: ['keep1', 'keep2', 'keep3'] },
  { title: 'shareTitle', items: ['share1', 'share2'] },
] as const;

export default async function PrivacyPage({ params }: LocaleParams) {
  const locale = await initLocale(params);
  const { t, lang, englishOnly } = await getLegalTranslations(locale, 'Privacy');
  return (
    <div className="py-6">
      {englishOnly && <LegalBanner />}
      <article lang={lang} className="prose-plain max-w-3xl">
        <h1 className="text-3xl md:text-4xl">{t('title')}</h1>
        <p className="mt-3 text-lg">{t('lead')}</p>
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2>{t(s.title)}</h2>
            <ul>
              {s.items.map((k) => (
                <li key={k}>{t(k)}</li>
              ))}
            </ul>
          </section>
        ))}
        <h2>{t('contactTitle')}</h2>
        <p>{t('contactText')}</p>
      </article>
    </div>
  );
}
