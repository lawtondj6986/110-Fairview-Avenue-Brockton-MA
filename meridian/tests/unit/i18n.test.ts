import { describe, expect, it } from 'vitest';
import { flatten, isNamespaceReviewed, mergedCatalog, ownCatalog, resolveLegalLocale, deepMerge } from '@/i18n/catalog';
import { fallbackChain, getLocaleConfig, locales } from '@/i18n/locales';

describe('locales', () => {
  it('launches in priority order ht, pt, kea, es, en', () => {
    expect(locales).toEqual(['ht', 'pt', 'kea', 'es', 'en']);
  });

  it('kea falls back to pt before the English source', () => {
    expect(fallbackChain('kea')).toEqual(['kea', 'pt', 'en']);
    expect(fallbackChain('ht')).toEqual(['ht', 'en']);
    expect(fallbackChain('en')).toEqual(['en']);
  });

  it('every locale has a native name and no flag emoji', () => {
    for (const l of locales) {
      const name = getLocaleConfig(l).nativeName;
      expect(name.length).toBeGreaterThan(2);
      expect(name).not.toMatch(/\p{Regional_Indicator}/u);
    }
  });
});

describe('catalog', () => {
  it('deep merges with the override winning', () => {
    expect(deepMerge({ A: { x: '1', y: '2' } }, { A: { y: '3' } })).toEqual({ A: { x: '1', y: '3' } });
  });

  it('a key missing from kea is served from pt, never en', () => {
    const pt = flatten(ownCatalog('pt'));
    const en = flatten(ownCatalog('en'));
    const kea = flatten(ownCatalog('kea'));
    const merged = flatten(mergedCatalog('kea'));
    for (const key of Object.keys(en)) {
      expect(merged[key]).toBe(kea[key] ?? pt[key]);
    }
  });

  it('strips the $review map from runtime messages', () => {
    expect(mergedCatalog('ht')).not.toHaveProperty('$review');
  });

  it('English is always reviewed; unreviewed drafts are not', () => {
    expect(isNamespaceReviewed('en', 'Emergency')).toBe(true);
    expect(isNamespaceReviewed('ht', 'Emergency')).toBe(false);
  });

  it('unreviewed legal content resolves to English with the banner flag', () => {
    expect(resolveLegalLocale('ht', 'Emergency')).toEqual({ locale: 'en', englishOnly: true });
    expect(resolveLegalLocale('kea', 'Privacy')).toEqual({ locale: 'en', englishOnly: true });
    expect(resolveLegalLocale('en', 'Privacy')).toEqual({ locale: 'en', englishOnly: false });
  });
});
