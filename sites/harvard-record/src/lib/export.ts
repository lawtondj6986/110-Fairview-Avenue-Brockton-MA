/** Serialisers for the downloadable data files. Pure functions, unit-tested. */

export const csvCell = (v: unknown): string => {
  const s = v == null ? '' : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export const toCsv = (header: string[], rows: unknown[][]): string =>
  [header, ...rows].map((r) => r.map(csvCell).join(',')).join('\r\n') + '\r\n';

export const xmlEscape = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

/** Escape the characters BibTeX treats specially. */
export const bibEscape = (s: string): string => s.replace(/([&%$#_{}])/g, '\\$1');

export interface BibSource { title: string; publisher: string; author?: string; date?: string; url?: string; grade: string }

export function toBibtex(id: string, s: BibSource): string {
  const year = s.date?.slice(0, 4);
  const fields: [string, string | undefined][] = [
    ['title', `{${bibEscape(s.title)}}`],
    ['author', s.author ? bibEscape(s.author.replace(/, (?=[^,]+ and )/g, ' and ').replace(/, /g, ' and ')) : undefined],
    ['organization', bibEscape(s.publisher)],
    ['year', year],
    ['url', s.url],
    ['note', `Reliability grade ${s.grade}`],
  ];
  const body = fields.filter(([, v]) => v).map(([k, v]) => `  ${k} = {${v}}`).join(',\n');
  return `@misc{${id},\n${body}\n}`;
}

/** RFC 822 date for RSS, from an ISO date (UTC midnight). */
export const rssDate = (iso: string): string => new Date(`${iso}T00:00:00Z`).toUTCString();
