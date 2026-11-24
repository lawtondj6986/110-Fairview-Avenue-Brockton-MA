/**
 * Integrity checks on the data that carries the site's claims.
 * These run without a build and should pass before every commit.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { sources } from '../src/data/sources.ts';
import { claims } from '../src/data/claims.ts';
import { ped, hms } from '../src/data/timelines.ts';
import { comparison } from '../src/data/comparison.ts';
import { grades, states } from '../src/data/grades.ts';
import { updates } from '../src/data/updates.ts';
import { faq } from '../src/data/faq.ts';

const ids = Object.keys(sources);
const GRADES = Object.keys(grades);
const STATES = Object.keys(states);
const ISO = /^\d{4}(-\d{2}(-\d{2})?)?$/;

/** Hosts that mirror or summarise documents unofficially. They are leads, never sources. */
const UNOFFICIAL = ['epsteinexposed.com', 'epstein-data.com', 'goyfiles', 'wikipedia.org', 'epsteinwiki', 'reddit.com', 'substack.com'];

test('there is at least one source and ids are well-formed', () => {
  assert.ok(ids.length > 0);
  for (const id of ids) assert.match(id, /^[a-z0-9]+(-[a-z0-9]+)*$/, `bad source id: ${id}`);
});

test('every source has a title, a publisher, a valid grade and a topic', () => {
  for (const [id, s] of Object.entries(sources)) {
    assert.ok(s.title.trim().length > 5, `${id}: title`);
    assert.ok(s.publisher.trim().length > 1, `${id}: publisher`);
    assert.ok(GRADES.includes(s.grade), `${id}: grade ${s.grade}`);
    assert.ok(s.topic, `${id}: topic`);
  }
});

test('source dates and check dates are ISO and not in the future', () => {
  const today = new Date().toISOString().slice(0, 10);
  for (const [id, s] of Object.entries(sources)) {
    if (s.date) assert.match(s.date, ISO, `${id}: date ${s.date}`);
    if (s.checked) {
      assert.match(s.checked, /^\d{4}-\d{2}-\d{2}$/, `${id}: checked ${s.checked}`);
      assert.ok(s.checked <= today, `${id}: checked date is in the future`);
      if (s.date && s.date.length === 10) assert.ok(s.checked >= s.date, `${id}: checked before publication`);
    }
  }
});

test('source URLs are https, parse cleanly and are unique', () => {
  const seen = new Map<string, string>();
  for (const [id, s] of Object.entries(sources)) {
    if (!s.url) continue;
    const u = new URL(s.url);
    assert.equal(u.protocol, 'https:', `${id}: not https`);
    assert.ok(!seen.has(s.url), `${id}: same URL as ${seen.get(s.url)}`);
    seen.set(s.url, id);
  }
});

test('no source points at an unofficial mirror, wiki or forum', () => {
  for (const [id, s] of Object.entries(sources)) {
    if (!s.url) continue;
    const host = new URL(s.url).hostname;
    for (const bad of UNOFFICIAL) assert.ok(!host.includes(bad), `${id}: ${host} is not an acceptable source`);
  }
});

test('B2 sources and sources of allegations carry an explanatory note', () => {
  for (const [id, s] of Object.entries(sources)) {
    if (s.grade === 'B2') assert.ok(s.note, `${id}: B2 source needs a note`);
  }
  for (const id of ['usvi-complaint', 'raskin-2026']) assert.match(sources[id].note ?? '', /not findings/, `${id}: must say its assertions are not findings`);
});

test('timeline events are well-formed and cite known sources', () => {
  for (const [name, events] of Object.entries({ ped, hms })) {
    assert.ok(events.length > 0, name);
    for (const e of events) {
      assert.match(e.iso, ISO, `${name}: "${e.title}" iso`);
      assert.ok(['funding', 'access', 'response', 'record'].includes(e.kind), `${name}: "${e.title}" kind`);
      if (e.state) assert.ok(STATES.includes(e.state), `${name}: "${e.title}" state`);
      assert.ok(e.cites.length > 0, `${name}: "${e.title}" has no citation`);
      for (const c of e.cites) assert.ok(ids.includes(c.id), `${name}: "${e.title}" cites unknown ${c.id}`);
      assert.ok(e.body.length > 30, `${name}: "${e.title}" body`);
    }
  }
});

