import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { setSourceChecked, setSourceUrl, setClaimChecked, findSourceBlock, findClaimBlock, decide } from '../scripts/lib/apply-checked.mjs';
import { usesInPage, statementKey, stripMarkup } from '../scripts/lib/site-uses.mjs';

const SOURCES = `export const sources = {
  // comment kept
  'alpha': {
    title: 'Alpha',
    url: 'https://example.org/a',
    grade: 'A1',
    topic: 'Harvard',
  },
  'beta-2020': {
    title: 'Beta',
    grade: 'A2',
    topic: 'MIT',
    checked: '2026-01-01',
  },
};
`;

const CLAIMS = `export const claims = [
  {
    id: 'F-01', page: PED, topic: 'Funding',
    claim: 'First claim.',
    state: 'verified', grade: 'A1', sources: ['alpha'],
  },
  {
    id: 'F-02', page: PED, topic: 'Funding',
    claim: 'Second claim.',
    state: 'activity', grade: 'A2', sources: ['alpha', 'beta-2020'],
    caveat: 'A caveat.',
  },
];
`;

test('setSourceChecked adds a checked date and leaves everything else alone', () => {
  const out = setSourceChecked(SOURCES, 'alpha', '2026-11-25');
  assert.match(out, /topic: 'Harvard',\n    checked: '2026-11-25',\n  \},/);
  assert.equal(out.replace("    checked: '2026-11-25',\n", ''), SOURCES);
});

test('setSourceChecked replaces an existing date instead of adding a second', () => {
  const out = setSourceChecked(SOURCES, 'beta-2020', '2026-11-25');
  assert.equal((out.match(/checked:/g) ?? []).length, 1);
  assert.match(out, /checked: '2026-11-25'/);
});

test('setSourceChecked rejects unknown ids and bad dates', () => {
  assert.throws(() => setSourceChecked(SOURCES, 'gamma', '2026-11-25'), /not found/);
  assert.throws(() => setSourceChecked(SOURCES, 'alpha', '25/11/2026'), /Bad date/);
});

test('setSourceUrl replaces or inserts the url and insists on https', () => {
  assert.match(setSourceUrl(SOURCES, 'alpha', 'https://example.org/new'), /url: 'https:\/\/example\.org\/new',/);
  assert.match(setSourceUrl(SOURCES, 'beta-2020', 'https://example.org/b'), /url: 'https:\/\/example\.org\/b',\n    grade: 'A2'/);
  assert.throws(() => setSourceUrl(SOURCES, 'alpha', 'http://example.org/x'), /https/);
});

test('findSourceBlock does not confuse an id that is a prefix of another', () => {
  const text = SOURCES.replace("'alpha': {", "'alpha': {").replace("'beta-2020': {", "'alpha-2': {");
  const [a, b] = findSourceBlock(text, 'alpha');
  assert.match(text.slice(a, b), /title: 'Alpha'/);
  assert.doesNotMatch(text.slice(a, b), /title: 'Beta'/);
});

test('setClaimChecked adds a date to the right claim only', () => {
  const out = setClaimChecked(CLAIMS, 'F-02', '2026-11-25');
  const [a, b] = findClaimBlock(out, 'F-02');
  assert.match(out.slice(a, b), /caveat: 'A caveat\.',\n    checked: '2026-11-25',\n  \},$/);
  const [c, d] = findClaimBlock(out, 'F-01');
  assert.doesNotMatch(out.slice(c, d), /checked/);
});

test('setClaimChecked rejects unknown ids', () => {
  assert.throws(() => setClaimChecked(CLAIMS, 'Z-99', '2026-11-25'), /not found/);
});

test('the edit helpers work on the real data files without changing anything else', () => {
  const src = readFileSync(new URL('../src/data/sources.ts', import.meta.url), 'utf8');
  const out = setSourceChecked(src, 'harvard-2020-report', '2026-11-25');
  assert.equal(out.length, src.length + "    checked: '2026-11-25',\n".length);
  const cl = readFileSync(new URL('../src/data/claims.ts', import.meta.url), 'utf8');
  const out2 = setClaimChecked(cl, 'G-03', '2026-11-25');
  assert.equal(out2.length, cl.length + "    checked: '2026-11-25',\n".length);
});

