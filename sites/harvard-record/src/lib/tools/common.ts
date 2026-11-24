/**
 * Shared, framework-free helpers for the interactive tools under /tools/.
 * Nothing here touches the DOM, so every function can be unit-tested in Node.
 */
import type { Grade } from '../../data/grades.ts';

/** The answer to a yes/no/unclear question. An empty string means "not answered". */
export type YesNo = 'yes' | 'no' | 'unclear' | '';
export type Answers = Record<string, string | undefined>;

export interface Option { value: string; label: string }
export interface Question {
  id: string;
  topic?: string;
  text: string;
  help?: string;
  options?: Option[]; // defaults to yes / no / unclear
}

export const YES_NO_UNCLEAR: Option[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unclear', label: 'Unclear' },
];
export const YES_NO: Option[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

export const optionsFor = (q: Question): Option[] => q.options ?? YES_NO_UNCLEAR;

/** Read one answer, treating anything outside the question's options as unanswered. */
export function answerOf(answers: Answers, q: Question): string {
  const v = answers[q.id] ?? '';
  return optionsFor(q).some((o) => o.value === v) ? v : '';
}

/** Group questions by topic, keeping first-appearance order. */
export function groupByTopic<T extends { topic?: string }>(items: T[]): { topic: string; items: T[] }[] {
  const out: { topic: string; items: T[] }[] = [];
  for (const it of items) {
    const t = it.topic ?? '';
    let g = out.find((x) => x.topic === t);
    if (!g) out.push((g = { topic: t, items: [] }));
    g.items.push(it);
  }
  return out;
}

/** Strength order of the reliability grades, strongest first. */
export const GRADE_ORDER: Grade[] = ['A1', 'A2', 'B1', 'B2'];
export const isGrade = (g: unknown): g is Grade => typeof g === 'string' && (GRADE_ORDER as string[]).includes(g);
/** 0 for the strongest grade (A1), 3 for the weakest (B2). */
export const gradeRank = (g: Grade): number => GRADE_ORDER.indexOf(g);
/** The weaker of two grades. */
export const weakerGrade = (a: Grade, b: Grade): Grade => (gradeRank(a) >= gradeRank(b) ? a : b);
/** The strongest grade in a list, or undefined for an empty list. */
export const strongestGrade = (gs: Grade[]): Grade | undefined =>
  gs.length ? gs.reduce((best, g) => (gradeRank(g) < gradeRank(best) ? g : best)) : undefined;

/** Lowercase, hyphenated, ASCII-only id fragment: "Boston Globe’s report" -> "boston-globes-report". */
export function slugPart(s: string): string {
  return s
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Escape a string for a single-quoted TypeScript literal. */
export const tsString = (s: string): string =>
  `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n')}'`;

/** True for YYYY, YYYY-MM or YYYY-MM-DD with a real month and day. */
export function isIsoDate(s: string): boolean {
  const m = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(s);
  if (!m) return false;
  const [, y, mo, d] = m;
  if (mo && (Number(mo) < 1 || Number(mo) > 12)) return false;
  if (d) {
    const days = new Date(Date.UTC(Number(y), Number(mo), 0)).getUTCDate();
    if (Number(d) < 1 || Number(d) > days) return false;
  }
  return true;
}

/** Plain-text list with a heading underline, for copy and print output. */
export function textSection(title: string, lines: string[]): string {
  return [title, '-'.repeat(title.length), ...lines].join('\n');
}
