import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CallButton } from '@/components/CallButton';
import { TrustNote } from '@/components/TrustNote';
import { site } from '@/config/site';
import { initLocale, type LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  return pageMetadata({ locale, path: '/about', title: t('title'), description: t('lead') });
}

export default async function AboutPage({ params }: LocaleParams) {
  await initLocale(params);
  const t = await getTranslations('About');
  return (
    <div className="max-w-3xl py-6">
      <h1 className="text-3xl md:text-4xl">{t('title')}</h1>
      <p className="mt-3 text-lg">{t('lead')}</p>

      <h2 className="mt-8 text-2xl">{t('attorneyHeading')}</h2>
      <div className="mt-3 flex items-center gap-4">
        {/* No portrait until the firm supplies one (TODO_ATTORNEY_PHOTO). */}
        <div aria-hidden="true" className="on-navy flex size-20 shrink-0 items-center justify-center rounded-full bg-navy font-display text-2xl text-gold">
          ML
        </div>
        <p>{t('attorneyText', { name: site.attorney.name, title: site.attorney.title })}</p>
      </div>

      <h2 className="mt-8 text-2xl">{t('languagesHeading')}</h2>
      <p className="mt-3">{t('languagesText')}</p>

      <div className="mt-8">
        <CallButton label={t('primary')} />
        <TrustNote />
      </div>
    </div>
  );
}
