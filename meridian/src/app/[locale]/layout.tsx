import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Inter, Lora } from 'next/font/google';
import type { ReactNode } from 'react';
import { ServiceWorker } from '@/components/ServiceWorker';
import { flags } from '@/config/flags';
import { site } from '@/config/site';
import { getLocaleConfig, locales } from '@/i18n/locales';
import { initLocale } from '@/lib/page';
import { getMessages } from 'next-intl/server';

// latin-ext covers Kreyòl, Kriolu, Portuguese and Spanish diacritics (ò è ã ç ñ).
const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' });
const lora = Lora({ subsets: ['latin', 'latin-ext'], weight: ['600', '700'], variable: '--font-lora', display: 'swap' });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  manifest: '/manifest.webmanifest',
  icons: { icon: '/icon.svg' },
  formatDetection: { telephone: true },
  ...(flags.noindex ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = {
  themeColor: '#14284B',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await initLocale(params);
  const { dir } = getLocaleConfig(locale);
  const messages = await getMessages();
  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${lora.variable}`}>
      <body>
        {/* Client components receive strings as props; only the error boundary's strings ship to the browser. */}
        <NextIntlClientProvider locale={locale} messages={{ Error: messages.Error }}>
          {children}
        </NextIntlClientProvider>
        <ServiceWorker />
        <Analytics />
      </body>
    </html>
  );
}
