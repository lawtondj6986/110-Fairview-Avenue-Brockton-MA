/**
 * Claim ledger row builder: checks a draft row against the rules for the claim
 * ledger in src/data/claims.ts and writes it out as a TypeScript object and a
 * CSV row in the same column order as /claims.csv.
 */
import type { EvidenceState, Grade } from '../../data/grades.ts';
import { csvCell } from '../export.ts';
import { gradeRank, isGrade, strongestGrade, tsString } from './common.ts';

export const CLAIM_TOPICS = ['Funding', 'Access', 'Institutional response', 'Introduced donors', 'Genetics', 'U.S. Virgin Islands', 'MIT', 'Campus safety', 'Law'] as const;
export const CLAIM_STATES: EvidenceState[] = ['intent', 'activity', 'verified', 'none'];
export const CSV_HEADER = ['id', 'topic', 'claim', 'state', 'grade', 'sources', 'caveat', 'page', 'checked'];

/** Words the style guide says overclaim. */
export const OVERCLAIM = ['proves', 'proved', 'reveals', 'revealed', 'exposes', 'exposed', 'linked to', 'tied to', 'connected to', 'associated with', 'part of a network'];

export interface SourceRef { id: string; grade?: Grade }

/**
 * Parse the sources box: one source per line or comma, each an id optionally
 * followed by its grade, e.g. "harvard-2020-report A1".
 */
export function parseSources(raw: string): { refs: SourceRef[]; errors: string[] } {
  const refs: SourceRef[] = [];
  const errors: string[] = [];
  for (const chunk of raw.split(/[\n,;]+/).map((s) => s.trim()).filter(Boolean)) {
    const [id, g, ...rest] = chunk.split(/\s+/);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) { errors.push(`“${id}” is not a source id (lowercase letters and numbers joined by hyphens).`); continue; }
    const grade = g?.toUpperCase();
    if (g && !isGrade(grade)) { errors.push(`“${g}” after ${id} is not a grade (A1, A2, B1 or B2).`); continue; }
    if (rest.length) { errors.push(`Unexpected text after ${id}: put each source on its own line.`); continue; }
    if (refs.some((r) => r.id === id)) { errors.push(`${id} is listed twice.`); continue; }
    refs.push({ id, grade: grade as Grade | undefined });
  }
  return { refs, errors };
}

export interface ClaimDraft {
  id: string;
  topic: string;
  claim: string;
  state: string;
  grade: string;
  sources: string;
  caveat?: string;
  page: string;
}

export interface ClaimCheck { errors: string[]; warnings: string[]; refs: SourceRef[] }

/** Ends with a full stop, allowing a closing quotation mark or bracket after it. */
export const endsWithPeriod = (s: string): boolean => /\.[”’"')\]]*$/.test(s.trim());

export function checkClaim(d: ClaimDraft): ClaimCheck {
  const errors: string[] = [];
  const warnings: string[] = [];
  const claim = d.claim.trim();
  const caveat = (d.caveat ?? '').trim();

  if (!/^[A-Z]-\d{2,3}$/.test(d.id.trim())) errors.push('The id must be a capital letter, a hyphen and a two- or three-digit number, such as F-07.');
  if (!(CLAIM_TOPICS as readonly string[]).includes(d.topic)) errors.push('Choose a topic.');
  if (!claim) errors.push('Write the claim.');
  else if (!endsWithPeriod(claim)) errors.push('The claim must end with a full stop.');
  if (!(CLAIM_STATES as string[]).includes(d.state)) errors.push('Choose an evidence state.');
  if (!isGrade(d.grade)) errors.push('Choose a grade.');
  if (!/^\/([a-z0-9-]+\/)*$/.test(d.page.trim())) errors.push('The page must be a site path that starts and ends with a slash, such as /donor-pathways/.');

  if (d.state === 'none' && !caveat) errors.push('A “nothing on record” claim needs a caveat saying what was searched; absence of a record is not proof of absence.');
  if (d.grade === 'B2' && !caveat) errors.push('A B2 claim needs a caveat: thin or unverified material is always flagged.');
  if (caveat && !endsWithPeriod(caveat)) warnings.push('The caveat should end with a full stop.');

  const { refs, errors: srcErrors } = parseSources(d.sources);
  errors.push(...srcErrors);
  if (!refs.length && !srcErrors.length) errors.push('List at least one source id.');
  const graded = refs.filter((r) => r.grade).map((r) => r.grade!);
  const best = strongestGrade(graded);
  if (isGrade(d.grade) && best) {
    if (gradeRank(d.grade) < gradeRank(best)) {
      errors.push(`The claim is graded ${d.grade}, which is stronger than the best source entered (${best}). A claim cannot be stronger than its sources.`);
    } else if (gradeRank(d.grade) > gradeRank(best)) {
      warnings.push(`The claim is graded ${d.grade} but its best source is ${best}. The ledger normally uses the grade of the strongest source that directly supports the claim. If the weaker grade is deliberate (a relayed account), say why in the caveat.`);
    }
  }
  if (refs.length && graded.length < refs.length) warnings.push('Add each source’s grade (for example “harvard-2020-report A1”) so the grade check can run on every source.');

  const lower = ` ${claim.toLowerCase()} `;
  const found = OVERCLAIM.filter((w) => new RegExp(`\\b${w}\\b`).test(lower));
  if (found.length) warnings.push(`The style guide avoids: ${found.map((w) => `“${w}”`).join(', ')}. Say what the record shows instead.`);
  if (/—/.test(claim + caveat)) warnings.push('The style guide uses no em dashes. Use a comma, a colon, parentheses or two sentences.');
  if (/'|"/.test(claim + caveat)) warnings.push('Straight quotes found. The site uses curly quotation marks and apostrophes.');
  return { errors, warnings, refs };
}

/** The row as an object literal for the `claims` array. New rows carry no `checked` date. */
export function claimObject(d: ClaimDraft, refs: SourceRef[]): string {
  const caveat = (d.caveat ?? '').trim();
  return [
    '  {',
    `    id: ${tsString(d.id.trim())}, page: ${tsString(d.page.trim())}, topic: ${tsString(d.topic)},`,
    `    claim: ${tsString(d.claim.trim())},`,
    `    state: ${tsString(d.state)}, grade: ${tsString(d.grade)}, sources: [${refs.map((r) => tsString(r.id)).join(', ')}],`,
    ...(caveat ? [`    caveat: ${tsString(caveat)},`] : []),
    '  },',
  ].join('\n');
}

/** One CSV row in the /claims.csv column order, with "pending" in the checked column. */
export function claimCsvRow(d: ClaimDraft, refs: SourceRef[]): string {
  return [d.id.trim(), d.topic, d.claim.trim(), d.state, d.grade, refs.map((r) => r.id).join(' '), (d.caveat ?? '').trim(), d.page.trim(), 'pending']
    .map(csvCell).join(',');
}

