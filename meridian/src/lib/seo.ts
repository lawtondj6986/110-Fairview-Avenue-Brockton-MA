import type { Metadata } from 'next';
import { site } from '@/config/site';
import { locales } from '@/i18n/locales';

/** Canonical + hreflang alternates for a locale-less path like "/emergency". */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description?: string;
}): Metadata {
  const clean = path === '/' ? '' : path;
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [l, `/${l}${clean}`]));
  languages['x-default'] = clean || '/';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${clean}`, languages },
    openGraph: { title, description, siteName: site.name, locale, type: 'website' },
  };
}