// ---------------------------------------------------------------- decide()
const sources = { alpha: { grade: 'A1' }, beta: { grade: 'A2' }, gamma: { grade: 'A2', checked: '2026-01-01' } };
const claims = [
  { id: 'F-01', sources: ['alpha'] },
  { id: 'F-02', sources: ['alpha', 'beta'] },
  { id: 'F-03', sources: ['alpha', 'gamma'] },
];
const expected = { alpha: ['F-01', 'F-02', 'F-03', 's1'], beta: ['F-02'] };
const ok = { status: 'ok' };

test('a source is checked only when every expected item is confirmed and the link was opened', () => {
  const full = { sources: { alpha: { linkOk: true, items: { 'F-01': ok, 'F-02': ok, 'F-03': ok, s1: ok } } } };
  assert.deepEqual(decide(full, { sources, claims, expected }).checkedSources, ['alpha']);
  const missing = { sources: { alpha: { linkOk: true, items: { 'F-01': ok, 'F-02': ok, 'F-03': ok } } } };
  assert.deepEqual(decide(missing, { sources, claims, expected }).checkedSources, []);
  const noLink = { sources: { alpha: { items: { 'F-01': ok, 'F-02': ok, 'F-03': ok, s1: ok } } } };
  const d = decide(noLink, { sources, claims, expected });
  assert.deepEqual(d.checkedSources, []);
  assert.match(d.problems[0].note, /link was not marked/);
});

test('a statement marked as needing a change blocks the source and is reported with its note', () => {
  const r = { sources: { alpha: { linkOk: true, items: { 'F-01': ok, 'F-02': ok, 'F-03': ok, s1: { status: 'change', note: 'Report says 2004.' } } } } };
  const d = decide(r, { sources, claims, expected });
  assert.deepEqual(d.checkedSources, []);
  assert.deepEqual(d.problems, [{ source: 'alpha', item: 's1', note: 'Report says 2004.' }]);
});

test('a claim is checked only when all of its sources are', () => {
  const r = { sources: { alpha: { linkOk: true, items: { 'F-01': ok, 'F-02': ok, 'F-03': ok, s1: ok } } } };
  const d = decide(r, { sources, claims, expected });
  // F-01 rests on alpha alone; F-03 on alpha plus the already-checked gamma; F-02 still waits for beta.
  assert.deepEqual(d.checkedClaims, ['F-01', 'F-03']);
  const both = { sources: { ...r.sources, beta: { linkOk: true, items: { 'F-02': ok } } } };
  assert.deepEqual(decide(both, { sources, claims, expected }).checkedClaims, ['F-01', 'F-02', 'F-03']);
});

test('answers saved against statements that have since changed are flagged, not applied silently', () => {
  const r = { sources: { beta: { linkOk: true, items: { 'F-02': ok, sOLD: ok } } } };
  const d = decide(r, { sources, claims, expected });
  assert.deepEqual(d.checkedSources, ['beta']);
  assert.match(d.problems[0].note, /have since changed/);
});

test('unknown source ids in a results file are ignored and reported', () => {
  const d = decide({ sources: { nope: { linkOk: true, items: {} } } }, { sources, claims, expected });
  assert.deepEqual(d.checkedSources, []);
  assert.match(d.problems[0].note, /Unknown source id/);
});

// ---------------------------------------------------------------- statement collection
test('usesInPage captures the block around each citation, once per source', () => {
  const body = '<p>First fact.<Cite id="a" /> Second fact.<Cite id="a" /><Cite id="b" /></p><li>Item <strong>text</strong>.<Cite id="b" loc="p. 2" /></li><p>No citation here.</p>';
  const out = usesInPage(body, '/x/');
  assert.deepEqual(out, [
    { id: 'a', where: '/x/', text: 'First fact. Second fact.' },
    { id: 'b', where: '/x/', text: 'First fact. Second fact.' },
    { id: 'b', where: '/x/', text: 'Item text .' },
  ]);
});

test('stripMarkup removes components, tags, expressions and entities', () => {
  assert.equal(stripMarkup('A <State s="intent" /> b <Grade g="A1" /> {x} &amp; <em>c</em>'), 'A b c');
});

test('statementKey is stable for the same text and differs for different text', () => {
  assert.equal(statementKey('Same text.'), statementKey('Same text.'));
  assert.notEqual(statementKey('Same text.'), statementKey('Same text!'));
  assert.match(statementKey('x'), /^s[0-9a-z]+$/);
});
