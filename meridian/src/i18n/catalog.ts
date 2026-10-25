import en from '@messages/en.json';
import es from '@messages/es.json';
import ht from '@messages/ht.json';
import kea from '@messages/kea.json';
import pt from '@messages/pt.json';
import { fallbackChain, sourceLocale } from './locales';

/**
 * Message catalogs. Each file is next-intl messages plus a flat "$review" map
 * ("Namespace.key.path" → true once a qualified human reviewer has approved it).
 * Adding a locale: import its file and add it to `raw` (plus locales.ts).
 */
type Json = { [key: string]: Json | string | boolean };
export type Catalog = Record<string, Json | string>;

const raw: Record<string, Json> = { en, es, ht, kea, pt } as unknown as Record<string, Json>;

/** Namespaces whose meaning carries legal weight. Never shown as unreviewed translation alone. */
export const LEGAL_NAMESPACES = ['Disclaimer', 'Emergency', 'Privacy', 'Terms', 'Areas'] as const;
export type LegalNamespace = (typeof LEGAL_NAMESPACES)[number];

function strip(catalog: Json | undefined): Catalog {
  if (!catalog) return {};
  const { $review: _review, ...rest } = catalog;
  void _review;
  return rest as Catalog;
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** Deep merge: values in `over` win; missing keys come from `base`. */
export function deepMerge(base: Catalog, over: Catalog): Catalog {
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(over)) {
    const b = out[k];
    out[k] = isObject(b) && isObject(v) ? deepMerge(b as Catalog, v as Catalog) : v;
  }
  return out as Catalog;
}

export function ownCatalog(locale: string): Catalog {
  return strip(raw[locale]);
}

/** Messages for a locale with its fallback chain applied (kea → pt → en). */
export function mergedCatalog(locale: string): Catalog {
  return fallbackChain(locale)
    .reverse()
    .reduce<Catalog>((acc, code) => deepMerge(acc, ownCatalog(code)), {});
}

/** Flatten nested messages to "A.b.c" → string. */
export function flatten(obj: Catalog | Json, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (isObject(v)) Object.assign(out, flatten(v as Json, key));
    else if (typeof v === 'string') out[key] = v;
  }
  return out;
}

export function reviewMap(locale: string): Record<string, boolean> {
  const r = raw[locale]?.$review;
  return isObject(r) ? (r as Record<string, boolean>) : {};
}

/** True when every source key of `namespace` exists in `locale`'s own file and is marked reviewed. */
export function isNamespaceReviewed(locale: string, namespace: string): boolean {
  if (locale === sourceLocale) return true;
  const sourceKeys = Object.keys(flatten(ownCatalog(sourceLocale))).filter((k) => k.startsWith(`${namespace}.`));
  const own = flatten(ownCatalog(locale));
  const review = reviewMap(locale);
  return sourceKeys.length > 0 && sourceKeys.every((k) => k in own && review[k] === true);
}

/**
 * Which locale to render a legal namespace in: the first reviewed locale along the
 * fallback chain; otherwise the English source (and the page shows "English only for now").
 */
export function resolveLegalLocale(locale: string, namespace: LegalNamespace): { locale: string; englishOnly: boolean } {
  for (const code of fallbackChain(locale)) {
    if (isNamespaceReviewed(code, namespace)) {
      return { locale: code, englishOnly: code === sourceLocale && locale !== sourceLocale };
    }
  }
  return { locale: sourceLocale, englishOnly: locale !== sourceLocale };
}
