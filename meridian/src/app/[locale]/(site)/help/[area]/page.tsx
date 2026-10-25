import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CallButton } from '@/components/CallButton';
import { LegalBanner } from '@/components/LegalBanner';
import { TrustNote } from '@/components/TrustNote';
import { isLocale } from '@/i18n/locales';
import { AREAS, findArea } from '@/lib/areas';
import { getLegalTranslations } from '@/lib/legal';
import { pageMetadata } from '@/lib/seo';

type Params = { params: Promise<{ locale: string; area: string }> };

export function generateStaticParams() {
  return AREAS.map((a) => ({ area: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, area } = await params;
  const found = findArea(area);
  if (!found) return {};
  const { t } = await getLegalTranslations(locale, 'Areas');
  return pageMetadata({
    locale,
    path: `/help/${found.slug}`,
    title: t(`${found.key}.title`),
    description: t(`${found.key}.summary`),
  });
}

export default async function AreaPage({ params }: Params) {
  const { locale, area } = await params;
  const found = findArea(area);
  if (!isLocale(locale) || !found) notFound();
  setRequestLocale(locale);
  const { t, lang, englishOnly } = await getLegalTranslations(locale, 'Areas');
  const tContact = await getTranslations('Contact');
  return (
    <div className="py-6">
      {englishOnly && <LegalBanner />}
      <article lang={lang} className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl">{t(`${found.key}.title`)}</h1>
        <p className="mt-4 text-lg">{t(`${found.key}.summary`)}</p>
        <p className="mt-4">{t('comingSoon')}</p>
      </article>
      <div className="mt-6">
        <CallButton label={tContact('primary')} />
        <TrustNote />
      </div>
    </div>
  );
}
