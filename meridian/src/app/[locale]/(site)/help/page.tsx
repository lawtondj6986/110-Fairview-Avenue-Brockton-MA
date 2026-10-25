import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LegalBanner } from '@/components/LegalBanner';
import { Tile } from '@/components/Tile';
import { AREAS } from '@/lib/areas';
import { getLegalTranslations } from '@/lib/legal';
import { initLocale, type LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getLegalTranslations(locale, 'Areas');
  return pageMetadata({ locale, path: '/help', title: t('indexTitle'), description: t('indexLead') });
}

export default async function HelpIndex({ params }: LocaleParams) {
  const locale = await initLocale(params);
  const { t, lang, englishOnly } = await getLegalTranslations(locale, 'Areas');
  const tHome = await getTranslations('Home');
  return (
    <div className="py-6">
      {englishOnly && <LegalBanner />}
      <div lang={lang}>
        <h1 className="text-3xl md:text-4xl">{t('indexTitle')}</h1>
        <p className="mt-3 max-w-2xl text-lg">{t('indexLead')}</p>
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        <li>
          <Tile href="/emergency" icon="alert" label={tHome('tiles.emergency')} emergency />
        </li>
        {AREAS.map((a) => (
          <li key={a.slug}>
            <Tile href={`/help/${a.slug}`} icon={a.icon} label={tHome(`tiles.${a.key}`)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
