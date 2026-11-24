/**
 * Editorial lint for the reference content (glossary, law explainers, guides).
 * These collections are general reference. The rules below keep them that way.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { loadCollection, wordCount, splitFrontmatter, readFields } from '../scripts/lib/frontmatter.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const glossary = loadCollection(root, 'glossary');
const law = loadCollection(root, 'law');
const guides = loadCollection(root, 'guides');
const all = [...glossary, ...law, ...guides];

/**
 * Reference content must not discuss the people or bodies in the site's subject matter.
 * Matching is on whole words so that ordinary words ("church", "black") in lower case pass.
 */
const SUBJECTS = [
  'Epstein', 'Nowak', 'Thakuria', 'Leon Black', 'Summers', 'Chomsky', 'Shuliak', 'Sulayem', 'Lanier', 'Groff',
  'Domínguez', 'Dominguez', 'Comaroff', 'Fryer', 'Joi Ito', 'Seth Lloyd', 'George Church', 'Southern Trust',
  'Media Lab', 'Zorro Ranch', 'Plotz', 'Woody Allen', 'Bacow', 'Claudine Gay', 'Garber', 'Raskin',
];
const INSTITUTIONS = ['Harvard', 'MIT', 'Yale', 'Stanford', 'Princeton', 'Columbia University'];

const CATEGORIES = [
  'Law and compliance', 'Campus safety', 'Fundraising and development', 'University governance',
  'Genetics and biomedical research', 'Research ethics', 'Records and sourcing', 'Legal procedure',
];
const SERIES = ['Evaluating an institution', 'Reading documents', 'Research methods', 'Templates'];
const AUDIENCES = ['Prospective students', 'Students', 'Alumni', 'Researchers', 'Everyone'];
const LAW_SECTIONS = ['What it does', 'Who it covers', 'What it does not do', 'How it is enforced', 'Common misreadings', 'Where to read it'];
const SITE_PATHS = /^\/(methodology|program-for-evolutionary-dynamics|harvard-medical-school|donor-pathways|dna-genetics|campus-safety|comparison|sources|glossary|law|guides|ledger|faq|about|updates|reference|search|named|briefing)\//;

const where = (e) => `${e.collection}/${e.file}`;

test('frontmatter helper parses scalars, inline lists and block lists', () => {
  const { raw, body, ok } = splitFrontmatter('---\nterm: "A: b"\nrelated: ["x", "y"]\nlinks:\n  - label: "L"\n    url: "https://e.org"\n---\nBody text.\n');
  assert.ok(ok);
  const f = readFields(raw);
  assert.equal(f.term, 'A: b');
  assert.deepEqual(f.related, ['x', 'y']);
  assert.equal(body.trim(), 'Body text.');
});

test('every content file has frontmatter and a lowercase hyphenated slug', () => {
  for (const e of all) {
    assert.ok(e.ok, `${where(e)}: missing frontmatter`);
    assert.match(e.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, `${where(e)}: bad slug`);
  }
});

test('no content file names a person or body from the site’s subject matter', () => {
  for (const e of all) {
    for (const name of SUBJECTS) {
      const re = new RegExp(`(^|[^A-Za-zÀ-ÿ])${name.replace(/ /g, '\\s+')}([^A-Za-zÀ-ÿ]|$)`);
      // "Epstein-Barr virus" is ordinary virology vocabulary, not a reference to a person on this site.
      const text = e.text.replace(/Epstein[-\u2013]Barr/g, 'EBV');
      assert.ok(!re.test(text), `${where(e)}: mentions "${name}". Reference content must stay general.`);
    }
  }
});

test('no content file states facts about a named university', () => {
  for (const e of all) {
    for (const name of INSTITUTIONS) {
      const re = new RegExp(`(^|[^A-Za-z])${name}([^A-Za-z]|$)`);
      assert.ok(!re.test(e.body), `${where(e)}: mentions "${name}". Keep reference content institution-neutral.`);
    }
  }
});