test('timelines are in chronological order', () => {
  for (const [name, events] of Object.entries({ ped, hms })) {
    // Ranges such as "2010 to 2015" are placed by when they began to matter, so compare years only.
    if (name === 'hms') continue;
    const years = events.map((e) => Number(e.iso.slice(0, 4)));
    for (let i = 1; i < years.length; i++) assert.ok(years[i] >= years[i - 1], `${name}: "${events[i].title}" is out of order`);
  }
});

test('comparison table is rectangular and every sourced cell cites known sources', () => {
  for (const row of comparison.rows) {
    assert.equal(row.cells.length, comparison.columns.length, `row "${row.element}"`);
    for (const cell of row.cells) {
      for (const id of cell.cites) assert.ok(ids.includes(id), `row "${row.element}" cites unknown ${id}`);
      if (cell.grade) assert.ok(GRADES.includes(cell.grade));
      if (cell.cites.length === 0) assert.match(cell.text, /None on record/, `row "${row.element}": an uncited cell must be a statement of absence`);
    }
  }
});

test('claim ids are unique and follow the letter-number pattern', () => {
  const seen = new Set<string>();
  for (const c of claims) {
    assert.match(c.id, /^[A-Z]-\d{2}$/, c.id);
    assert.ok(!seen.has(c.id), `duplicate claim id ${c.id}`);
    seen.add(c.id);
  }
});

test('every claim has a valid state and grade and cites known sources', () => {
  for (const c of claims) {
    assert.ok(STATES.includes(c.state), `${c.id}: state`);
    assert.ok(GRADES.includes(c.grade), `${c.id}: grade`);
    assert.ok(c.sources.length > 0, `${c.id}: no sources`);
    for (const id of c.sources) assert.ok(ids.includes(id), `${c.id}: unknown source ${id}`);
    assert.match(c.claim, /\.[”"]?$/, `${c.id}: claim should be a full sentence`);
    assert.ok(c.page.startsWith('/') && c.page.endsWith('/'), `${c.id}: page path`);
  }
});

test('a claim is never graded higher than its best source', () => {
  const rank = (g: string) => GRADES.indexOf(g);
  for (const c of claims) {
    const best = Math.min(...c.sources.map((id) => rank(sources[id].grade)));
    assert.ok(rank(c.grade) >= best, `${c.id}: graded ${c.grade} but best source is ${GRADES[best]}`);
  }
});

test('statements of absence and B2 claims always carry a caveat', () => {
  for (const c of claims) {
    if (c.state === 'none' || c.grade === 'B2') assert.ok(c.caveat, `${c.id}: needs a caveat`);
  }
});

test('claims resting only on allegations are never marked as verified', () => {
  const allegationOnly = new Set(['usvi-complaint', 'raskin-2026']);
  for (const c of claims) {
    if (c.sources.every((id) => allegationOnly.has(id))) assert.notEqual(c.state, 'verified', `${c.id}: an allegation cannot be "verified"`);
  }
});

test('every claim page exists as a page file', () => {
  const pages = new Set(readdirSync(new URL('../src/pages/', import.meta.url)).map((f) => `/${f.replace('.astro', '')}/`));
  for (const c of claims) assert.ok(pages.has(c.page), `${c.id}: no page file for ${c.page}`);
});

test('every source cited in a page file exists in the register', () => {
  const dir = new URL('../src/pages/', import.meta.url);
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.astro'))) {
    const text = readFileSync(new URL(f, dir), 'utf8');
    for (const m of text.matchAll(/<Cite\s+id="([^"]+)"/g)) assert.ok(ids.includes(m[1]), `${f} cites unknown source ${m[1]}`);
  }
});

test('every source in the register is used somewhere', () => {
  const dir = new URL('../src/pages/', import.meta.url);
  const used = new Set<string>();
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.astro'))) {
    for (const m of readFileSync(new URL(f, dir), 'utf8').matchAll(/<Cite\s+id="([^"]+)"/g)) used.add(m[1]);
  }
  [...ped, ...hms].forEach((e) => e.cites.forEach((c) => used.add(c.id)));
  comparison.rows.forEach((r) => r.cells.forEach((c) => c.cites.forEach((id) => used.add(id))));
  claims.forEach((c) => c.sources.forEach((id) => used.add(id)));
  const unused = ids.filter((id) => !used.has(id));
  assert.deepEqual(unused, [], `unused sources: ${unused.join(', ')}`);
});

