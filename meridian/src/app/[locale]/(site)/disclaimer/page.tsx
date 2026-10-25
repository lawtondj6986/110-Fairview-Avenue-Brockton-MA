import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AttorneyLine } from '@/components/AttorneyLine';
import { Disclaimer } from '@/components/Disclaimer';
import { initLocale, type LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'DisclaimerPage' });
  return pageMetadata({ locale, path: '/disclaimer', title: t('title') });
}

export default async function DisclaimerPage({ params }: LocaleParams) {
  await initLocale(params);
  const t = await getTranslations('DisclaimerPage');
  return (
    <div className="max-w-3xl py-6">
      <h1 className="text-3xl md:text-4xl">{t('title')}</h1>
      <div className="mt-6">
        <Disclaimer />
      </div>
      <AttorneyLine className="mt-6" />
    </div>
  );
}
