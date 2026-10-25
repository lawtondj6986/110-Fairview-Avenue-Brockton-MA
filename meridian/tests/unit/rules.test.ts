import { describe, expect, it } from 'vitest';
// @ts-expect-error — plain ESM script without types
import { findBanned } from '../../scripts/check-banned-phrases.mjs';
import { NAV } from '@/config/nav';
import { flags } from '@/config/flags';
import { isPlaceholder, site } from '@/config/site';
import { formatDate } from '@/lib/format';

describe('banned phrases', () => {
  it.each([
    'We guarantee results',
    '100% success',
    'we never lose',
    'an expert team',
    'immigration specialist',
    'board certified',
    'the best immigration lawyer in town',
    'illegal alien',
    'garantizamos',
    'especialista en inmigración',
    'nou se ekspè',
  ])('flags "%s"', (text) => {
    expect(findBanned(text).length).toBeGreaterThan(0);
  });

  it.each(['Talk to a lawyer about your case', 'undocumented', 'Results depend on the facts of your case'])(
    'allows "%s"',
    (text) => {
      expect(findBanned(text)).toEqual([]);
    },
  );
});

describe('crisis navigation rules', () => {
  it('top nav has at most 6 items and includes the emergency guide', () => {
    expect(NAV.length).toBeLessThanOrEqual(6);
    expect(NAV.map((n) => n.href)).toContain('/emergency');
  });
});

describe('facts', () => {
  it('names the responsible attorney and office exactly', () => {
    expect(site.attorney.name).toBe('Attorney Mark Lawton, Esq.');
    expect(site.attorney.title).toBe('Managing Attorney');
    expect(site.office.street).toBe('157 Belmont Street');
    expect(site.office.postalCode).toBe('02301');
  });

  it('unknown facts stay as TODO_ placeholders, never invented values', () => {
    expect(isPlaceholder(site.phone.display)).toBe(true);
    expect(isPlaceholder(site.email)).toBe(true);
  });

  it('feature flags default to off', () => {
    expect(flags.spp).toBe(false);
    expect(flags.assistant).toBe(false);
  });
});

describe('formatDate', () => {
  const d = new Date('2026-03-07T15:00:00Z');
  it('uses numeric day-first dates for Creole and Portuguese', () => {
    expect(formatDate(d, 'ht')).toBe('07/03/2026');
    expect(formatDate(d, 'pt')).toBe('07/03/2026');
    expect(formatDate(d, 'kea')).toBe('07/03/2026');
  });
  it('uses US order for English', () => {
    expect(formatDate(d, 'en')).toBe('3/7/2026');
  });
});
