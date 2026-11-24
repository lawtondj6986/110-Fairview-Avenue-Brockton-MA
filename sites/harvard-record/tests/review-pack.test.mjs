import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extract, prepare, PAGES } from '../scripts/review-pack.mjs';
import { draftLetter } from '../scripts/right-of-reply.mjs';
import { named } from '../src/data/named.ts';
import { claims } from '../src/data/claims.ts';

test('extract pulls the title, lede, article and references out of a built page', () => {
  const html = '<h1 class="x">The <em>title</em></h1><p class="lede">Lede text.</p><article class="prose"><p>Body.</p></article><section class="refs prose" aria-labelledby="references"><ol><li id="ref-1">Ref</li></ol></section>';
  const r = extract(html);
  assert.equal(r.title, 'The title');
  assert.equal(r.lede, 'Lede text.');
  assert.equal(r.article, '<p>Body.</p>');
  assert.match(r.refs, /id="ref-1"/);
});

test('prepare prefixes ids and in-page links so pages can share one file', () => {
  const out = prepare('<h2 id="summary">S</h2><p>Text<sup class="cite"><a href="#ref-1" id="cite-1-1">1</a></sup></p>', 'PED');
  assert.match(out, /<h2 id="PED-summary">/);
  assert.match(out, /href="#PED-ref-1" id="PED-cite-1-1"/);
});

test('prepare numbers paragraphs, list items and table rows in order', () => {
  const out = prepare('<p>One</p><ul><li>Two</li></ul><table><tr><td>Three</td></tr></table>', 'X');
  assert.deepEqual([...out.matchAll(/data-n="([^"]+)"/g)].map((m) => m[1]), ['X ¶1', 'X ¶2', 'X ¶3']);
});

test('prepare removes scripts, forms and buttons and turns site links into text', () => {
  const out = prepare('<p>See <a class="term" href="/glossary/x/" title="t">the term</a>.</p><script>alert(1)</script><form><input></form><button>Go</button>', 'X');
  assert.doesNotMatch(out, /<script|<form|<button|href="\//);
  assert.match(out, /<span class="xref">the term<\/span>/);
});

test('prepare keeps external links so a reviewer can open sources', () => {
  const out = prepare('<p><a href="https://example.org/doc">Source</a></p>', 'X');
  assert.match(out, /href="https:\/\/example\.org\/doc"/);
});

test('the review pack covers every page that the claim ledger points at', () => {
  const inPack = new Set(PAGES.map(([, path]) => path));
  for (const c of claims) assert.ok(inPack.has(c.page), `${c.id}: ${c.page} is not in the review pack`);
  for (const p of ['/named/', '/ledger/', '/briefing/', '/about/']) assert.ok(inPack.has(p), `${p} missing from the review pack`);
  assert.equal(new Set(PAGES.map(([code]) => code)).size, PAGES.length, 'page codes must be unique');
});

test('every right-of-reply draft quotes each of its ledger claims and says it is a draft', () => {
  const byId = new Map(claims.map((c) => [c.id, c]));
  for (const n of named) {
    const letter = draftLetter(n);
    assert.match(letter, /DRAFT generated/, n.name);
    assert.ok(letter.includes(n.recordDoesNotSay), `${n.name}: letter omits what the record does not say`);
    for (const id of n.claims) assert.ok(letter.includes(byId.get(id).claim), `${n.name}: letter omits claim ${id}`);
    if (n.response) assert.ok(letter.includes(n.response), `${n.name}: letter omits the recorded response`);
  }
});

test('right-of-reply drafts warn against sending while statements are unverified', () => {
  const letter = draftLetter(named.find((n) => n.role === 'recipient'));
  assert.match(letter, /NOT YET VERIFIED\. Do not send\./);
  assert.match(letter, /will not describe you as having\s+declined to comment/);
});
