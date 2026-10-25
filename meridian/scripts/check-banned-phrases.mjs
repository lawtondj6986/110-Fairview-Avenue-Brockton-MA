#!/usr/bin/env node
/**
 * Fails the build if any content file contains a banned marketing claim
 * (MA RPC 7.1: no false or misleading communications). English list is from the brief;
 * the translated equivalents stop the same claim from slipping in through a locale.
 * Usage: node scripts/check-banned-phrases.mjs [dir ...]
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

// \b is ASCII-only (fails on è, í…), so word edges are "not a letter" in Unicode terms.
const word = (source, flags = 'iu') =>
  new RegExp(source.replaceAll('\\b', '(?:(?<!\\p{L})(?=\\p{L})|(?<=\\p{L})(?!\\p{L}))'), flags);

export const BANNED = [
  // From the brief (English)
  word(String.raw`\bguarantee`),
  /100\s?%/,
  word(String.raw`\bnever lose`),
  word(String.raw`\bexperts?\b`),
  word(String.raw`\bspecialists?\b`),
  word(String.raw`\bcertified\b`),
  word(String.raw`\bbest immigration lawyer`),
  word(String.raw`\billegal aliens?\b`),
  // Same claims in launch locales (es, pt, ht, kea)
  word(String.raw`\bgarant(?:ía|ia|izamos|izado|imos|ido|i)\b`),
  word(String.raw`\bexpert[oa]s?\b`),
  word(String.raw`\bespecialistas?\b`),
  word(String.raw`\bespesyalis\b`),
  word(String.raw`\bspesialista\b`),
  word(String.raw`\beksp[èe]\b`),
  word(String.raw`\bcertificad[oa]s?\b`),
  word(String.raw`\bs[èe]tifye\b`),
  word(String.raw`\bsertifikadu\b`),
  word(String.raw`\bnunca (?:perdemos|pierde|perde)\b`),
  word(String.raw`\b(?:inmigrantes?|imigrantes?|estrangeiros?|extranjeros?) ilega(?:l|is|les)\b`),
];

const SCAN_EXT = new Set(['.json', '.md', '.mdx', '.ts', '.tsx', '.txt', '.html']);
const SKIP_DIRS = new Set(['node_modules', '.next', 'test-results', 'playwright-report']);

function* walk(path) {
  const st = statSync(path, { throwIfNoEntry: false });
  if (!st) return;
  if (st.isFile()) {
    if (SCAN_EXT.has(extname(path))) yield path;
    return;
  }
  for (const entry of readdirSync(path)) {
    if (!SKIP_DIRS.has(entry)) yield* walk(join(path, entry));
  }
}

export function findBanned(text) {
  const hits = [];
  text.split('\n').forEach((line, i) => {
    for (const re of BANNED) {
      const m = line.match(re);
      if (m) hits.push({ line: i + 1, match: m[0] });
    }
  });
  return hits;
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const root = new URL('..', import.meta.url).pathname;
  const targets = process.argv.slice(2).length ? process.argv.slice(2) : ['messages', 'content', 'src'].map((d) => join(root, d));
  let failures = 0;
  for (const target of targets) {
    for (const file of walk(target)) {
      for (const hit of findBanned(readFileSync(file, 'utf8'))) {
        failures++;
        console.error(`✗ ${relative(root, file)}:${hit.line} banned phrase "${hit.match}"`);
      }
    }
  }
  if (failures) {
    console.error(`\nBanned-phrase check failed (${failures}). See CLAUDE.md → Non-negotiables.`);
    process.exit(1);
  }
  console.log('✓ banned-phrase check passed');
}
