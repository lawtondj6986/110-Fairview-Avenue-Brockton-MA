import { test } from 'node:test';
import assert from 'node:assert/strict';
import { linkTerms, surfaceForms } from '../src/lib/terms.ts';

const T = (id: string, term: string, aliases: string[] = []) => ({ id, term, short: `Definition of ${term}.`, aliases });
const terms = [
  T('capacity-rating', 'Capacity rating'),
  T('exome', 'Exome'),
  T('exome-sequencing', 'Exome sequencing'),
  T('gift', 'Gift'),
  T('ocr', 'Office for Civil Rights (Education)', ['OCR']),
  T('title-ix', 'Title IX'),
  T('cell-line', 'Cell line'),
  T('genotype-vs', 'Genotype versus phenotype'),
  T('gift-grant', 'Gift, grant and sponsored research'),
];

test('surface forms drop parentheticals, definitional phrasings and unlisted single words', () => {
  assert.deepEqual(surfaceForms(terms[0]), ['capacity rating']);
  assert.deepEqual(surfaceForms(terms[4]), ['office for civil rights']); // "OCR" is a single unlisted word
  assert.deepEqual(surfaceForms(terms[3]), []);
  assert.deepEqual(surfaceForms(terms[7]), []);
  assert.deepEqual(surfaceForms(terms[8]), []);
  assert.deepEqual(surfaceForms(terms[1]), ['exome']);
});

test('links the first mention only, keeping the original casing', () => {
  const r = linkTerms('<p>A Capacity rating is not a gift. Another capacity rating.</p>', terms);
  assert.equal((r.html.match(/class="term"/g) ?? []).length, 1);
  assert.match(r.html, /<a class="term" href="\/glossary\/capacity-rating\/" title="Definition of Capacity rating\.">Capacity rating<\/a> is not/);
  assert.deepEqual(r.linked, ['capacity-rating']);
});

test('prefers the longest form', () => {
  const r = linkTerms('<p>Exome sequencing costs money. The exome is small.</p>', terms);
  assert.match(r.html, /href="\/glossary\/exome-sequencing\/"[^>]*>Exome sequencing</);
  assert.match(r.html, /href="\/glossary\/exome\/"[^>]*>exome</);
});

test('matches a plural on the last word', () => {
  const r = linkTerms('<p>Two cell lines were made.</p>', terms);
  assert.match(r.html, /<a class="term" href="\/glossary\/cell-line\/"[^>]*>cell lines<\/a>/);
});

test('does not link inside links, headings, citations, quotations, code or summaries', () => {
  const html = [
    '<a href="/x/">Title IX</a>',
    '<h2 id="t">Title IX</h2>',
    '<sup class="cite"><a href="#ref-1">Title IX</a></sup>',
    '<blockquote><p>Title IX</p></blockquote>',
    '<code>Title IX</code>',
    '<details><summary>Title IX</summary></details>',
    '<ul class="figures"><li>Title IX</li></ul>',
  ].join('');
  const r = linkTerms(html, terms);
  assert.equal(r.html, html);
  assert.deepEqual(r.linked, []);
});

test('links in the first eligible place after skipped regions', () => {
  const r = linkTerms('<h2 id="a">Title IX</h2><p>Under Title IX, schools must respond.</p>', terms);
  assert.match(r.html, /<p>Under <a class="term" href="\/glossary\/title-ix\/"[^>]*>Title IX<\/a>,/);
});

test('never touches attribute values', () => {
  const html = '<p title="Capacity rating"><span data-x="Title IX">plain</span></p>';
  assert.equal(linkTerms(html, terms).html, html);
});

test('respects word boundaries and hyphenation', () => {
  const html = '<p>Subcapacity ratings and pre-Title IX-era rules and title ixes.</p>';
  assert.equal(linkTerms(html, terms).html, html);
});

test('excluded terms are not linked', () => {
  const r = linkTerms('<p>A capacity rating.</p>', terms, { exclude: ['capacity-rating'] });
  assert.doesNotMatch(r.html, /class="term"/);
});

test('void elements and self-closing tags do not unbalance the skip stack', () => {
  const r = linkTerms('<p>Line<br>one<img src="a.png" alt=""> then Title IX applies.</p>', terms);
  assert.match(r.html, />Title IX<\/a> applies/);
});

test('escapes the definition placed in the title attribute', () => {
  const r = linkTerms('<p>Title IX.</p>', [{ id: 't', term: 'Title IX', short: 'Bars "sex" discrimination <in> education & more.' }]);
  assert.match(r.html, /title="Bars &quot;sex&quot; discrimination &lt;in&gt; education &amp; more\."/);
});

test('does not link part of a proper name', () => {
  const t = [T('personal-genomics', 'Personal genomics', ['personal genome']), T('review', 'External review')];
  const html = '<p>The Personal Genome Project and the External Review Committee.</p>';
  assert.equal(linkTerms(html, t).html, html);
  assert.match(linkTerms('<p>Each personal genome is different.</p>', t).html, /class="term"/);
});

test('does not link inside table header cells', () => {
  const html = '<table><tr><th>Title IX</th><td>Title IX</td></tr></table>';
  const r = linkTerms(html, terms);
  assert.match(r.html, /<th>Title IX<\/th><td><a class="term"/);
});
