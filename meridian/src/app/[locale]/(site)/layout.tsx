import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ListenButton } from '@/components/ListenButton';
import { MobileActionBar } from '@/components/MobileActionBar';
import { getLocaleConfig } from '@/i18n/locales';
import { initLocale } from '@/lib/page';

export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await initLocale(params);
  const t = await getTranslations('Skip');
  const tListen = await getTranslations('Listen');
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-white px-4 py-3 text-lg text-navy focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        {t('toContent')}
      </a>
      <Header />
      <div className="mx-auto flex max-w-6xl justify-end px-4 pt-4">
        <ListenButton voices={getLocaleConfig(locale).speech} playLabel={tListen('play')} stopLabel={tListen('stop')} />
      </div>
      <main id="main" tabIndex={-1} className="mx-auto max-w-6xl px-4 pt-2 outline-none">
        {children}
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
