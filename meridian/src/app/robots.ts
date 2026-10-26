import type { MetadataRoute } from 'next';
import { flags } from '@/config/flags';
import { site } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  // Proof-of-concept and preview deployments must not be indexed (placeholders are still visible).
  if (flags.noindex) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
