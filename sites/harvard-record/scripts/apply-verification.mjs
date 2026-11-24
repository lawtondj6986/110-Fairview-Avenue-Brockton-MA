#!/usr/bin/env node
/**
 * Applies results exported from the verification console to the data files.
 *
 *   node scripts/apply-verification.mjs results.json            dry run (default): report only
 *   node scripts/apply-verification.mjs results.json --write    record check dates and moved URLs
 *
 * What it does with --write:
 *   - sets `checked` on every source whose items were all confirmed
 *   - sets `checked` on every ledger claim whose sources are now all checked
 *   - updates `url` where a new address was recorded
 *   - writes docs/verification/CHANGES-NEEDED.md listing every statement marked
 *     "needs a change", with the checker's note, for a person to edit by hand
 *   - adds a line to the public update log
 *
 * It never edits prose. A statement that does not match its source is a job
 * for a person: fix the page and the ledger row, regenerate the console, and
 * confirm the new wording.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setSourceChecked, setSourceUrl, setClaimChecked, decide } from './lib/apply-checked.mjs';
import { buildModel, expectedKeys } from './verify-console.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const file = process.argv[2];
const write = process.argv.includes('--write');
if (!file || file.startsWith('--')) {
  console.error('Usage: node scripts/apply-verification.mjs <results.json> [--write]');
  process.exit(2);
}

const results = JSON.parse(readFileSync(file, 'utf8'));
if (results.format !== 'hprp-verification-1') {
  console.error('This file was not exported by the verification console.');
  process.exit(2);
}
const date = (results.exportedAt ?? new Date().toISOString()).slice(0, 10);

const { sources } = await import('../src/data/sources.ts');
const { claims } = await import('../src/data/claims.ts');
const model = buildModel();
const expected = expectedKeys(model);
const { checkedSources, checkedClaims, problems } = decide(results, { sources, claims, expected });

const moved = Object.entries(results.sources ?? {})
  .filter(([id, r]) => id in sources && r.newUrl && r.newUrl !== sources[id].url)
  .map(([id, r]) => ({ id, url: r.newUrl }));

console.log(`Results exported ${date}${results.checkedBy ? ` by ${results.checkedBy}` : ''}`);
console.log(`\nSources now fully checked (${checkedSources.length}):`);
for (const id of checkedSources) console.log(`  ${id}`);
console.log(`\nLedger claims now fully checked (${checkedClaims.length}):`);
console.log(checkedClaims.length ? `  ${checkedClaims.join(', ')}` : '  none yet');
if (moved.length) {
  console.log(`\nMoved documents (${moved.length}):`);
  for (const m of moved) console.log(`  ${m.id} -> ${m.url}`);
}
if (problems.length) {
  console.log(`\nNeeds a person (${problems.length}):`);
  for (const p of problems) console.log(`  ${p.source}${p.item ? ` [${p.item}]` : ''}: ${p.note}`);
}

if (!write) {
  console.log('\nDry run. Nothing was changed. Add --write to record these results.');
  process.exit(0);
}

// ---- Apply
const srcPath = join(root, 'src', 'data', 'sources.ts');
const clPath = join(root, 'src', 'data', 'claims.ts');
let src = readFileSync(srcPath, 'utf8');
let cl = readFileSync(clPath, 'utf8');
for (const m of moved) src = setSourceUrl(src, m.id, m.url);
for (const id of checkedSources) src = setSourceChecked(src, id, date);
for (const id of checkedClaims) cl = setClaimChecked(cl, id, date);
writeFileSync(srcPath, src);
writeFileSync(clPath, cl);

// ---- Statements that need editing by hand
const byKey = Object.fromEntries(model.map((s) => [s.id, Object.fromEntries([...s.claims, ...s.statements].map((i) => [i.key, i]))]));
const changes = problems.filter((p) => p.item);
const md = [
  '# Changes needed after verification',
  '',
  `> Written by \`scripts/apply-verification.mjs\` from results exported ${date}${results.checkedBy ? ` by ${results.checkedBy}` : ''}.`,
  '',
  changes.length
    ? 'Each statement below did not match its source. Edit the page and the ledger row to say what the source says, then regenerate the console and confirm the new wording.'
    : 'No statement was marked as needing a change.',
  '',
  ...changes.flatMap((p) => {
    const it = byKey[p.source]?.[p.item];
    return [
      `## ${p.source} · ${it?.where ?? `Ledger ${p.item}`}`,
      '',
      `> ${it?.text ?? '(statement text has since changed)'}`,
      '',
      `**Checker's note:** ${p.note}`,
      '',
      `Original: ${sources[p.source].url ?? '(no link)'}`,
      '',
    ];
  }),
  ...(problems.filter((p) => !p.item).length ? ['## Other points', '', ...problems.filter((p) => !p.item).map((p) => `- **${p.source}:** ${p.note}`), ''] : []),
].join('\n');
writeFileSync(join(root, 'docs', 'verification', 'CHANGES-NEEDED.md'), md);

// ---- Public update log
if (checkedSources.length) {
  const upPath = join(root, 'src', 'data', 'updates.ts');
  let up = readFileSync(upPath, 'utf8');
  const marker = "text: string }[] = [\n";
  const total = Object.values(sources).filter((s) => s.checked).length + checkedSources.filter((id) => !sources[id].checked).length;
  const entry = `  {\n    date: '${date}',\n    kind: 'Update',\n    text: '${checkedSources.length} source${checkedSources.length === 1 ? '' : 's'} checked against the original document${checkedSources.length === 1 ? '' : 's'} (${total} of ${Object.keys(sources).length} now checked). ${checkedClaims.length} ledger claim${checkedClaims.length === 1 ? '' : 's'} confirmed.',\n  },\n`;
  if (!up.includes(marker)) throw new Error('Could not find the start of the update log.');
  up = up.replace(marker, marker + entry);
  writeFileSync(upPath, up);
}

console.log(`\nRecorded. ${checkedSources.length} sources and ${checkedClaims.length} claims marked checked on ${date}.`);
console.log('Next: npm test && node scripts/worksheets.mjs && node scripts/verify-console.mjs, then review the diff and commit.');
if (changes.length) console.log(`${changes.length} statement(s) need editing by hand: see docs/verification/CHANGES-NEEDED.md`);
