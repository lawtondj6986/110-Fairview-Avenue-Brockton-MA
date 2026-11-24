/**
 * Finds every statement on the site that cites each source: sentences in page
 * files, timeline events and comparison cells. Shared by the worksheet
 * generator and the verification console.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const stripMarkup = (s) => s
  .replace(/<Cite[^>]*\/>/g, '')
  .replace(/<(State|Grade)[^>]*\/>/g, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\{[^{}]*\}/g, ' ')
  .replace(/&[a-z]+;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

/** Statements in one page file's body, keyed by the source ids they cite. */
export function usesInPage(body, page) {
  const out = [];
  // Split into blocks at the elements that hold a complete statement.
  for (const block of body.split(/(?=<(?:p|li|tr|blockquote)\b)/)) {
    const ids = [...block.matchAll(/<Cite\s+id="([^"]+)"/g)].map((m) => m[1]);
    if (!ids.length) continue;
    const end = block.search(/<\/(?:p|li|tr|blockquote)>/);
    const text = stripMarkup(end > 0 ? block.slice(0, end) : block);
    for (const id of new Set(ids)) out.push({ id, where: page, text });
  }
  return out;
}

/** Returns { sourceId: [{ where, text }] } for the whole site. */
export function collectUses(root, { ped, hms, comparison }) {
  const uses = {};
  const push = (id, where, text) => {
    uses[id] ??= [];
    if (text && !uses[id].some((u) => u.text === text)) uses[id].push({ where, text });
  };
  const pagesDir = join(root, 'src', 'pages');
  for (const f of readdirSync(pagesDir).filter((f) => f.endsWith('.astro'))) {
    const body = readFileSync(join(pagesDir, f), 'utf8').replace(/^---[\s\S]*?---/, '');
    const page = f === 'index.astro' ? '/' : `/${f.replace('.astro', '')}/`;
    for (const u of usesInPage(body, page)) push(u.id, u.where, u.text);
  }
  for (const [events, page] of [[ped, '/program-for-evolutionary-dynamics/'], [hms, '/harvard-medical-school/']]) {
    for (const e of events) for (const c of e.cites) push(c.id, `${page} (Timeline: ${e.date})`, `${e.title}. ${stripMarkup(e.body)}`);
  }
  for (const row of comparison.rows) {
    row.cells.forEach((cell, i) => cell.cites.forEach((id) => push(id, `/comparison/ (${row.element}; ${comparison.columns[i].split(':')[0]})`, stripMarkup(cell.text))));
  }
  return uses;
}

/** Stable short key for a statement, so saved answers survive regeneration while the text is unchanged. */
export function statementKey(text) {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0;
  return 's' + h.toString(36);
}
