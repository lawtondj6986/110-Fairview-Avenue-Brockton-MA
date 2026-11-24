import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sentences, flags } from '../scripts/lib/factcheck-rules.mjs';

const ids = (s) => flags(s).map((r) => r.id);

test('splits Markdown into sentences and drops code, headings and link targets', () => {
  const md = '## Heading\n\nFirst sentence is long enough to keep. See [the guide](/guides/x/) for more detail here.\n\n```\nCode $500 block\n```\n- A list item that is long enough.';
  const out = sentences(md);
  assert.deepEqual(out, [
    'First sentence is long enough to keep.',
    'See the guide for more detail here.',
    'A list item that is long enough.',
  ]);
});

test('flags legal citations', () => {
  assert.ok(ids('The rule is at 34 C.F.R. Part 106 and applies widely.').includes('citation'));
  assert.ok(ids('It is codified at 42 U.S.C. § 2000ff.').includes('citation'));
});

test('flags money, percentages, deadlines and thresholds', () => {
  assert.ok(ids('Gifts over $250 need a written acknowledgment.').includes('money'));
  assert.ok(ids('Foundations pay out roughly five percent, or 5 percent, each year.').includes('percent'));
  assert.ok(ids('A complaint must be filed within 180 days of the event.').includes('deadline'));
  assert.ok(ids('It covers employers with 15 or more employees.').includes('threshold'));
});

test('flags years, recent changes and absolute statements', () => {
  assert.ok(ids('The rule was issued in 2020 and revised later.').includes('year'));
  assert.ok(ids('The 2024 rule was vacated by a court.').includes('recent'));
  assert.ok(ids('The power has never been used by an agency.').includes('absolute'));
});

test('leaves plain explanation unflagged', () => {
  assert.deepEqual(ids('A gift agreement records what the donor and the university agreed.'), []);
});
