import { test } from 'node:test';
import assert from 'node:assert/strict';
import { csvCell, toCsv, xmlEscape, bibEscape, toBibtex, rssDate } from '../src/lib/export.ts';

test('csvCell quotes only when needed and doubles embedded quotes', () => {
  assert.equal(csvCell('plain'), 'plain');
  assert.equal(csvCell('a, b'), '"a, b"');
  assert.equal(csvCell('say "hi"'), '"say ""hi"""');
  assert.equal(csvCell('line\nbreak'), '"line\nbreak"');
  assert.equal(csvCell(undefined), '');
  assert.equal(csvCell(null), '');
  assert.equal(csvCell(42), '42');
});

test('toCsv writes a header, CRLF line endings and a trailing newline', () => {
  const out = toCsv(['a', 'b'], [[1, 'x,y'], [2, undefined]]);
  assert.equal(out, 'a,b\r\n1,"x,y"\r\n2,\r\n');
});

test('toCsv output has the same number of fields on every row', () => {
  const out = toCsv(['a', 'b', 'c'], [['1', '2', '3'], ['x', 'y', 'z']]);
  for (const line of out.trim().split('\r\n')) assert.equal(line.split(',').length, 3);
});

test('xmlEscape escapes all five predefined entities', () => {
  assert.equal(xmlEscape(`<a b="c" d='e'>&</a>`), '&lt;a b=&quot;c&quot; d=&apos;e&apos;&gt;&amp;&lt;/a&gt;');
});

test('bibEscape escapes BibTeX special characters', () => {
  assert.equal(bibEscape('R&D 100% of $5 #1 a_b {x}'), 'R\\&D 100\\% of \\$5 \\#1 a\\_b \\{x\\}');
});

test('toBibtex builds a well-formed entry and omits missing fields', () => {
  const out = toBibtex('alpha', { title: 'A & B', publisher: 'Pub', date: '2020-05-01', url: 'https://example.org/x', grade: 'A1' });
  assert.match(out, /^@misc\{alpha,\n/);
  assert.match(out, /title = \{\{A \\& B\}\}/);
  assert.match(out, /year = \{2020\}/);
  assert.match(out, /url = \{https:\/\/example\.org\/x\}/);
  assert.match(out, /note = \{Reliability grade A1\}/);
  assert.doesNotMatch(out, /author/);
  assert.match(out, /\n\}$/);
});

test('toBibtex joins multiple authors with "and"', () => {
  const out = toBibtex('x', { title: 'T', publisher: 'P', author: 'Ann One, Bob Two and Cy Three', grade: 'A2' });
  assert.match(out, /author = \{Ann One and Bob Two and Cy Three\}/);
});

test('rssDate renders UTC midnight', () => {
  assert.equal(rssDate('2026-11-20'), 'Fri, 20 Nov 2026 00:00:00 GMT');
});
