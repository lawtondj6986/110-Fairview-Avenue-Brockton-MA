/**
 * rehype-glossary — the Glossary teaches while people read.
 *
 * At build time, the first mention of any glossary term inside markdown body
 * text (articles, case studies, glossary entries) becomes a link to that
 * term's page, with the one-line definition as the hover title. Hundreds of
 * contextual internal links, zero authoring, and it can never link to a term
 * that does not exist because the dictionary is read from the same files
 * that produce the pages.
 *
 * Rules: body text only (no headings, links, code, or blockquote attribution),
 * first occurrence per term per document, at most MAX_LINKS per document,
 * never a term linking to itself, longest alias wins.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';

const GLOSSARY_DIR = new URL('../src/content/glossary/', import.meta.url);
const MAX_LINKS = 12;
const SKIP_PARENTS = new Set(['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'figcaption', 'cite', 'strong']);

function unquote(s) {
  const t = s.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    try {
      return JSON.parse(t.startsWith("'") ? '"' + t.slice(1, -1).replace(/"/g, '\\"') + '"' : t);
    } catch {
      return t.slice(1, -1);
    }
  }
  return t;
}

/** Build the alias table once per build. */
function loadDictionary() {
  const dir = GLOSSARY_DIR.pathname;
  const entries = [];
  let files = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
  } catch {
    return { entries: [], pattern: null };
  }
  for (const f of files) {
    const src = readFileSync(join(dir, f), 'utf8');
    const term = unquote(src.match(/^term:\s*(.+)$/m)?.[1] ?? '');
    const short = unquote(src.match(/^short:\s*(.+)$/m)?.[1] ?? '');
    if (!term) continue;
    const slug = f.replace(/\.md$/, '');
    const aliases = new Set();
    // "Cap rate (capitalization rate)" → "cap rate", "capitalization rate"
    const main = term.replace(/\s*\(.*?\)\s*$/, '').trim();
    const paren = term.match(/\((.*?)\)\s*$/)?.[1];
    for (const a of [main, paren]) {
      if (!a) continue;
      // Drop clarifying suffixes like "(for findings)" or "(of lease)" and split "A vs. B" / "A and B" style terms
      const cleaned = a.replace(/^(the|a)\s+/i, '').trim();
      if (cleaned.length >= 3 && !/^(of|for)\b/i.test(cleaned)) aliases.add(cleaned);
    }
    entries.push({ slug, term, short, aliases: Array.from(aliases) });
  }
  // Longest alias first so "net effective rent" beats "rent escalation" overlaps sensibly.
  const flat = [];
  for (const e of entries) for (const a of e.aliases) flat.push({ alias: a, entry: e });
  flat.sort((x, y) => y.alias.length - x.alias.length);
  const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
  const pattern = flat.length ? new RegExp(`(?<![\\w-])(${flat.map((x) => escape(x.alias) + '(?:s|es)?').join('|')})(?![\\w-])`, 'gi') : null;
  const byAlias = new Map(flat.map((x) => [x.alias.toLowerCase().replace(/\s+/g, ' '), x.entry]));
  return { entries, pattern, byAlias };
}

const DICT = loadDictionary();

function lookup(matched) {
  let key = matched.toLowerCase().replace(/\s+/g, ' ');
  if (DICT.byAlias.has(key)) return DICT.byAlias.get(key);
  for (const suffix of ['es', 's']) {
    if (key.endsWith(suffix) && DICT.byAlias.has(key.slice(0, -suffix.length))) return DICT.byAlias.get(key.slice(0, -suffix.length));
  }
  return null;
}

export default function rehypeGlossary() {
  return (tree, file) => {
    if (!DICT.pattern) return;
    const path = String(file?.path || file?.history?.[0] || '');
    const selfSlug = path.includes('/content/glossary/') ? basename(path).replace(/\.md$/, '') : null;
    const linked = new Set();
    let count = 0;

    const walk = (node, parentTag, insideSkip) => {
      if (!node || count >= MAX_LINKS) return;
      if (node.type === 'element') {
        const skip = insideSkip || SKIP_PARENTS.has(node.tagName);
        const children = node.children || [];
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child.type === 'text' && !skip && (parentTag === 'p' || parentTag === 'li' || node.tagName === 'p' || node.tagName === 'li' || node.tagName === 'td' || node.tagName === 'em')) {
            const replaced = linkText(child.value);
            if (replaced) {
              children.splice(i, 1, ...replaced);
              i += replaced.length - 1;
            }
          } else {
            walk(child, node.tagName, skip);
          }
        }
      } else if (node.type === 'root') {
        for (const child of node.children || []) walk(child, 'root', false);
      }
    };

    const linkText = (text) => {
      if (!text || count >= MAX_LINKS) return null;
      DICT.pattern.lastIndex = 0;
      const out = [];
      let last = 0;
      let changed = false;
      let m;
      while ((m = DICT.pattern.exec(text)) !== null) {
        const entry = lookup(m[1]);
        if (!entry || entry.slug === selfSlug || linked.has(entry.slug)) continue;
        if (count >= MAX_LINKS) break;
        linked.add(entry.slug);
        count++;
        changed = true;
        if (m.index > last) out.push({ type: 'text', value: text.slice(last, m.index) });
        out.push({
          type: 'element',
          tagName: 'a',
          properties: { href: `/glossary/${entry.slug}/`, className: ['gl'], title: entry.short, 'data-term': entry.term },
          children: [{ type: 'text', value: m[1] }],
        });
        last = m.index + m[1].length;
      }
      if (!changed) return null;
      if (last < text.length) out.push({ type: 'text', value: text.slice(last) });
      return out;
    };

    walk(tree, 'root', false);
  };
}
