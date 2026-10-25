import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { site } from '@/config/site';
import { initLocale, type LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Accessibility' });
  return pageMetadata({ locale, path: '/accessibility', title: t('title'), description: t('lead') });
}

export default async function AccessibilityPage({ params }: LocaleParams) {
  await initLocale(params);
  const t = await getTranslations('Accessibility');
  return (
    <div className="prose-plain max-w-3xl py-6">
      <h1 className="text-3xl md:text-4xl">{t('title')}</h1>
      <p className="mt-3 text-lg">{t('lead')}</p>
      <p>{t('goal')}</p>
      <p>{t('features')}</p>
      <p>{t('report')}</p>
      <p>
        {site.phone.display} · {site.email}
      </p>
    </div>
  );
}
