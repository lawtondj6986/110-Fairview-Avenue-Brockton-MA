import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CallButton } from '@/components/CallButton';
import { Tile } from '@/components/Tile';
import { TrustNote } from '@/components/TrustNote';
import { AREAS } from '@/lib/areas';
import { initLocale, type LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return pageMetadata({ locale, path: '/', title: t('homeTitle'), description: t('homeDescription') });
}

export default async function HomePage({ params }: LocaleParams) {
  await initLocale(params);
  const t = await getTranslations('Home');
  return (
    <>
      <section className="py-6 md:py-10">
        <p className="font-semibold text-brass">{t('eyebrow')}</p>
        <h1 className="mt-2 text-4xl md:text-5xl">{t('title')}</h1>
        <p className="mt-4 max-w-2xl text-lg">{t('lead')}</p>
        <div className="mt-6">
          <CallButton label={t('primary')} />
          <TrustNote />
        </div>
      </section>

      <section aria-labelledby="tiles-heading" className="py-6">
        <h2 id="tiles-heading" className="text-2xl md:text-3xl">
          {t('tilesHeading')}
        </h2>
        <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          <li>
            <Tile href="/emergency" icon="alert" label={t('tiles.emergency')} emergency />
          </li>
          {AREAS.map((a) => (
            <li key={a.slug}>
              <Tile href={`/help/${a.slug}`} icon={a.icon} label={t(`tiles.${a.key}`)} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
