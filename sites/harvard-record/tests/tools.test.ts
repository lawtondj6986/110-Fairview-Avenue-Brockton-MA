/** Unit tests for the pure logic behind the interactive tools under /tools/. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  answerOf, groupByTopic, gradeRank, weakerGrade, strongestGrade, isGrade, slugPart, tsString, isIsoDate, textSection, optionsFor, YES_NO_UNCLEAR,
} from '../src/lib/tools/common.ts';
import { graderQuestions, gradeSource } from '../src/lib/tools/source-grader.ts';
import { stateQuestions, classifyState } from '../src/lib/tools/evidence-state.ts';
import { giftQuestions, giftTopics, summarizePolicy, policyGaps, policyReport } from '../src/lib/tools/gift-policy.ts';
import { reviewQuestions, reviewProfile, reviewReport } from '../src/lib/tools/review-independence.ts';
import { parseCount, parseEnrollment, ratePer1000, formatRate, computeRates, ratesReport } from '../src/lib/tools/campus-rates.ts';
import {
  publisherToken, topicToken, suggestId, isSourceId, checkCitation, referenceText, sourceEntry, bibtexEntry,
} from '../src/lib/tools/citation.ts';
import { parseSources, checkClaim, claimObject, claimCsvRow, endsWithPeriod, CSV_HEADER } from '../src/lib/tools/claim-row.ts';
import { grades, states } from '../src/data/grades.ts';

// ---------------------------------------------------------------- common
test('common: answerOf ignores values outside the question options', () => {
  const q = { id: 'x', text: 'X?' };
  assert.equal(answerOf({ x: 'yes' }, q), 'yes');
  assert.equal(answerOf({ x: 'maybe' }, q), '');
  assert.equal(answerOf({}, q), '');
  assert.deepEqual(optionsFor(q), YES_NO_UNCLEAR);
});

test('common: groupByTopic keeps first-appearance order', () => {
  const g = groupByTopic([{ topic: 'b', n: 1 }, { topic: 'a', n: 2 }, { topic: 'b', n: 3 }]);
  assert.deepEqual(g.map((x) => x.topic), ['b', 'a']);
  assert.deepEqual(g[0].items.map((x) => x.n), [1, 3]);
});

test('common: grade ordering helpers', () => {
  assert.equal(gradeRank('A1'), 0);
  assert.equal(gradeRank('B2'), 3);
  assert.equal(weakerGrade('A1', 'B1'), 'B1');
  assert.equal(weakerGrade('B2', 'A2'), 'B2');
  assert.equal(strongestGrade(['B1', 'A2', 'B2']), 'A2');
  assert.equal(strongestGrade([]), undefined);
  assert.ok(isGrade('A2'));
  assert.ok(!isGrade('C1'));
  assert.ok(!isGrade(undefined));
});

test('common: slugPart, tsString, isIsoDate, textSection', () => {
  assert.equal(slugPart('  The Boston Globe’s Report! '), 'the-boston-globes-report');
  assert.equal(slugPart('Café Résumé'), 'cafe-resume');
  assert.equal(tsString("it's a \\ path"), "'it\\'s a \\\\ path'");
  assert.equal(tsString('line\nbreak'), "'line\\nbreak'");
  for (const ok of ['2020', '2020-05', '2020-05-01', '2024-02-29']) assert.ok(isIsoDate(ok), ok);
  for (const bad of ['20', '2020-13', '2020-00', '2023-02-29', '2020-04-31', '1 May 2020', '2020-5-1']) assert.ok(!isIsoDate(bad), bad);
  assert.equal(textSection('Ab', ['x']), 'Ab\n--\nx');
});

// ---------------------------------------------------------------- source grader
const grade = (a: Record<string, string>) => gradeSource(a);

test('grader: question ids are unique', () => {
  assert.equal(new Set(graderQuestions.map((q) => q.id)).size, graderQuestions.length);
});

test('grader: suggests each grade from its definition', () => {
  assert.equal(grade({ official: 'yes' }).sourceGrade, 'A1');
  assert.equal(grade({ official: 'no', tracks: 'yes' }).sourceGrade, 'A2');
  assert.equal(grade({ official: 'no', tracks: 'no', analysis: 'yes' }).sourceGrade, 'B1');
  assert.equal(grade({ official: 'no', tracks: 'no', analysis: 'no' }).sourceGrade, 'B2');
  for (const g of ['A1', 'A2', 'B1', 'B2']) assert.ok(g in grades);
});

test('grader: incomplete answers give no grade and name the next question', () => {
  const r = grade({});
  assert.equal(r.sourceGrade, null);
  assert.equal(r.missing, 'official');
  assert.equal(grade({ official: 'no' }).missing, 'tracks');
  assert.equal(grade({ official: 'no', tracks: 'unclear' }).missing, 'analysis');
});

test('grader: unclear never raises a grade', () => {
  const r = grade({ official: 'unclear', tracks: 'unclear', analysis: 'unclear' });
  assert.equal(r.sourceGrade, 'B2');
  assert.ok(r.reasons.some((x) => /unclear/i.test(x)));
});

test('grader: an allegation record is A1 but flagged as an allegation', () => {
  const r = grade({ official: 'yes', allegation: 'yes' });
  assert.equal(r.sourceGrade, 'A1');
  assert.ok(r.flags.some((f) => /allegation/.test(f) && /alleges/.test(f)));
  assert.ok(!grade({ official: 'yes', allegation: 'no' }).flags.some((f) => /alleges/.test(f)));
});

test('grader: a relayed weaker account keeps the weaker grade', () => {
  const r = grade({ official: 'no', tracks: 'yes', relayed: 'yes' });
  assert.equal(r.sourceGrade, 'A2');
  assert.equal(r.pointGrade, 'B2');
  assert.ok(r.flags.some((f) => /weaker grade/.test(f)));
  assert.equal(grade({ official: 'no', tracks: 'yes', relayed: 'unclear' }).pointGrade, 'B2');
  assert.equal(grade({ official: 'no', tracks: 'yes', relayed: 'no' }).pointGrade, 'A2');
});

test('grader: living-person rule, pending check and mirrors', () => {
  assert.ok(grade({ official: 'no', tracks: 'no', analysis: 'yes', person: 'yes' }).flags.some((f) => /named living person/.test(f)));
  assert.ok(!grade({ official: 'yes', person: 'yes' }).flags.some((f) => /named living person/.test(f)));
  assert.ok(grade({ official: 'yes', checked: 'no' }).flags.some((f) => /pending check/.test(f)));
  const m = grade({ mirror: 'yes', official: 'yes' });
  assert.equal(m.citable, false);
  assert.equal(m.sourceGrade, null);
});

// ---------------------------------------------------------------- evidence state
const st = (a: Record<string, string>) => classifyState(a);

test('state: question ids are unique and every result is a defined state', () => {
  assert.equal(new Set(stateQuestions.map((q) => q.id)).size, stateQuestions.length);
  for (const a of [{ found: 'no' }, { found: 'yes', said: 'yes', done: 'no' }, { found: 'yes', said: 'no', done: 'yes', confirmed: 'no' }]) {
    const s = st(a).state;
    assert.ok(s && s in states);
  }
});

test('state: nothing on record when no record (or unclear) is found', () => {
  assert.equal(st({ found: 'no' }).state, 'none');
  assert.equal(st({ found: 'unclear' }).state, 'none');
  assert.ok(st({ found: 'no' }).flags.some((f) => /not proof of absence/.test(f)));
  assert.match(st({ found: 'no' }).wording!, /We found no public record/);
});

test('state: incomplete answers give no state', () => {
  assert.equal(st({}).state, null);
  assert.equal(st({}).missing, 'found');
  assert.equal(st({ found: 'yes' }).missing, 'said');
  assert.equal(st({ found: 'yes', said: 'yes', done: 'yes' }).missing, 'confirmed');
  assert.equal(st({ found: 'yes', said: 'yes', done: 'yes', confirmed: 'yes' }).missing, 'outcome');
});

test('state: each state needs its condition', () => {
  assert.equal(st({ found: 'yes', said: 'yes', done: 'no' }).state, 'intent');
  assert.equal(st({ found: 'yes', said: 'yes', done: 'unclear' }).state, 'intent');
  assert.equal(st({ found: 'yes', said: 'no', done: 'yes', confirmed: 'no' }).state, 'activity');
  assert.equal(st({ found: 'yes', said: 'no', done: 'yes', confirmed: 'unclear' }).state, 'activity');
  assert.equal(st({ found: 'yes', said: 'no', done: 'yes', confirmed: 'yes', outcome: 'no' }).state, 'activity');
  assert.equal(st({ found: 'yes', said: 'no', done: 'yes', confirmed: 'yes', outcome: 'unclear' }).state, 'activity');
  assert.equal(st({ found: 'yes', said: 'no', done: 'yes', confirmed: 'yes', outcome: 'yes' }).state, 'verified');
});

test('state: never upgrades without a record of the act', () => {
  const r = st({ found: 'yes', said: 'yes', done: 'no', confirmed: 'yes', outcome: 'yes' });
  assert.equal(r.state, 'intent');
  assert.ok(r.flags.some((f) => /revisit question 3/.test(f)));
  assert.equal(st({ found: 'yes', said: 'no', done: 'no' }).state, 'none');
});

test('state: allegations are flagged', () => {
  const r = st({ found: 'yes', said: 'yes', done: 'no', allegation: 'yes' });
  assert.equal(r.state, 'intent');
  assert.ok(r.flags.some((f) => /alleges/.test(f)));
});

// ---------------------------------------------------------------- gift policy
test('gift policy: about twenty questions across every topic, unique ids', () => {
  assert.ok(giftQuestions.length >= 18 && giftQuestions.length <= 24);
  assert.equal(new Set(giftQuestions.map((q) => q.id)).size, giftQuestions.length);
  assert.deepEqual([...new Set(giftQuestions.map((q) => q.topic))], [...giftTopics]);
});

test('gift policy: summary sorts answers into addressed, not addressed, unclear and unanswered', () => {
  const s = summarizePolicy({ 'scope-units': 'yes', 'scope-types': 'no', 'scope-third': 'unclear' });
  const scope = s.find((t) => t.topic === 'Scope')!;
  assert.equal(scope.addressed.length, 1);
  assert.equal(scope.notAddressed.length, 1);
  assert.equal(scope.unclear.length, 1);
  assert.equal(scope.unanswered.length, 0);
  assert.equal(s.reduce((n, t) => n + t.unanswered.length, 0), giftQuestions.length - 3);
});

test('gift policy: gaps list no and unclear answers in order', () => {
  const g = policyGaps({ 'tr-review': 'no', 'scope-units': 'unclear', 'vet-who': 'yes' });
  assert.deepEqual(g.map((x) => [x.question.id, x.answer]), [['scope-units', 'unclear'], ['tr-review', 'no']]);
});

test('gift policy: report has no score or ranking', () => {
  const all = Object.fromEntries(giftQuestions.map((q) => [q.id, 'yes']));
  const r = policyReport(all, { name: 'Example policy', reviewedOn: '2026-11-24' });
  assert.match(r, /Policy: Example policy/);
  assert.match(r, /not a score/);
  assert.doesNotMatch(r, /\d+\s*(\/|out of)\s*\d+/);
  assert.doesNotMatch(r, /%|score:|rank:/i);
  assert.equal((r.match(/^Addressed:/gm) ?? []).length, giftQuestions.length);
});

// ---------------------------------------------------------------- review independence
test('review: unique ids and every question has options and a profile label', () => {
  assert.equal(new Set(reviewQuestions.map((q) => q.id)).size, reviewQuestions.length);
  for (const q of reviewQuestions) {
    assert.ok(q.options && q.options.length >= 3, q.id);
    assert.ok(q.label.length > 3, q.id);
    assert.ok(q.options!.some((o) => o.value === 'unclear'), `${q.id} has no unclear option`);
  }
  const topics = new Set(reviewQuestions.map((q) => q.topic));
  for (const t of ['Who commissioned it', 'Who conducted it', 'Scope', 'Access to records and people', 'Publication', 'Follow-up']) assert.ok(topics.has(t), t);
});

test('review: profile states answers and lists open questions', () => {
  const p = reviewProfile({ commissioner: 'board', conductor: 'law-firm', published: 'unclear' });
  assert.equal(p.answered, 3);
  const lines = p.groups.flatMap((g) => g.lines);
  assert.equal(lines.find((l) => l.id === 'commissioner')!.value, 'The governing board or a board committee');
  assert.equal(lines.find((l) => l.id === 'scope-written')!.value, 'Not yet checked');
  assert.ok(p.open.some((l) => l.id === 'published'));
  assert.ok(!p.open.some((l) => l.id === 'commissioner'));
  assert.equal(p.open.length, reviewQuestions.length - 2);
});

test('review: report is a profile, not a verdict', () => {
  const r = reviewReport({ commissioner: 'external' }, 'Example review');
  assert.match(r, /Review: Example review/);
  assert.match(r, /not a verdict/);
  assert.match(r, /Commissioned by: An outside body/);
  assert.doesNotMatch(r, /\b(independent|not independent) review\b|\bscore\b/i);
});

// ---------------------------------------------------------------- campus rates
test('rates: parseCount', () => {
  assert.deepEqual(parseCount(''), { value: null });
  assert.deepEqual(parseCount('  '), { value: null });
  assert.deepEqual(parseCount('0'), { value: 0 });
  assert.deepEqual(parseCount('1,234'), { value: 1234 });
  for (const bad of ['-1', '2.5', 'abc', '1e3']) assert.ok(parseCount(bad).error, bad);
  assert.ok(parseCount('99999999999999999999').error);
});

test('rates: parseEnrollment requires at least 1', () => {
  assert.ok(parseEnrollment('').error);
  assert.ok(parseEnrollment('0').error);
  assert.equal(parseEnrollment('21,000').value, 21000);
});

test('rates: ratePer1000 and formatRate', () => {
  assert.equal(ratePer1000(42, 21000), 2);
  assert.equal(formatRate(2), '2.00');
  assert.equal(formatRate(1234.567), '1,234.57');
  assert.equal(formatRate(0), '0.00');
});

test('rates: computeRates handles blanks, zeros and labels', () => {
  const r = computeRates({ enrollment: '20000', years: [{ label: '2022', count: '30' }, { label: '2023', count: '' }, { label: '2024', count: '0' }] });
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.rows.map((x) => [x.label, x.count, x.rate]), [['2022', 30, 1.5], ['2024', 0, 0]]);
  assert.deepEqual(r.skipped, ['2023']);
  assert.match(r.rows[1].note!, /not that none occurred/);
  assert.equal(computeRates({ enrollment: '100', years: [{ label: '', count: '5' }] }).rows[0].label, 'Year 1');
});

test('rates: computeRates validates', () => {
  assert.ok(computeRates({ enrollment: '', years: [{ label: '2022', count: '3' }] }).errors.some((e) => e.field === 'enrollment'));
  assert.ok(computeRates({ enrollment: '1000', years: [{ label: '', count: '' }] }).errors.some((e) => e.field === 'count-1'));
  assert.ok(computeRates({ enrollment: '1000', years: [{ label: 'last year', count: '3' }] }).errors.some((e) => e.field === 'year-1'));
  assert.ok(computeRates({ enrollment: '1000', years: [{ label: '2022', count: '3.5' }] }).errors.some((e) => e.field === 'count-1'));
  assert.ok(computeRates({ enrollment: '1000', years: [{ label: '2022', count: '3' }, { label: '2022', count: '4' }] }).errors.some((e) => /twice/.test(e.message)));
  assert.equal(computeRates({ enrollment: 'x', years: [{ label: '2022', count: '3' }] }).rows.length, 0);
  assert.ok(computeRates({ enrollment: '1000', years: [{ label: '2023–24', count: '3' }] }).errors.length === 0);
});

test('rates: warnings for small counts, counts above enrollment, shared enrollment', () => {
  const w = computeRates({ enrollment: '500', years: [{ label: '2022', count: '3' }, { label: '2023', count: '600' }] }).warnings.join(' ');
  assert.match(w, /small/);
  assert.match(w, /larger than enrollment/);
  assert.match(w, /same enrollment figure/);
  assert.match(w, /under 1,000/);
  assert.equal(computeRates({ enrollment: '20000', years: [{ label: '2022', count: '40' }] }).warnings.length, 0);
  assert.equal(computeRates({ enrollment: '20000', years: [1, 2, 3, 4].map((n) => ({ label: `202${n}`, count: '20' })) }).rows.length, 3);
});

test('rates: report text carries the comparison caveat', () => {
  const r = computeRates({ enrollment: '20000', years: [{ label: '2022', count: '30' }] });
  const t = ratesReport(r, 'Rape');
  assert.match(t, /: Rape/);
  assert.match(t, /1\.50 per 1,000/);
  assert.match(t, /Do not compare/);
  assert.equal(ratesReport(computeRates({ enrollment: '', years: [] })), '');
});

// ---------------------------------------------------------------- citation builder
const src = {
  title: 'Report Concerning Jeffrey E. Epstein’s Connections to Harvard University',
  publisher: 'Harvard University, Office of the General Counsel',
  date: '2020-05-01',
  url: 'https://ogc.harvard.edu/report.pdf',
  grade: 'A1',
  topic: 'Harvard',
};

test('citation: publisher and topic tokens', () => {
  assert.equal(publisherToken('Harvard University, Office of the President'), 'harvard');
  assert.equal(publisherToken('The New York Times'), 'nyt');
  assert.equal(publisherToken('STAT'), 'stat');
  assert.equal(publisherToken('Massachusetts Institute of Technology'), 'massachusetts');
  assert.equal(publisherToken(''), '');
  assert.equal(topicToken('The Seed of a Gift: 2019 report'), 'seed');
});

test('citation: suggested id is publisher-year-topic and valid', () => {
  const id = suggestId(src);
  assert.equal(id, 'harvard-2020-jeffrey');
  assert.equal(suggestId(src, 'Report'), 'harvard-2020-report');
  assert.equal(suggestId({ publisher: 'The New York Times', title: 'Seed money', date: '2019-07-31' }), 'nyt-2019-seed');
  assert.equal(suggestId({ publisher: 'Reuters', title: 'Seed money' }), 'reuters-seed');
  assert.ok(isSourceId(id));
  assert.ok(!isSourceId('Bad_ID'));
  assert.ok(!isSourceId('a--b'));
});

test('citation: checks required fields, dates, urls and mirrors', () => {
  assert.deepEqual(checkCitation(src).errors, []);
  const e = checkCitation({ title: '', publisher: '', grade: '', date: '1 May 2020', url: 'ftp://x' }).errors.join(' ');
  for (const w of ['title', 'publisher', 'grade', 'YYYY', 'https']) assert.match(e, new RegExp(w));
  assert.ok(checkCitation({ ...src, url: 'https://en.wikipedia.org/wiki/X' }).warnings.some((w) => /unofficial/.test(w)));
  assert.ok(checkCitation({ ...src, url: 'not a url' }).errors.length);
  assert.ok(checkCitation({ ...src, id: 'Bad Id' }).errors.some((w) => /id/.test(w)));
  assert.ok(checkCitation({ ...src, grade: 'B2' }).warnings.some((w) => /flagged/.test(w)));
});

test('citation: reference text follows the reference-list order', () => {
  assert.equal(referenceText({ ...src, author: 'Lawrence S. Bacow' }),
    'A1 Report Concerning Jeffrey E. Epstein’s Connections to Harvard University. Lawrence S. Bacow · Harvard University, Office of the General Counsel · 1 May 2020. https://ogc.harvard.edu/report.pdf');
  assert.equal(referenceText({ title: 'Book.', publisher: 'Press', grade: 'B1', date: '2005' }), 'B1 Book. Press · 2005.');
});

test('citation: source-register entry matches the sources.ts format', () => {
  const out = sourceEntry('harvard-2020-report', { ...src, note: "Harvard's own account." });
  assert.equal(out, [
    "  'harvard-2020-report': {",
    "    title: 'Report Concerning Jeffrey E. Epstein’s Connections to Harvard University',",
    "    publisher: 'Harvard University, Office of the General Counsel',",
    "    date: '2020-05-01',",
    "    url: 'https://ogc.harvard.edu/report.pdf',",
    "    grade: 'A1',",
    "    topic: 'Harvard',",
    "    note: 'Harvard\\'s own account.',",
    '  },',
  ].join('\n'));
  assert.doesNotMatch(sourceEntry('x', { ...src, author: '', url: '' }), /author|url/);
});

test('citation: bibtex reuses the export serialiser', () => {
  const b = bibtexEntry('x-2020', { ...src, title: 'A & B 100%' });
  assert.match(b, /^@misc\{x-2020,/);
  assert.match(b, /title = \{\{A \\& B 100\\%\}\}/);
  assert.match(b, /year = \{2020\}/);
  assert.match(b, /note = \{Reliability grade A1\}/);
});

// ---------------------------------------------------------------- claim row
const draft = {
  id: 'F-07', topic: 'Funding', claim: 'The gift was recorded in 2003.', state: 'activity', grade: 'A2',
  sources: 'hm-2020-report A2\nharvard-2020-report B1', caveat: '', page: '/program-for-evolutionary-dynamics/',
};

test('claim: parseSources reads ids with optional grades', () => {
  const r = parseSources('a-1 A1, b-2\nc-3 b2');
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.refs, [{ id: 'a-1', grade: 'A1' }, { id: 'b-2', grade: undefined }, { id: 'c-3', grade: 'B2' }]);
  assert.ok(parseSources('Bad_Id').errors.length);
  assert.ok(parseSources('a C9').errors.length);
  assert.ok(parseSources('a A1 extra').errors.length);
  assert.ok(parseSources('a\na').errors.some((e) => /twice/.test(e)));
  assert.deepEqual(parseSources('  ').refs, []);
});

test('claim: endsWithPeriod allows a closing quote', () => {
  assert.ok(endsWithPeriod('It ended.'));
  assert.ok(endsWithPeriod('He said “no.”'));
  assert.ok(!endsWithPeriod('No period'));
  assert.ok(!endsWithPeriod('Question?'));
});

test('claim: a valid draft passes', () => {
  assert.deepEqual(checkClaim(draft).errors, []);
});

test('claim: required fields and formats', () => {
  const e = checkClaim({ id: 'f7', topic: 'X', claim: 'No period', state: 'maybe', grade: 'C', sources: '', page: 'donor-pathways' }).errors.join(' ');
  for (const w of ['id must', 'topic', 'full stop', 'evidence state', 'grade', 'page must', 'at least one source']) assert.match(e, new RegExp(w));
});

test('claim: caveat required for nothing-on-record and for B2', () => {
  assert.ok(checkClaim({ ...draft, state: 'none' }).errors.some((e) => /caveat/.test(e)));
  assert.ok(checkClaim({ ...draft, grade: 'B2', sources: 'x B2' }).errors.some((e) => /caveat/.test(e)));
  assert.deepEqual(checkClaim({ ...draft, state: 'none', caveat: 'Searched the register in 2026.' }).errors, []);
});

test('claim: grade may not be stronger than the best source', () => {
  assert.ok(checkClaim({ ...draft, grade: 'A1' }).errors.some((e) => /stronger than the best source/.test(e)));
  assert.ok(checkClaim({ ...draft, grade: 'B1' }).warnings.some((w) => /strongest source/.test(w)));
  assert.ok(checkClaim({ ...draft, grade: 'A1', sources: 'x\ny' }).warnings.some((w) => /grade check/.test(w)));
  assert.deepEqual(checkClaim({ ...draft, grade: 'A1', sources: 'x' }).errors, []);
});

test('claim: style warnings', () => {
  const w = checkClaim({ ...draft, claim: 'The email proves he was linked to it — clearly.' }).warnings.join(' ');
  assert.match(w, /proves/);
  assert.match(w, /linked to/);
  assert.match(w, /em dash/);
});

test('claim: TypeScript object and CSV row', () => {
  const { refs } = checkClaim({ ...draft, caveat: 'One “source”, two figures.' });
  const obj = claimObject({ ...draft, caveat: 'One “source”, two figures.' }, refs);
  assert.equal(obj, [
    '  {',
    "    id: 'F-07', page: '/program-for-evolutionary-dynamics/', topic: 'Funding',",
    "    claim: 'The gift was recorded in 2003.',",
    "    state: 'activity', grade: 'A2', sources: ['hm-2020-report', 'harvard-2020-report'],",
    "    caveat: 'One “source”, two figures.',",
    '  },',
  ].join('\n'));
  assert.doesNotMatch(claimObject(draft, refs), /caveat/);
  const row = claimCsvRow({ ...draft, claim: 'A, "quoted" claim.' }, refs);
  assert.equal(row, 'F-07,Funding,"A, ""quoted"" claim.",activity,A2,hm-2020-report harvard-2020-report,,/program-for-evolutionary-dynamics/,pending');
  assert.equal(CSV_HEADER.length, row.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).length);
});
