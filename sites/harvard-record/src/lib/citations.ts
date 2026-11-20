/**
 * Citation processing, kept free of framework imports so it can be unit-tested.
 *
 * Input is rendered page HTML containing empty markers:
 *   <sup data-cite="source-id" data-loc="p. 4"></sup>
 * or, in Markdown content, the token [@source-id] or [@source-id, p. 4].
 *
 * Output numbers each source in order of first appearance and returns what the
 * layout needs to print the reference list and the on-page contents.
 */
export interface CitableSource { title: string; grade: string }

export interface Processed {
  html: string;
  /** Source ids in order of first citation. */
  order: string[];
  /** How many times each source is cited on the page. */
  uses: Record<string, number>;
  headings: { id: string; text: string }[];
}

export const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const MARKER = /<sup\b[^>]*\bdata-cite="([^"]+)"[^>]*><\/sup>/g;
const TOKEN = /\[@([a-z0-9][a-z0-9-]*)(?:,\s*([^\]]+))?\]/g;
const H2 = /<h2\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g;

export function processCitations(
  input: string,
  sources: Record<string, CitableSource>,
  where = 'this page',
): Processed {
  const order: string[] = [];
  const uses: Record<string, number> = {};

  const render = (id: string, loc?: string) => {
    const src = sources[id];
    if (!src) throw new Error(`Unknown source id "${id}" cited on ${where}. Add it to src/data/sources.ts.`);
    if (!order.includes(id)) order.push(id);
    const n = order.indexOf(id) + 1;
    uses[id] = (uses[id] ?? 0) + 1;
    const label = escapeHtml(`Source ${n}: ${src.title}${loc ? ', ' + loc : ''}. Grade ${src.grade}.`);
    const hidden = loc ? `<span class="visually-hidden">, ${escapeHtml(loc)}</span>` : '';
    return `<sup class="cite"><a href="#ref-${n}" id="cite-${n}-${uses[id]}" title="${label}" aria-label="${label}">${n}${hidden}</a></sup>`;
  };

  // One pass over both syntaxes so numbering follows reading order.
  const both = new RegExp(`${MARKER.source}|${TOKEN.source}`, 'g');
  const html = input.replace(both, (tag, markerId, tokenId, tokenLoc) => {
    if (markerId) return render(markerId, tag.match(/data-loc="([^"]*)"/)?.[1]);
    return render(tokenId, tokenLoc?.trim());
  });

  const headings = [...html.matchAll(H2)].map((m) => ({
    id: m[1],
    text: m[2].replace(/<sup[\s\S]*?<\/sup>/g, '').replace(/<[^>]+>/g, '').trim(),
  }));

  return { html, order, uses, headings };
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** Formats YYYY, YYYY-MM or YYYY-MM-DD as "2026", "May 2026" or "1 May 2026". */
export function formatDate(iso?: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  if (!y) return '';
  if (d) return `${d} ${MONTHS[m - 1]} ${y}`;
  if (m) return `${MONTHS[m - 1]} ${y}`;
  return String(y);
}

/** Lowercase, hyphenated slug for headings and anchors. */
export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
