/**
 * Gift acceptance policy checklist. Records what a written policy does and does
 * not address. It deliberately produces no score and no ranking: a policy that
 * addresses a question may still be applied badly, and one that is silent may be
 * supplemented by other documents.
 */
import { type Answers, type Question, answerOf, groupByTopic, textSection } from './common.ts';

export const giftTopics = ['Scope', 'Vetting', 'Escalation', 'Conflicts of interest', 'Anonymity', 'Naming', 'Return of gifts', 'Transparency'] as const;

export const giftQuestions: Question[] = [
  { id: 'scope-units', topic: 'Scope', text: 'Does the policy say which parts of the institution it covers (schools, affiliated hospitals, foundations, centers)?' },
  { id: 'scope-types', topic: 'Scope', text: 'Does it cover every form of support: gifts, pledges, gifts in kind, sponsored research, and funds routed through intermediaries?' },
  { id: 'scope-third', topic: 'Scope', text: 'Does it cover gifts arranged or introduced by a third party on a donor’s behalf?' },
  { id: 'vet-who', topic: 'Vetting', text: 'Does it say who carries out due diligence on prospective donors?' },
  { id: 'vet-when', topic: 'Vetting', text: 'Does it say when vetting happens: before solicitation, before acceptance, and when a gift is renewed?' },
  { id: 'vet-criteria', topic: 'Vetting', text: 'Does it set out what vetting looks at, such as criminal convictions, open investigations or the source of the funds?' },
  { id: 'esc-route', topic: 'Escalation', text: 'Does it name who decides on a gift that raises concerns, above the fundraising office?' },
  { id: 'esc-record', topic: 'Escalation', text: 'Does it require that decision and its reasons to be recorded in writing?' },
  { id: 'coi-staff', topic: 'Conflicts of interest', text: 'Does it address conflicts of interest for staff or faculty who solicit a gift or benefit from it?' },
  { id: 'coi-access', topic: 'Conflicts of interest', text: 'Does it say what a donor may and may not receive in return: appointments, say over research, campus access, office space?' },
  { id: 'anon-when', topic: 'Anonymity', text: 'Does it say when a gift may be anonymous, and who inside the institution must still know the donor’s identity?' },
  { id: 'anon-split', topic: 'Anonymity', text: 'Does it address gifts split up or routed through others to avoid review or to hide the donor?' },
  { id: 'name-criteria', topic: 'Naming', text: 'Does it set criteria for naming a building, chair, program or fund after a donor?' },
  { id: 'name-remove', topic: 'Naming', text: 'Does it say when and how a name may be removed?' },
  { id: 'ret-grounds', topic: 'Return of gifts', text: 'Does it set out grounds for returning or redirecting a gift?' },
  { id: 'ret-process', topic: 'Return of gifts', text: 'Does it say who decides on a return and what happens to funds already spent or unspent?' },
  { id: 'ret-past', topic: 'Return of gifts', text: 'Does it say how it applies to gifts accepted before it took effect?' },
  { id: 'tr-public', topic: 'Transparency', text: 'Is the policy itself published where the public can read it?' },
  { id: 'tr-report', topic: 'Transparency', text: 'Does the institution report publicly on gifts reviewed, declined or returned under the policy?' },
  { id: 'tr-review', topic: 'Transparency', text: 'Does the policy set a date or cycle for its own review?' },
];

export interface TopicSummary {
  topic: string;
  addressed: Question[];
  notAddressed: Question[];
  unclear: Question[];
  unanswered: Question[];
}

export interface PolicyMeta { name?: string; version?: string; url?: string; reviewedOn?: string }

export function summarizePolicy(input: Answers): TopicSummary[] {
  return groupByTopic(giftQuestions).map(({ topic, items }) => {
    const pick = (v: string) => items.filter((q) => answerOf(input, q) === v);
    return { topic, addressed: pick('yes'), notAddressed: pick('no'), unclear: pick('unclear'), unanswered: pick('') };
  });
}

/** The gaps: questions answered "no" or "unclear", in checklist order. */
export function policyGaps(input: Answers): { question: Question; answer: 'no' | 'unclear' }[] {
  return giftQuestions
    .map((q) => ({ question: q, answer: answerOf(input, q) }))
    .filter((x): x is { question: Question; answer: 'no' | 'unclear' } => x.answer === 'no' || x.answer === 'unclear');
}

/** A plain-text record of the checklist, for copying or printing. No score, no ranking. */
export function policyReport(input: Answers, meta: PolicyMeta = {}): string {
  const head = [
    'Gift acceptance policy checklist',
    meta.name ? `Policy: ${meta.name}` : '',
    meta.version ? `Version or date of policy: ${meta.version}` : '',
    meta.url ? `Where published: ${meta.url}` : '',
    meta.reviewedOn ? `Checklist completed: ${meta.reviewedOn}` : '',
    'This record lists what the written policy addresses. It is not a score and does not rank institutions.',
  ].filter(Boolean).join('\n');
  const parts = summarizePolicy(input).map((t) => textSection(t.topic, [
    ...t.addressed.map((q) => `Addressed: ${q.text}`),
    ...t.notAddressed.map((q) => `Not addressed: ${q.text}`),
    ...t.unclear.map((q) => `Unclear from the text: ${q.text}`),
    ...t.unanswered.map((q) => `Not yet checked: ${q.text}`),
  ]));
  return [head, ...parts].join('\n\n') + '\n';
}
