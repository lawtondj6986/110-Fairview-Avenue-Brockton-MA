import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { locales } from '@/i18n/locales';
import { AREAS } from '@/lib/areas';

const PATHS = ['', '/emergency', '/help', ...AREAS.map((a) => `/help/${a.slug}`), '/about', '/contact', '/privacy', '/disclaimer', '/accessibility'];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])) },
      priority: path === '/emergency' ? 1 : path === '' ? 0.9 : 0.6,
    })),
  );
}
