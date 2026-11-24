/**
 * Evidence-state classifier: places a claim in one of the four states defined in
 * src/data/grades.ts. A claim moves up a state only when the condition for that
 * state is met; "unclear" never counts as met, and a claim between two states
 * takes the weaker.
 */
import type { EvidenceState } from '../../data/grades.ts';
import { type Answers, type Question, YES_NO, answerOf } from './common.ts';

export const stateQuestions: Question[] = [
  { id: 'found', topic: 'Is there a record?', text: 'Did you find any public record that bears on the claim?' },
  {
    id: 'said', topic: 'What the record shows',
    text: 'Does a record show that it was proposed, pitched, promised, alleged or said?',
  },
  {
    id: 'done', topic: 'What the record shows',
    text: 'Does a record show that it was actually done (a payment, a visit, a shipment, an order), not only that someone says it was?',
    help: 'A complaint or letter alleging that something happened is not a record that it happened.',
  },
  {
    id: 'confirmed', topic: 'Confirmation',
    text: 'Does an official finding or an independent result confirm that it was done?',
  },
  {
    id: 'outcome', topic: 'Confirmation',
    text: 'Does that finding or result also confirm what the activity produced?',
  },
  {
    id: 'allegation', topic: 'Confirmation',
    text: 'Is any record you rely on an allegation: a complaint, a lawsuit, or a legislator’s letter?',
    options: YES_NO,
  },
];

export interface StateResult {
  state: EvidenceState | null;
  missing?: string;
  reasons: string[];
  flags: string[];
  /** Suggested opening for the sentence that states the claim. */
  wording?: string;
}

const WORDING: Record<EvidenceState, string> = {
  none: '“We found no public record of ...” Never “there is no ...”.',
  intent: '“X proposed ...”, “X said that ...” or, for an allegation, “The complaint alleges that ...”.',
  activity: '“The record shows that X paid / visited / ordered ...”, with the date and what is counted.',
  verified: '“The review found that ...” or “The Office for Civil Rights found that ...”, naming who made the finding.',
};

export function classifyState(input: Answers): StateResult {
  const a = (id: string) => answerOf(input, stateQuestions.find((q) => q.id === id)!);
  const reasons: string[] = [];
  const flags: string[] = [];
  const done = (state: EvidenceState | null, missing?: string): StateResult =>
    ({ state, missing, reasons, flags, wording: state ? WORDING[state] : undefined });
  const notMet = (v: string) => (v === 'unclear' ? 'is unclear, which counts as not met' : 'is not met');

  const found = a('found');
  if (!found) return done(null, 'found');
  if (found !== 'yes') {
    reasons.push(found === 'no'
      ? 'No public record was found, so the claim is a statement of absence.'
      : 'It is unclear whether any record bears on the claim. Until one is found, the claim stays at nothing on record.');
    flags.push('Absence of a record is not proof of absence. Say what you searched and when.');
    return done('none');
  }

  const said = a('said'), did = a('done'), conf = a('confirmed'), out = a('outcome');
  if (!said || !did) return done(null, !said ? 'said' : 'done');

  if (a('allegation') === 'yes') {
    flags.push('An allegation is recorded as stated intent or assertion, never as documented activity on its own. Attribute it: “The complaint alleges that ...”.');
  }

  if (did !== 'yes') {
    if (conf === 'yes') flags.push('You answered that a finding confirms it was done, but not that a record shows it was done. If the finding confirms the activity, the activity is documented: revisit question 3.');
    if (said === 'yes') {
      reasons.push('A record shows that it was proposed or said.');
      reasons.push(`The condition for documented activity (a record that it was done) ${notMet(did)}.`);
      flags.push('A well-documented proposal is still a proposal.');
      return done('intent');
    }
    reasons.push('The records you found show neither a statement nor an act bearing on this claim.');
    if (said === 'unclear' || did === 'unclear') reasons.push('An “unclear” answer never moves a claim up a state.');
    flags.push('For this claim, treat it as nothing on record, and check whether the records you found really bear on it.');
    return done('none');
  }

  reasons.push('A record shows that it was done, which is the condition for documented activity.');
  if (!conf) return done(null, 'confirmed');
  if (conf !== 'yes') {
    reasons.push(`The condition for verified implementation (an official finding or independent result) ${notMet(conf)}.`);
    return done('activity');
  }
  if (!out) return done(null, 'outcome');
  if (out !== 'yes') {
    reasons.push('A finding confirms that it was done.');
    reasons.push(`Verified implementation also needs confirmation of what the activity produced, and that ${notMet(out)}. The claim stays at documented activity.`);
    flags.push('If a claim sits between two states, use the weaker.');
    return done('activity');
  }
  reasons.push('An official finding or independent result confirms both the activity and what it produced: verified implementation.');
  if (a('allegation') === 'yes') flags.push('Make sure the finding, not the allegation, is the record you cite for the verified claim.');
  return done('verified');
}
