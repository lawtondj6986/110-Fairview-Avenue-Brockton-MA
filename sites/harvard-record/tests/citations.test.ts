import { test } from 'node:test';
import assert from 'node:assert/strict';
import { processCitations, formatDate, slugify, escapeHtml } from '../src/lib/citations.ts';

const sources = {
  alpha: { title: 'Alpha report', grade: 'A1' },
  beta: { title: 'Beta "quoted" article', grade: 'A2' },
  gamma: { title: 'Gamma book', grade: 'B1' },
};
const mark = (id: string, loc?: string) => `<sup data-cite="${id}"${loc ? ` data-loc="${loc}"` : ''}></sup>`;

test('numbers sources in order of first appearance', () => {
  const r = processCitations(`<p>One${mark('beta')} two${mark('alpha')} three${mark('beta')}</p>`, sources);
  assert.deepEqual(r.order, ['beta', 'alpha']);
  assert.deepEqual(r.uses, { beta: 2, alpha: 1 });
  assert.match(r.html, /href="#ref-1" id="cite-1-1"/);
  assert.match(r.html, /href="#ref-2" id="cite-2-1"/);
  assert.match(r.html, /href="#ref-1" id="cite-1-2"/);
});

test('leaves no unprocessed markers behind', () => {
  const r = processCitations(`<p>${mark('alpha')}${mark('gamma', 'p. 4')}</p>`, sources);
  assert.doesNotMatch(r.html, /data-cite=/);
  assert.equal((r.html.match(/<sup class="cite">/g) ?? []).length, 2);
});

test('every citation anchor id is unique', () => {
  const r = processCitations(Array.from({ length: 12 }, () => mark('alpha')).join(' '), sources);
  const ids = [...r.html.matchAll(/id="(cite-[^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, 12);
});

test('carries a locator into the accessible label', () => {
  const r = processCitations(mark('alpha', 'p. 12'), sources);
  assert.match(r.html, /aria-label="Source 1: Alpha report, p\. 12\. Grade A1\."/);
  assert.match(r.html, /visually-hidden">, p\. 12</);
});

test('escapes quotes in source titles used in attributes', () => {
  const r = processCitations(mark('beta'), sources);
  assert.match(r.html, /Beta &quot;quoted&quot; article/);
  assert.doesNotMatch(r.html, /title="[^"]*"quoted"/);
});

test('an unknown source id fails loudly and names the page', () => {
  assert.throws(() => processCitations(mark('nope'), sources, '/some-page/'), /Unknown source id "nope" cited on \/some-page\//);
});

test('supports the Markdown token syntax', () => {
  const r = processCitations('<p>Text [@alpha] and more [@beta, p. 3].</p>', sources);
  assert.deepEqual(r.order, ['alpha', 'beta']);
  assert.match(r.html, /Beta &quot;quoted&quot; article, p\. 3/);
  assert.doesNotMatch(r.html, /\[@/);
});

test('mixed marker and token syntax share one numbering in reading order', () => {
  const r = processCitations(`<p>[@gamma] ${mark('alpha')} [@gamma]</p>`, sources);
  assert.deepEqual(r.order, ['gamma', 'alpha']);
  assert.equal(r.uses.gamma, 2);
});

test('an unknown token id also fails', () => {
  assert.throws(() => processCitations('<p>[@missing-source]</p>', sources), /Unknown source id "missing-source"/);
});

test('does not treat ordinary bracketed text or email addresses as citations', () => {
  const html = '<p>See [note] and write to a@b.example or [1].</p>';
  const r = processCitations(html, sources);
  assert.equal(r.html, html);
  assert.deepEqual(r.order, []);
});

test('collects h2 headings with ids and strips markup and citations from their text', () => {
  const r = processCitations(`<h2 id="a">First <em>part</em>${mark('alpha')}</h2><p>x</p><h2 id="b">Second</h2><h3 id="c">Not this</h3>`, sources);
  assert.deepEqual(r.headings, [{ id: 'a', text: 'First part' }, { id: 'b', text: 'Second' }]);
});

test('a page with no citations is returned unchanged', () => {
  const html = '<h2 id="x">Heading</h2><p>Nothing cited here.</p>';
  const r = processCitations(html, sources);
  assert.equal(r.html, html);
  assert.deepEqual(r.order, []);
  assert.deepEqual(r.uses, {});
});

test('formatDate handles year, month and day precision', () => {
  assert.equal(formatDate('2020'), '2020');
  assert.equal(formatDate('2021-03'), 'March 2021');
  assert.equal(formatDate('2020-05-01'), '1 May 2020');
  assert.equal(formatDate('2026-11-20'), '20 November 2026');
  assert.equal(formatDate(undefined), '');
  assert.equal(formatDate(''), '');
});

test('slugify produces stable anchors', () => {
  assert.equal(slugify('What it does'), 'what-it-does');
  assert.equal(slugify('  Who it covers?  '), 'who-it-covers');
  assert.equal(slugify('Domínguez & others'), 'dominguez-others');
  assert.equal(slugify('A1 to B2: the grades'), 'a1-to-b2-the-grades');
});

test('escapeHtml escapes the four characters that matter in attributes', () => {
  assert.equal(escapeHtml(`<a href="x">&</a>`), '&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;');
});
