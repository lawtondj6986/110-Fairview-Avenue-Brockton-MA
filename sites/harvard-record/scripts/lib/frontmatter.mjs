/**
 * Minimal reader for the Markdown content files: splits YAML frontmatter from
 * the body and extracts the handful of scalar and list fields the checks need.
 * It is deliberately small; Astro's own loader does the authoritative parsing.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export function splitFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { raw: '', body: text, ok: false };
  return { raw: m[1], body: m[2], ok: true };
}

const unquote = (v) => v.trim().replace(/^"(.*)"$/s, '$1').replace(/^'(.*)'$/s, '$1').replace(/\\"/g, '"');

/** Reads `key: value` scalars and `key: [a, b]` inline lists. Block lists are returned as arrays of strings. */
export function readFields(raw) {
  const out = {};
  const lines = raw.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);
    if (!m) continue;
    const [, key, rest] = m;
    const v = rest.replace(/\s+#.*$/, '').trim();
    if (v.startsWith('[')) {
      out[key] = v.replace(/^\[|\]$/g, '').split(',').map(unquote).filter(Boolean);
    } else if (v === '') {
      const items = [];
      while (i + 1 < lines.length && /^\s+/.test(lines[i + 1])) {
        const item = lines[++i].match(/^\s*-\s*(.*)$/);
        if (item) items.push(unquote(item[1]));
      }
      out[key] = items;
    } else {
      out[key] = unquote(v);
    }
  }
  return out;
}

export function loadCollection(root, name) {
  const dir = join(root, 'src', 'content', name);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((file) => {
      const text = readFileSync(join(dir, file), 'utf8');
      const { raw, body, ok } = splitFrontmatter(text);
      return { collection: name, file, slug: file.replace(/\.md$/, ''), text, raw, body, ok, data: readFields(raw) };
    });
}

export const wordCount = (s) =>
  (s.replace(/```[\s\S]*?```/g, ' ').replace(/[#*_>`\-\[\]()|]/g, ' ').match(/\S+/g) ?? []).length;
