#!/usr/bin/env node
/**
 * Site audit. Prints a report on verification status, coverage and content volume.
 *
 *   node scripts/audit.mjs            human-readable report
 *   node scripts/audit.mjs --json     machine-readable
 *   node scripts/audit.mjs --strict   exit 1 if anything is pending or unused (use before launch)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCollection, wordCount } from './lib/frontmatter.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const args = new Set(process.argv.slice(2));

const { sources } = await import('../src/data/sources.ts');
const { claims } = await import('../src/data/claims.ts');
const { ped, hms } = await import('../src/data/timelines.ts');
const { comparison } = await import('../src/data/comparison.ts');

// ---- Where each source is cited
const cited = {};
const bump = (id, where) => { (cited[id] ??= {}); cited[id][where] = (cited[id][where] ?? 0) + 1; };
const pagesDir = join(root, 'src', 'pages');
const pageStats = [];
for (const f of readdirSync(pagesDir).filter((f) => f.endsWith('.astro'))) {
  const text = readFileSync(join(pagesDir, f), 'utf8');
  const cites = [...text.matchAll(/<Cite\s+id="([^"]+)"/g)].map((m) => m[1]);
  cites.forEach((id) => bump(id, f));
  const prose = text.replace(/^---[\s\S]*?---/, '').replace(/<[^>]+>/g, ' ').replace(/\{[^}]*\}/g, ' ');
  pageStats.push({ page: f, citations: cites.length, distinctSources: new Set(cites).size, words: wordCount(prose) });
}
ped.forEach((e) => e.cites.forEach((c) => bump(c.id, 'timeline:ped')));
hms.forEach((e) => e.cites.forEach((c) => bump(c.id, 'timeline:hms')));
comparison.rows.forEach((r) => r.cells.forEach((c) => c.cites.forEach((id) => bump(id, 'comparison'))));

const ids = Object.keys(sources);
const pendingSources = ids.filter((id) => !sources[id].checked);
const unusedSources = ids.filter((id) => !cited[id] && !claims.some((c) => c.sources.includes(id)));
const pendingClaims = claims.filter((c) => !c.checked);
const byGrade = Object.fromEntries(['A1', 'A2', 'B1', 'B2'].map((g) => [g, ids.filter((id) => sources[id].grade === g).length]));
const byState = Object.fromEntries(['verified', 'activity', 'intent', 'none'].map((s) => [s, claims.filter((c) => c.state === s).length]));

// A claim can only be marked checked once every source behind it is checked.
const inconsistent = claims.filter((c) => c.checked && c.sources.some((id) => !sources[id].checked)).map((c) => c.id);

// Sources ranked by how much rests on them: check these first.
const weight = ids
  .map((id) => ({ id, grade: sources[id].grade, checked: sources[id].checked ?? null,
    citations: Object.values(cited[id] ?? {}).reduce((a, b) => a + b, 0),
    claims: claims.filter((c) => c.sources.includes(id)).length }))
  .sort((a, b) => b.claims * 3 + b.citations - (a.claims * 3 + a.citations));

const collections = Object.fromEntries(['glossary', 'law', 'guides'].map((name) => {
  const entries = loadCollection(root, name);
  return [name, { entries: entries.length, words: entries.reduce((n, e) => n + wordCount(e.body), 0) }];
}));

const countLines = (dir) => {
  let n = 0;
  for (const f of readdirSync(dir)) {
    if (['node_modules', 'dist', '.astro'].includes(f) || f === 'package-lock.json') continue;
    const p = join(dir, f);
    if (statSync(p).isDirectory()) n += countLines(p);
    else if (/\.(astro|ts|mjs|cjs|md|css|json|svg|txt)$/.test(f)) n += readFileSync(p, 'utf8').split('\n').length;
  }
  return n;
};

const report = {
  sources: { total: ids.length, byGrade, pending: pendingSources.length, unused: unusedSources },
  claims: { total: claims.length, byState, pending: pendingClaims.length, inconsistent },
  pages: pageStats.sort((a, b) => b.citations - a.citations),
  collections,
  linesInProject: countLines(root),
  checkFirst: weight.filter((w) => !w.checked).slice(0, 15),
};

if (args.has('--json')) {
  console.log(JSON.stringify(report, null, 2));
} else {
  const pad = (s, n) => String(s).padEnd(n);
  console.log('SITE AUDIT');
  console.log('==========\n');
  console.log(`Sources   ${ids.length} total   A1 ${byGrade.A1}  A2 ${byGrade.A2}  B1 ${byGrade.B1}  B2 ${byGrade.B2}`);
  console.log(`          ${pendingSources.length} pending check, ${ids.length - pendingSources.length} checked`);
  if (unusedSources.length) console.log(`          UNUSED: ${unusedSources.join(', ')}`);
  console.log(`\nClaims    ${claims.length} total   verified ${byState.verified}  activity ${byState.activity}  intent ${byState.intent}  absence ${byState.none}`);
  console.log(`          ${pendingClaims.length} pending check`);
  if (inconsistent.length) console.log(`          INCONSISTENT (claim checked but a source is not): ${inconsistent.join(', ')}`);
  console.log('\nReference content');
  for (const [name, c] of Object.entries(collections)) console.log(`          ${pad(name, 10)} ${pad(c.entries, 5)} entries  ${c.words.toLocaleString()} words`);
  console.log('\nPages by citation count');
  for (const p of report.pages.filter((p) => p.citations)) console.log(`          ${pad(p.page, 44)} ${pad(p.citations, 4)} citations  ${pad(p.distinctSources, 3)} sources`);
  console.log('\nCheck these sources first (most rests on them)');
  for (const w of report.checkFirst) console.log(`          ${pad(w.id, 30)} ${w.grade}  ${pad(w.claims, 3)} claims  ${pad(w.citations, 3)} citations`);
  console.log(`\nLines in project (excluding lockfile and build output): ${report.linesInProject.toLocaleString()}`);
}

if (args.has('--strict') && (pendingSources.length || pendingClaims.length || unusedSources.length || inconsistent.length)) {
  console.error('\nSTRICT: not ready for launch. Pending checks or unused sources remain.');
  process.exit(1);
}
