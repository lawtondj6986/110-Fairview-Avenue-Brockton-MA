/**
 * Source grader: suggests a reliability grade (A1, A2, B1, B2) from a short
 * questionnaire, following the definitions in src/data/grades.ts and the three
 * rules on /methodology/. It suggests; a maintainer decides.
 */
import type { Grade } from '../../data/grades.ts';
import { type Answers, type Question, YES_NO, answerOf, weakerGrade } from './common.ts';

export const graderQuestions: Question[] = [
  {
    id: 'mirror', topic: 'What it is',
    text: 'Is this an unofficial mirror, wiki, forum post or summary site rather than the original document or the outlet that published it?',
    help: 'Unofficial mirrors and wikis are leads to the original, never sources.',
    options: YES_NO,
  },
  {
    id: 'official', topic: 'What it is',
    text: 'Is it an official document speaking for itself: an institutional report, a court filing, a government release, a statute, or hearing minutes?',
  },
  {
    id: 'allegation', topic: 'What it is',
    text: 'Does the document record an allegation or assertion (a complaint, a lawsuit, a legislator’s letter) rather than a finding?',
    help: 'Only matters for official documents.',
    options: YES_NO,
  },
  {
    id: 'tracks', topic: 'What it is',
    text: 'Is it reporting by an established outlet that quotes or closely follows primary documents, or records an on-the-record statement?',
  },
  {
    id: 'analysis', topic: 'What it is',
    text: 'Is it a book, scholarship or analysis with clear sourcing and context?',
  },
  {
    id: 'relayed', topic: 'The point you want to cite',
    text: 'Does the point you want to cite rest on a weaker account the source relays: one unnamed or uncorroborated person, a second-hand recollection, or a document the author did not see?',
  },
  {
    id: 'person', topic: 'The point you want to cite',
    text: 'Will you use it for a factual claim about a named living person?',
    options: YES_NO,
  },
  {
    id: 'checked', topic: 'The point you want to cite',
    text: 'Have you opened the original and checked the cited facts against it yourself?',
    options: YES_NO,
  },
];

export interface GradeResult {
  /** The grade of the source as a whole, or null if the answers are incomplete or it is not citable. */
  sourceGrade: Grade | null;
  /** The grade for the specific point. Weaker than sourceGrade when a weaker account is relayed. */
  pointGrade: Grade | null;
  citable: boolean;
  /** Which question still needs an answer before a grade can be suggested. */
  missing?: string;
  reasons: string[];
  flags: string[];
}

export function gradeSource(input: Answers): GradeResult {
  const a = (id: string) => answerOf(input, graderQuestions.find((q) => q.id === id)!);
  const reasons: string[] = [];
  const flags: string[] = [];
  const result = (sourceGrade: Grade | null, pointGrade: Grade | null, extra: Partial<GradeResult> = {}): GradeResult =>
    ({ sourceGrade, pointGrade, citable: true, reasons, flags, ...extra });

  if (a('mirror') === 'yes') {
    reasons.push('An unofficial mirror, wiki or summary site is not graded.');
    flags.push('Find and cite the original document, or established reporting on it. Use the mirror only as a lead.');
    return result(null, null, { citable: false });
  }

  let base: Grade | null = null;
  const unclearNote = 'An “unclear” answer counts as no: a grade does not rise without the condition being met.';
  let sawUnclear = false;
  for (const [id, grade, yes, no] of [
    ['official', 'A1', 'It is an official document speaking for itself, which is the A1 definition.', 'It is not an official primary record, so it is not A1.'],
    ['tracks', 'A2', 'It is established reporting that tracks primary documents or an on-the-record statement, which is the A2 definition.', 'It is not reporting that tracks the record, so it is not A2.'],
    ['analysis', 'B1', 'It is secondary analysis with clear sourcing, which is the B1 definition.', 'It is not secondary analysis with clear sourcing, so it is not B1.'],
  ] as const) {
    const v = a(id);
    if (!v) return result(null, null, { missing: id });
    if (v === 'yes') { base = grade; reasons.push(yes); break; }
    if (v === 'unclear') sawUnclear = true;
    reasons.push(no);
  }
  if (sawUnclear) reasons.push(unclearNote);
  if (!base) {
    base = 'B2';
    reasons.push('None of the stronger definitions applies, so it is thin or unverified: B2.');
  }

  let point: Grade = base;
  const relayed = a('relayed');
  if (relayed === 'yes' || relayed === 'unclear') {
    point = weakerGrade(base, 'B2');
    if (base !== 'B2') {
      reasons.push(relayed === 'yes'
        ? `The point rests on a weaker account the source relays. The source stays ${base}, but that account takes the weaker grade: B2.`
        : `It is unclear whether the point rests on a relayed account. Until that is settled, treat the point as B2 and the source as ${base}.`);
    }
    flags.push('Rule: when a well-sourced article relays a weaker account, the weaker grade applies to that account. Attribute it: “X said that Y had told him ...”.');
  }

  if (base === 'A1' && a('allegation') === 'yes') {
    flags.push('Rule: a primary record of an allegation is A1 for what it says, and is always described as an allegation or assertion. Write “The complaint alleges that ...”, never “the lawsuit shows”.');
  }
  if (point === 'B2') flags.push('B2 material is always flagged in the text where it is used.');
  if (point === 'B1') flags.push('B1 is for background and calibration, not for new factual claims about individuals.');
  if (a('person') === 'yes' && (point === 'B1' || point === 'B2')) {
    flags.push(`Rule: a factual claim about a named living person needs an A1 or A2 source. This point is ${point}: find a stronger source or do not make the claim.`);
  }
  if (a('checked') === 'no') flags.push('Until you have checked the original, label the source “pending check” wherever it is cited.');

  return result(base, point);
}