test('update log is newest first with valid dates and kinds', () => {
  assert.ok(updates.length > 0);
  for (const u of updates) {
    assert.match(u.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(['Edition', 'Update', 'Correction'].includes(u.kind));
    assert.ok(u.text.length > 10);
  }
  for (let i = 1; i < updates.length; i++) assert.ok(updates[i - 1].date >= updates[i].date, 'update log out of order');
});

test('FAQ answers are non-empty, wrapped in paragraphs and link only inside the site', () => {
  const qs = new Set<string>();
  for (const s of faq) {
    assert.ok(s.items.length > 0, s.section);
    for (const i of s.items) {
      assert.ok(i.q.endsWith('?') || i.q.endsWith('.'), `question punctuation: ${i.q}`);
      assert.ok(!qs.has(i.q), `duplicate question: ${i.q}`);
      qs.add(i.q);
      assert.match(i.a, /^<p>[\s\S]+<\/p>$/, `answer markup: ${i.q}`);
      for (const m of i.a.matchAll(/href="([^"]+)"/g)) assert.ok(m[1].startsWith('/'), `external link in FAQ: ${m[1]}`);
    }
  }
});

// ---------------------------------------------------------------- Named index
import { named, roleLabels } from '../src/data/named.ts';

test('named index: every entry points at real ledger claims and real pages', () => {
  const claimIds = new Set(claims.map((c) => c.id));
  const seen = new Set<string>();
  for (const n of named) {
    assert.ok(!seen.has(n.name), `duplicate entry ${n.name}`);
    seen.add(n.name);
    assert.ok(n.role in roleLabels, `${n.name}: role`);
    assert.ok(n.claims.length > 0, `${n.name}: must rest on at least one ledger claim`);
    for (const c of n.claims) assert.ok(claimIds.has(c), `${n.name}: unknown claim ${c}`);
    for (const p of n.pages) assert.ok(p.startsWith('/') && p.endsWith('/'), `${n.name}: page ${p}`);
    for (const k of ['why', 'recordSays', 'recordDoesNotSay'] as const) assert.ok(n[k].length > 20, `${n.name}: ${k} is too thin`);
  }
});

test('named index: people named only as recipients or sources carry an explicit no-wrongdoing statement', () => {
  for (const n of named.filter((n) => n.role === 'recipient')) {
    assert.match(n.recordDoesNotSay, /implies nothing about the recipient|Nothing describes any use/, `${n.name}: needs the recipient safeguard wording`);
  }
  for (const n of named.filter((n) => n.role === 'source')) {
    assert.match(n.recordDoesNotSay, /only as a source/, `${n.name}: needs the source safeguard wording`);
  }
});

test('named index: a recorded denial in the ledger is carried into the entry as a response', () => {
  for (const n of named) {
    const denies = claims.filter((c) => n.claims.includes(c.id)).some((c) => /denied/.test(c.claim));
    if (denies) assert.ok(n.response, `${n.name}: ledger records a denial but the entry has no response`);
  }
});

// ---------------------------------------------------------------- Funding chart
import { funding } from '../src/data/funding.ts';

test('funding chart rows point at real claims and sources, and agree with the ledger', () => {
  const byId = new Map(claims.map((c) => [c.id, c]));
  for (const r of funding) {
    const c = byId.get(r.claim);
    assert.ok(c, `${r.route}: unknown claim ${r.claim}`);
    for (const id of r.cites) assert.ok(ids.includes(id), `${r.route}: unknown source ${id}`);
    assert.ok(r.cites.some((id) => c!.sources.includes(id)), `${r.route}: shares no source with ledger ${r.claim}`);
    assert.ok(r.amount >= 0, `${r.route}: negative amount`);
  }
  // Each non-zero figure must appear in words in the claim it restates.
  const words: Record<string, string> = { 'F-01': '$9.1 million', 'D-01': '$7.5 million', 'D-02': '$2 million', 'M-02': '$525,000' };
  for (const r of funding) if (words[r.claim]) assert.ok(byId.get(r.claim)!.claim.includes(words[r.claim]), `${r.claim}: ledger wording no longer matches the chart`);
});
