/**
 * Review independence checklist. Builds a factual profile of how an
 * institutional review was set up and published. It gives no verdict: the
 * profile states what is known and lists what is not.
 */
import { type Answers, type Option, type Question, answerOf, groupByTopic, optionsFor, textSection } from './common.ts';

const UNCLEAR: Option = { value: 'unclear', label: 'Not stated or unclear' };
const yn = (yes: string, no: string): Option[] => [{ value: 'yes', label: yes }, { value: 'no', label: no }, UNCLEAR];

export const reviewQuestions: (Question & { label: string })[] = [
  {
    id: 'commissioner', topic: 'Who commissioned it', label: 'Commissioned by',
    text: 'Who commissioned the review?',
    options: [
      { value: 'board', label: 'The governing board or a board committee' },
      { value: 'president', label: 'The president or senior administration' },
      { value: 'counsel', label: 'The general counsel’s office' },
      { value: 'external', label: 'An outside body: a regulator, court or legislature' },
      UNCLEAR,
    ],
  },
  {
    id: 'commissioner-in-scope', topic: 'Who commissioned it', label: 'People within scope among those who commissioned or oversaw it',
    text: 'Were any people whose conduct was within the review’s scope among those who commissioned or oversaw it?',
    options: yn('Yes', 'No'),
  },
  {
    id: 'conductor', topic: 'Who conducted it', label: 'Conducted by',
    text: 'Who conducted the review?',
    options: [
      { value: 'internal', label: 'The institution’s own staff' },
      { value: 'law-firm', label: 'An outside law firm' },
      { value: 'panel', label: 'An independent panel or another outside firm' },
      { value: 'government', label: 'A government body' },
      UNCLEAR,
    ],
  },
  {
    id: 'prior-relationship', topic: 'Who conducted it', label: 'Reviewer had a prior working relationship with the institution',
    text: 'Did the reviewer have a prior working relationship with the institution, such as acting as its regular outside counsel?',
    options: yn('Yes', 'No'),
  },
  {
    id: 'client', topic: 'Who conducted it', label: 'Reviewer acted for the institution as its client',
    text: 'Did the reviewer act for the institution as its client, so that legal privilege could apply to the work?',
    options: yn('Yes', 'No'),
  },
  {
    id: 'scope-written', topic: 'Scope', label: 'Scope published in writing',
    text: 'Was the scope of the review published in writing?',
    options: yn('Yes', 'No'),
  },
  {
    id: 'scope-limited', topic: 'Scope', label: 'Scope limited to particular people, units or periods',
    text: 'Was the scope limited to particular people, units or time periods?',
    options: yn('Yes', 'No'),
  },
  {
    id: 'scope-extend', topic: 'Scope', label: 'Reviewer could widen the scope',
    text: 'Could the reviewer widen the scope if the evidence led elsewhere?',
    options: yn('Yes', 'No'),
  },
  {
    id: 'records', topic: 'Access to records and people', label: 'Access to documents and email',
    text: 'Did the reviewer have access to the institution’s documents and email?',
    options: [
      { value: 'full', label: 'Yes, stated as unrestricted' },
      { value: 'partial', label: 'Partial or with stated limits' },
      { value: 'no', label: 'No' },
      UNCLEAR,
    ],
  },
  {
    id: 'interviews-declined', topic: 'Access to records and people', label: 'Report says some people declined to be interviewed',
    text: 'Does the report say whether anyone declined to be interviewed?',
    options: [
      { value: 'yes', label: 'Yes, and it says who or how many' },
      { value: 'none', label: 'It says everyone asked took part' },
      UNCLEAR,
    ],
  },
  {
    id: 'compel', topic: 'Access to records and people', label: 'Reviewer could compel documents or testimony',
    text: 'Could the reviewer compel documents or testimony, for example by subpoena?',
    options: yn('Yes', 'No'),
  },
  {
    id: 'published', topic: 'Publication', label: 'Report published',
    text: 'Was the report published?',
    options: [
      { value: 'full', label: 'In full' },
      { value: 'redacted', label: 'In full with redactions' },
      { value: 'summary', label: 'Only as a summary' },
      { value: 'no', label: 'Not published' },
      UNCLEAR,
    ],
  },
  {
    id: 'reviewer-words', topic: 'Publication', label: 'Published text is the reviewer’s own',
    text: 'Is the published text the reviewer’s own words, rather than the institution’s account of the findings?',
    options: yn('Yes', 'No'),
  },
  {
    id: 'recommendations', topic: 'Follow-up', label: 'Recommendations made',
    text: 'Did the review make recommendations?',
    options: yn('Yes', 'No'),
  },
  {
    id: 'implementation', topic: 'Follow-up', label: 'Institution has reported publicly on implementation',
    text: 'Has the institution reported publicly on what it did about them?',
    options: yn('Yes', 'No'),
  },
  {
    id: 'outside-check', topic: 'Follow-up', label: 'Implementation checked by someone outside the institution',
    text: 'Has anyone outside the institution checked that implementation?',
    options: yn('Yes', 'No'),
  },
];

export interface ProfileLine { id: string; label: string; value: string }
export interface ReviewProfile { groups: { topic: string; lines: ProfileLine[] }[]; open: ProfileLine[]; answered: number }

export function reviewProfile(input: Answers): ReviewProfile {
  const open: ProfileLine[] = [];
  let answered = 0;
  const groups = groupByTopic(reviewQuestions).map(({ topic, items }) => ({
    topic,
    lines: items.map((q) => {
      const v = answerOf(input, q);
      const opt = optionsFor(q).find((o) => o.value === v);
      const line = { id: q.id, label: q.label, value: opt ? opt.label : 'Not yet checked' };
      if (v) answered++;
      if (!v || v === 'unclear') open.push({ ...line, value: v ? 'Not stated or unclear' : 'Not yet checked' });
      return line;
    }),
  }));
  return { groups, open, answered };
}

export function reviewReport(input: Answers, title = ''): string {
  const p = reviewProfile(input);
  return [
    ['Review independence profile', title ? `Review: ${title}` : '', 'A factual profile of how the review was set up and published. It is not a verdict on the review or its findings.'].filter(Boolean).join('\n'),
    ...p.groups.map((g) => textSection(g.topic, g.lines.map((l) => `${l.label}: ${l.value}`))),
    p.open.length ? textSection('Open questions', p.open.map((l) => `${l.label} (${l.value.toLowerCase()})`)) : '',
  ].filter(Boolean).join('\n\n') + '\n';
}
