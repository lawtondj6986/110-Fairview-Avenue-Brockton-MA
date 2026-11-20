/**
 * Works out, at build time, which pages cite which source.
 * Page files are read as raw text; data files are mapped to the page that renders them.
 */
import { ped, hms } from '../data/timelines';
import { comparison } from '../data/comparison';

const pageFiles = import.meta.glob('../pages/*.astro', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const titles: Record<string, string> = {
  '/': 'Overview',
  '/program-for-evolutionary-dynamics/': 'Program for Evolutionary Dynamics',
  '/harvard-medical-school/': 'Harvard Medical School, Church and Thakuria',
  '/donor-pathways/': 'Donor influence and introduced funding',
  '/dna-genetics/': 'The DNA and genetics record',
  '/campus-safety/': 'Campus safety and sexual misconduct',
  '/comparison/': 'Cross-institutional comparison',
};

export interface Usage { path: string; title: string; count: number }

export function buildUsage(): Record<string, Usage[]> {
  const out: Record<string, Record<string, number>> = {};
  const add = (id: string, path: string, n = 1) => {
    if (!titles[path]) return;
    out[id] ??= {};
    out[id][path] = (out[id][path] ?? 0) + n;
  };
  for (const [file, text] of Object.entries(pageFiles)) {
    const name = file.split('/').pop()!.replace('.astro', '');
    const path = name === 'index' ? '/' : `/${name}/`;
    for (const m of text.matchAll(/<Cite\s+id="([^"]+)"/g)) add(m[1], path);
  }
  ped.forEach((e) => e.cites.forEach((c) => add(c.id, '/program-for-evolutionary-dynamics/')));
  hms.forEach((e) => e.cites.forEach((c) => add(c.id, '/harvard-medical-school/')));
  comparison.rows.forEach((r) => r.cells.forEach((c) => c.cites.forEach((id) => add(id, '/comparison/'))));

  return Object.fromEntries(
    Object.entries(out).map(([id, pages]) => [
      id,
      Object.entries(pages).map(([path, count]) => ({ path, title: titles[path], count })).sort((a, b) => b.count - a.count),
    ]),
  );
}

export const pageTitles = titles;
