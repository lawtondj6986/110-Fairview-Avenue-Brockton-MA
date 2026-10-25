import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CallButton } from '@/components/CallButton';
import { Disclaimer } from '@/components/Disclaimer';
import { Icon } from '@/components/Icon';
import { TrustNote } from '@/components/TrustNote';
import { mapUrl, officeOneLine, site, telHref } from '@/config/site';
import { initLocale, type LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return pageMetadata({ locale, path: '/contact', title: t('title'), description: t('lead') });
}

export default async function ContactPage({ params }: LocaleParams) {
  await initLocale(params);
  const t = await getTranslations('Contact');
  return (
    <div className="max-w-3xl py-6">
      <h1 className="text-3xl md:text-4xl">{t('title')}</h1>
      <p className="mt-3 text-lg">{t('lead')}</p>
      <div className="mt-6">
        <CallButton label={t('primary')} />
        <TrustNote />
      </div>

      <dl className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="font-display text-xl text-navy">{t('addressHeading')}</dt>
          <dd className="mt-1">
            <address className="not-italic">
              {site.name}
              <br />
              {officeOneLine}
            </address>
            {/* Privacy: no embedded map tiles or Google Maps; a plain link the visitor chooses to open. */}
            <a href={mapUrl} rel="noopener noreferrer" target="_blank" className="mt-2 inline-flex min-h-tap items-center gap-2">
              <Icon name="pin" className="size-5" />
              {t('mapLink')} ↗
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-display text-xl text-navy">{t('phoneHeading')}</dt>
          <dd className="mt-1">
            <a href={telHref(site.phone.tel)} className="inline-flex min-h-tap items-center">
              {site.phone.display}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-display text-xl text-navy">{t('emailHeading')}</dt>
          <dd className="mt-1">
            <span>{site.email}</span>
            <p className="mt-1 text-base">{t('emailNote')}</p>
          </dd>
        </div>
        <div>
          <dt className="font-display text-xl text-navy">{t('hoursHeading')}</dt>
          <dd className="mt-1">{site.hours}</dd>
        </div>
      </dl>

      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  );
}
