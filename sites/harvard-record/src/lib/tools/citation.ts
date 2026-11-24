/**
 * Citation builder: formats a source three ways, from the same fields as the
 * source register in src/data/sources.ts.
 */
import type { Grade } from '../../data/grades.ts';
import { formatDate } from '../citations.ts';
import { toBibtex } from '../export.ts';
import { isGrade, isIsoDate, slugPart, tsString } from './common.ts';

export const SOURCE_TOPICS = ['Harvard', 'HMS and genetics', 'Donors', 'MIT', 'U.S. Virgin Islands', 'Law and background', 'Campus safety'] as const;

/** Hosts that mirror or summarise documents unofficially. They are leads, never sources. */
export const UNOFFICIAL_HOSTS = ['epsteinexposed.com', 'epstein-data.com', 'goyfiles', 'wikipedia.org', 'epsteinwiki', 'reddit.com', 'substack.com'];

export interface CitationInput {
  id?: string;
  title: string;
  publisher: string;
  author?: string;
  date?: string;
  url?: string;
  grade: string;
  topic?: string;
  note?: string;
}

const STOP = new Set(['the', 'a', 'an', 'of', 'and', 'for', 'on', 'in', 'to', 'at', 'by', 'with', 'from', 'about', 'regarding', 'concerning', 'report', 'letter', 'statement', 'new', 'how', 'what', 'why', 'is', 'are', 'was', 'its', 'his', 'her']);
const MINOR = new Set(['the', 'a', 'an', 'of', 'and', 'for', 'on', 'in', 'to', 'at', 'by', '&']);
const INSTITUTION = /\b(university|college|institute|school|department|office|court|senate|house|commission|committee|government|council)\b/i;

/** A short publisher token: "Harvard University, Office of the President" -> "harvard"; "The New York Times" -> "nyt". */
export function publisherToken(publisher: string): string {
  const first = publisher.split(/[,(]/)[0].replace(/^\s*the\s+/i, '').trim();
  const words = first.split(/\s+/).filter(Boolean);
  if (!words.length) return '';
  if (words.length === 1) return slugPart(words[0]);
  if (INSTITUTION.test(first)) {
    const named = words.find((w) => !INSTITUTION.test(w) && !MINOR.has(w.toLowerCase()));
    return slugPart(named ?? words[0]);
  }
  const sig = words.filter((w) => !MINOR.has(w.toLowerCase()));
  if (sig.length >= 2 && sig.length <= 4) return slugPart(sig.map((w) => w[0]).join(''));
  return slugPart(words[0]);
}

/** The first meaningful word of a title, used as the topic part of an id. */
export function topicToken(title: string): string {
  const words = slugPart(title).split('-').filter(Boolean);
  return words.find((w) => !STOP.has(w) && !/^\d+$/.test(w) && w.length > 2) ?? words[0] ?? '';
}

/** publisher-year-topic, lowercase and hyphenated, e.g. "nyt-2019-seed". */
export function suggestId(s: Pick<CitationInput, 'publisher' | 'date' | 'title'>, topicWord?: string): string {
  const parts = [publisherToken(s.publisher), (s.date ?? '').slice(0, 4).replace(/\D/g, ''), slugPart(topicWord ?? '') || topicToken(s.title)];
  return parts.filter(Boolean).join('-');
}

export const isSourceId = (id: string): boolean => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(id);

export interface CitationCheck { errors: string[]; warnings: string[] }

export function checkCitation(s: CitationInput): CitationCheck {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!s.title.trim()) errors.push('Enter the title.');
  if (!s.publisher.trim()) errors.push('Enter the publisher.');
  if (!isGrade(s.grade)) errors.push('Choose a grade.');
  if (s.id !== undefined && s.id.trim() && !isSourceId(s.id.trim())) errors.push('The id must be lowercase letters and numbers joined by single hyphens.');
  if (s.date?.trim() && !isIsoDate(s.date.trim())) errors.push('Write the date as YYYY, YYYY-MM or YYYY-MM-DD.');
  if (!s.date?.trim()) warnings.push('No date. Add the publication date at the precision the source supports.');
  if (s.url?.trim()) {
    let u: URL | undefined;
    try { u = new URL(s.url.trim()); } catch { /* handled below */ }
    if (!u || !/^https?:$/.test(u.protocol)) errors.push('The URL must start with https:// or http://.');
    else {
      if (u.protocol === 'http:') warnings.push('The URL uses http. Use the https address if there is one.');
      if (UNOFFICIAL_HOSTS.some((h) => u!.hostname.includes(h))) warnings.push(`${u.hostname} is an unofficial mirror or wiki. It is a lead, not a source: cite the original.`);
    }
  } else warnings.push('No URL. A source a reader cannot trace should say where the original can be found, in a note.');
  if (s.grade === 'B2') warnings.push('B2 material must be flagged in the text wherever it is used.');
  if (/'/.test(`${s.title}${s.publisher}${s.author ?? ''}`)) warnings.push('The text contains straight quotes or apostrophes. The site uses curly ones (’ “ ”) in prose.');
  return { errors, warnings };
}

const clean = (s?: string) => (s ?? '').trim();

/** The reference-list entry as the site prints it: grade, title, then author · publisher · date. */
export function referenceText(s: CitationInput): string {
  const meta = [clean(s.author), clean(s.publisher), formatDate(clean(s.date))].filter(Boolean).join(' · ');
  const title = clean(s.title).replace(/[.\s]+$/, '');
  return `${s.grade} ${title}. ${meta}.${clean(s.url) ? ` ${clean(s.url)}` : ''}`;
}

/** An entry for the `sources` object in src/data/sources.ts. New entries carry no `checked` date. */
export function sourceEntry(id: string, s: CitationInput): string {
  const fields: [string, string | undefined][] = [
    ['title', clean(s.title)],
    ['publisher', clean(s.publisher)],
    ['author', clean(s.author) || undefined],
    ['date', clean(s.date) || undefined],
    ['url', clean(s.url) || undefined],
  ];
  const lines = fields.filter(([, v]) => v).map(([k, v]) => `    ${k}: ${tsString(v!)},`);
  lines.push(`    grade: ${tsString(s.grade)},`);
  lines.push(`    topic: ${tsString(clean(s.topic) || 'Law and background')},`);
  if (clean(s.note)) lines.push(`    note: ${tsString(clean(s.note))},`);
  return `  ${tsString(id)}: {\n${lines.join('\n')}\n  },`;
}

export function bibtexEntry(id: string, s: CitationInput): string {
  return toBibtex(id, {
    title: clean(s.title), publisher: clean(s.publisher), author: clean(s.author) || undefined,
    date: clean(s.date) || undefined, url: clean(s.url) || undefined, grade: s.grade as Grade,
  });
}
