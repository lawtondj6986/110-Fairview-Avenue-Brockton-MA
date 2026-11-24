/**
 * Links the first mention of each glossary term in a page's HTML to its
 * definition. Pure string processing so it can be unit-tested without a build.
 *
 * Rules:
 *  - Only text nodes are touched, never tags or attribute values.
 *  - Text inside links, headings, citations, code, quotations, summaries,
 *    captions and the stat strips is left alone.
 *  - Each term is linked once per page, at its first eligible mention.
 *  - Longer forms win over shorter ones ("exome sequencing" before "exome").
 *  - Single-word terms are linked only if listed in SINGLE_WORD_OK, because
 *    words such as "gift" or "dean" are too common to be worth a link.
 *  - A capitalised match followed by another capitalised word is treated as
 *    part of a proper name ("Personal Genome Project") and not linked.
 */

export interface GlossaryTerm {
  id: string;
  term: string;
  short: string;
  aliases?: string[];
}

export interface LinkResult {
  html: string;
  linked: string[]; // term ids, in order of first link
}

/** Single words worth linking on first mention. Matched case-insensitively. */
export const SINGLE_WORD_OK = new Set([
  'gina', 'ferpa', 'hipaa', 'crispr', 'exome', 'fibroblast', 'eugenics', 'biobank', 'endowment',
]);

/** Elements whose text is never linked. */
const SKIP = new Set(['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'sup', 'code', 'pre', 'script', 'style', 'blockquote', 'summary', 'caption', 'button', 'label', 'time', 'dt', 'th', 'title']);
/** Elements that are skipped when they carry one of these classes. */
const SKIP_CLASSES = ['figures', 'grade', 'state', 'meta', 'eyebrow', 'refs', 'callout-title', 'tl-tags'];

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * The surface forms a term can take in running text.
 * "Capacity rating" -> ["capacity rating"]; "Office for Civil Rights (Education)" -> ["office for civil rights"].
 * Forms that read as definitions rather than phrases ("X versus Y", "A, B and C") are dropped.
 */
export function surfaceForms(t: GlossaryTerm): string[] {
  const raw = [t.term, ...(t.aliases ?? [])];
  const out = new Set<string>();
  for (const r of raw) {
    const base = r.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
    if (!base || !/^[A-Za-z0-9]/.test(base)) continue;
    if (/\bversus\b|,/.test(base)) continue;
    if (/ and /i.test(base) && base.split(' ').length > 3) continue;
    const words = base.split(' ');
    if (words.length === 1 && !SINGLE_WORD_OK.has(base.toLowerCase())) continue;
    if (base.length < 4) continue;
    out.add(base.toLowerCase());
  }
  return [...out];
}

export function linkTerms(html: string, terms: GlossaryTerm[], opts: { base?: string; exclude?: string[] } = {}): LinkResult {
  const base = opts.base ?? '/glossary/';
  const exclude = new Set(opts.exclude ?? []);

  // Map each surface form to its term; the first term to claim a form keeps it.
  const byForm = new Map<string, GlossaryTerm>();
  for (const t of terms) {
    if (exclude.has(t.id)) continue;
    for (const f of surfaceForms(t)) if (!byForm.has(f)) byForm.set(f, t);
  }
  if (!byForm.size) return { html, linked: [] };

  const forms = [...byForm.keys()].sort((a, b) => b.length - a.length);
  // Allow a plural "s" on the last word; require word boundaries (hyphens count as part of a word).
  const re = new RegExp(`(?<![A-Za-z0-9-])(${forms.map(escapeRe).join('|')})(s)?(?![A-Za-z0-9-])`, 'gi');

  const used = new Set<string>();
  const linked: string[] = [];
  const stack: boolean[] = []; // true when this element (or an ancestor) is skipped
  const skipping = () => stack.length > 0 && stack[stack.length - 1];

  const out = html.replace(/(<[^>]+>)|([^<]+)/g, (_m, tag: string | undefined, text: string | undefined) => {
    if (tag) {
      const m = tag.match(/^<\/?\s*([a-zA-Z0-9]+)/);
      if (!m || tag.startsWith('<!')) return tag;
      const name = m[1].toLowerCase();
      const voidEl = /\/>$/.test(tag) || ['br', 'hr', 'img', 'input', 'meta', 'link', 'wbr', 'source', 'area', 'col'].includes(name);
      if (tag.startsWith('</')) {
        if (!voidEl) stack.pop();
      } else if (!voidEl) {
        const cls = tag.match(/\sclass="([^"]*)"/)?.[1].split(/\s+/) ?? [];
        stack.push(skipping() || SKIP.has(name) || cls.some((c) => SKIP_CLASSES.includes(c)));
      }
      return tag;
    }
    if (!text || skipping() || !/[A-Za-z]/.test(text)) return text ?? '';
    return text.replace(re, (match: string, form: string, _s: string, offset: number, whole: string) => {
      const t = byForm.get(form.toLowerCase());
      if (!t || used.has(t.id)) return match;
      if (/^[A-Z]/.test(match) && /^\s+[A-Z][a-z]/.test(whole.slice(offset + match.length))) return match;
      used.add(t.id);
      linked.push(t.id);
      return `<a class="term" href="${base}${t.id}/" title="${escapeAttr(t.short)}">${match}</a>`;
    });
  });

  return { html: out, linked };
}
