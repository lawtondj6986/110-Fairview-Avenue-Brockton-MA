import type { Metadata } from 'next';
import { CallButton } from '@/components/CallButton';
import { Disclaimer } from '@/components/Disclaimer';
import { LegalBanner } from '@/components/LegalBanner';
import { TrustNote } from '@/components/TrustNote';
import { getLegalTranslations } from '@/lib/legal';
import { initLocale, type LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getLegalTranslations(locale, 'Emergency');
  return pageMetadata({ locale, path: '/emergency', title: t('title'), description: t('lead') });
}

const ICE_LOCATOR = 'https://locator.ice.gov/odls/';

export default async function EmergencyPage({ params }: LocaleParams) {
  const locale = await initLocale(params);
  const { t, lang, englishOnly } = await getLegalTranslations(locale, 'Emergency');
  const list = (prefix: string, n: number) =>
    Array.from({ length: n }, (_, i) => <li key={i}>{t(`${prefix}${i + 1}` as Parameters<typeof t>[0])}</li>);

  return (
    <div className="py-6">
      {englishOnly && <LegalBanner />}
      <article lang={lang} className="prose-plain max-w-3xl">
        <h1 className="text-3xl text-signal md:text-4xl">{t('title')}</h1>
        <p className="mt-3 text-lg">{t('lead')}</p>
        <div className="not-prose my-6">
          <CallButton label={t('callCta')} emergency />
          <TrustNote />
        </div>

        <h2>{t('rightsTitle')}</h2>
        <ul>{list('rights', 5)}</ul>

        <h2>{t('familyTitle')}</h2>
        <ol>{list('family', 4)}</ol>
        <p>
          <a href={ICE_LOCATOR} rel="noopener noreferrer" target="_blank" className="text-lg font-semibold">
            {t('locatorLink')} ↗
          </a>
        </p>

        <h2>{t('prepareTitle')}</h2>
        <ul>{list('prepare', 3)}</ul>
        <p className="text-base text-slate/85">{t('offline')}</p>
      </article>
      <div className="mt-8 max-w-3xl">
        <Disclaimer />
      </div>
    </div>
  );
}
