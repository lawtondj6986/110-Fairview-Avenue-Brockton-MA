#!/usr/bin/env node
/**
 * Catalog integrity:
 *  - every locale's keys exist in en (no orphans) and ICU placeholders match en
 *  - every leaf has a "$review" entry, and no $review entry points to a missing key
 *  - every locale resolves every en key WITHOUT reaching en if its chain says so
 *    (kea → pt must be complete; ht/es/pt must be complete themselves)
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const src = readFileSync(join(root, 'src/i18n/locales.ts'), 'utf8');
const configs = [...src.matchAll(/\{ code: '[^}]*\}/g)].map(([block]) => ({
  code: block.match(/code: '([a-z-]+)'/)[1],
  fallback: block.match(/fallback: '([a-z-]+)'/)?.[1],
}));

const load = (code) => JSON.parse(readFileSync(join(root, 'messages', `${code}.json`), 'utf8'));
const flatten = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) =>
    k === '$review' ? [] : typeof v === 'object' && v ? flatten(v, `${prefix}${k}.`) : [[`${prefix}${k}`, v]],
  );
const placeholders = (s) => [...String(s).matchAll(/\{(\w+)/g)].map((m) => m[1]).sort().join(',');

const en = Object.fromEntries(flatten(load('en')));
const catalogs = Object.fromEntries(configs.map((c) => [c.code, load(c.code)]));
const errors = [];

for (const { code, fallback } of configs) {
  if (code === 'en') continue;
  const own = Object.fromEntries(flatten(catalogs[code]));
  const review = catalogs[code].$review ?? {};
  for (const [k, v] of Object.entries(own)) {
    if (!(k in en)) errors.push(`${code}: orphan key ${k}`);
    else if (placeholders(v) !== placeholders(en[k])) errors.push(`${code}: placeholder mismatch in ${k}`);
    if (!(k in review)) errors.push(`${code}: missing $review entry for ${k}`);
    if (typeof v !== 'string' || !v.trim()) errors.push(`${code}: empty value ${k}`);
  }
  for (const k of Object.keys(review)) if (!(k in own)) errors.push(`${code}: $review entry for missing key ${k}`);

  // Resolve along the chain, stopping before English.
  const chain = [code];
  let next = fallback;
  while (next && next !== 'en') {
    chain.push(next);
    next = configs.find((c) => c.code === next)?.fallback;
  }
  const merged = Object.assign({}, ...chain.reverse().map((c) => Object.fromEntries(flatten(catalogs[c]))));
  for (const k of Object.keys(en)) if (!(k in merged)) errors.push(`${code}: ${k} would fall back to English`);
}

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join('\n'));
  console.error(`\ni18n check failed (${errors.length}).`);
  process.exit(1);
}
const unreviewed = configs
  .filter((c) => c.code !== 'en')
  .map((c) => `${c.code}: ${Object.values(catalogs[c.code].$review ?? {}).filter((v) => v !== true).length} unreviewed`);
console.log(`✓ i18n check passed (${unreviewed.join(', ')})`);