test('house style: no em dashes, no top-level heading, no raw HTML scripts', () => {
  for (const e of all) {
    assert.ok(!e.text.includes('—'), `${where(e)}: contains an em dash`);
    assert.ok(!/^# /m.test(e.body.replace(/```[\s\S]*?```/g, '')), `${where(e)}: uses a top-level # heading`);
    assert.ok(!/<script|<iframe|javascript:/i.test(e.text), `${where(e)}: contains script or iframe markup`);
  }
});

test('links are https and internal links point at real sections', () => {
  for (const e of all) {
    for (const m of e.text.matchAll(/\]\((\S+?)\)/g)) {
      const href = m[1];
      if (href.startsWith('/')) assert.match(href, SITE_PATHS, `${where(e)}: internal link ${href} is not a known section`);
      else if (!href.startsWith('#') && !href.startsWith('mailto:')) assert.match(href, /^https:\/\//, `${where(e)}: link ${href} is not https`);
    }
    for (const m of e.raw.matchAll(/url:\s*"?([^"\s]+)"?/g)) assert.match(m[1], /^https:\/\//, `${where(e)}: frontmatter url ${m[1]}`);
  }
});

test('glossary: required fields, valid category, definition length, body length', () => {
  for (const e of glossary) {
    assert.ok(e.data.term, `${where(e)}: term`);
    assert.ok(e.data.short && e.data.short.length <= 240, `${where(e)}: short is missing or over 240 characters`);
    assert.ok(CATEGORIES.includes(e.data.category), `${where(e)}: category "${e.data.category}"`);
    const n = wordCount(e.body);
    assert.ok(n >= 90 && n <= 320, `${where(e)}: body is ${n} words (expected roughly 130 to 220)`);
  }
});

test('glossary: terms are unique', () => {
  const seen = new Map();
  for (const e of glossary) {
    const k = String(e.data.term).toLowerCase();
    assert.ok(!seen.has(k), `${where(e)}: duplicate term, also in ${seen.get(k)}`);
    seen.set(k, e.file);
  }
});

test('law: required fields, valid jurisdiction, the six standard sections in order, length', () => {
  for (const e of law) {
    for (const k of ['title', 'citation', 'short', 'jurisdiction', 'enforcedBy']) assert.ok(e.data[k], `${where(e)}: ${k}`);
    assert.ok(['Federal', 'Massachusetts', 'Other'].includes(e.data.jurisdiction), `${where(e)}: jurisdiction`);
    assert.ok(e.data.short.length <= 280, `${where(e)}: short over 280 characters`);
    const heads = [...e.body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
    // The six standard sections must all be present and in order; an explainer may add others between them.
    assert.deepEqual(heads.filter((h) => LAW_SECTIONS.includes(h)), LAW_SECTIONS, `${where(e)}: sections are ${JSON.stringify(heads)}`);
    const n = wordCount(e.body);
    assert.ok(n >= 400 && n <= 1100, `${where(e)}: body is ${n} words (expected roughly 550 to 850)`);
  }
});

test('guides: required fields, valid series and audience, sections, length', () => {
  for (const e of guides) {
    for (const k of ['title', 'description', 'audience', 'series']) assert.ok(e.data[k], `${where(e)}: ${k}`);
    assert.ok(SERIES.includes(e.data.series), `${where(e)}: series "${e.data.series}"`);
    assert.ok(AUDIENCES.includes(e.data.audience), `${where(e)}: audience "${e.data.audience}"`);
    assert.ok(e.data.description.length <= 280, `${where(e)}: description over 280 characters`);
    assert.ok((e.body.match(/^## /gm) ?? []).length >= 2, `${where(e)}: needs at least two sections`);
    const n = wordCount(e.body);
    const min = e.data.series === 'Templates' ? 150 : 450;
    assert.ok(n >= min && n <= 1300, `${where(e)}: body is ${n} words`);
  }
});

test('guides: templates contain a fenced template block', () => {
  for (const e of guides.filter((g) => g.data.series === 'Templates')) {
    assert.match(e.body, /```[\s\S]+?```/, `${where(e)}: template has no fenced block`);
  }
});

test('guides: titles are unique', () => {
  const seen = new Set();
  for (const e of guides) {
    assert.ok(!seen.has(e.data.title), `${where(e)}: duplicate title`);
    seen.add(e.data.title);
  }
});

test('reference content does not give individual advice', () => {
  for (const e of all) {
    assert.ok(!/\byou should (sue|press charges|not report)\b/i.test(e.body), `${where(e)}: reads as individual legal advice`);
  }
});
