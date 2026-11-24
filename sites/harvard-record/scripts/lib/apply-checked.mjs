/**
 * Text edits for recording verification results in the data files.
 * These work on the source text of src/data/sources.ts and src/data/claims.ts
 * so that comments, ordering and formatting are preserved. Pure functions,
 * unit-tested; each throws if the entry cannot be found unambiguously.
 */

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const tsString = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

/** Locates the `'id': { ... },` block of one source. Returns [start, end) offsets. */
export function findSourceBlock(text, id) {
  const re = new RegExp(`^  '${escapeRe(id)}': \\{\\n`, 'm');
  const m = re.exec(text);
  if (!m) throw new Error(`Source "${id}" not found in the register.`);
  const end = text.indexOf('\n  },', m.index);
  if (end === -1) throw new Error(`Source "${id}": end of entry not found.`);
  return [m.index, end + '\n  },'.length];
}

/** Sets or replaces `checked: 'YYYY-MM-DD'` on a source. */
export function setSourceChecked(text, id, date) {
  if (!ISO_DAY.test(date)) throw new Error(`Bad date "${date}" for source "${id}".`);
  const [a, b] = findSourceBlock(text, id);
  let block = text.slice(a, b);
  if (/^\s*checked: '[^']*',\n/m.test(block)) {
    block = block.replace(/^(\s*)checked: '[^']*',\n/m, `$1checked: '${date}',\n`);
  } else {
    block = block.replace(/\n  \},$/, `\n    checked: '${date}',\n  },`);
  }
  return text.slice(0, a) + block + text.slice(b);
}

/** Replaces the `url` of a source (used when the original has moved). */
export function setSourceUrl(text, id, url) {
  if (!/^https:\/\/\S+$/.test(url)) throw new Error(`Source "${id}": new URL must be https.`);
  const [a, b] = findSourceBlock(text, id);
  let block = text.slice(a, b);
  if (/^\s*url: '[^']*',\n/m.test(block)) {
    block = block.replace(/^(\s*)url: '[^']*',\n/m, (_m, indent) => `${indent}url: ${tsString(url)},\n`);
  } else {
    block = block.replace(/^(\s*)grade: /m, (_m, indent) => `${indent}url: ${tsString(url)},\n${indent}grade: `);
  }
  return text.slice(0, a) + block + text.slice(b);
}

/** Locates the `{ id: 'X-00', ... },` block of one claim. Returns [start, end) offsets. */
export function findClaimBlock(text, id) {
  const marker = `    id: '${id}',`;
  const at = text.indexOf(marker);
  if (at === -1) throw new Error(`Claim "${id}" not found in the ledger.`);
  if (text.indexOf(marker, at + 1) !== -1) throw new Error(`Claim "${id}" appears more than once.`);
  const start = text.lastIndexOf('\n  {\n', at) + 1;
  const end = text.indexOf('\n  },', at);
  if (start === 0 || end === -1) throw new Error(`Claim "${id}": entry boundaries not found.`);
  return [start, end + '\n  },'.length];
}

/** Sets or replaces `checked: 'YYYY-MM-DD'` on a ledger claim. */
export function setClaimChecked(text, id, date) {
  if (!ISO_DAY.test(date)) throw new Error(`Bad date "${date}" for claim "${id}".`);
  const [a, b] = findClaimBlock(text, id);
  let block = text.slice(a, b);
  if (/^\s*checked: '[^']*',\n/m.test(block)) {
    block = block.replace(/^(\s*)checked: '[^']*',\n/m, `$1checked: '${date}',\n`);
  } else {
    block = block.replace(/\n  \},$/, `\n    checked: '${date}',\n  },`);
  }
  return text.slice(0, a) + block + text.slice(b);
}

/**
 * Decides what a set of console results allows.
 * A source is "checked" only if every item recorded for it is confirmed and
 * none is missing. A claim is "checked" only if it was confirmed under every
 * one of its sources and all of those sources are checked (now or already).
 */
export function decide(results, { sources, claims, expected }) {
  const sourceOk = {};
  const problems = [];
  for (const [id, r] of Object.entries(results.sources ?? {})) {
    if (!(id in sources)) { problems.push({ source: id, note: 'Unknown source id in results; ignored.' }); continue; }
    const want = expected[id] ?? [];
    const got = r.items ?? {};
    const missing = want.filter((k) => !got[k] || got[k].status === 'open');
    const changes = want.filter((k) => got[k]?.status === 'change');
    for (const k of changes) problems.push({ source: id, item: k, note: got[k].note || '(no note given)' });
    const stale = Object.keys(got).filter((k) => !want.includes(k));
    if (stale.length) problems.push({ source: id, note: `${stale.length} saved answer(s) refer to statements that have since changed; re-check them.` });
    sourceOk[id] = !missing.length && !changes.length && r.linkOk === true;
    if (!sourceOk[id] && !missing.length && !changes.length && r.linkOk !== true) problems.push({ source: id, note: 'All statements confirmed but the link was not marked as opening the publisher’s own copy.' });
  }
  const checkedSources = Object.keys(sourceOk).filter((id) => sourceOk[id]);
  const isChecked = (id) => sourceOk[id] === true || Boolean(sources[id]?.checked);
  const checkedClaims = claims
    .filter((c) => !c.checked && c.sources.every(isChecked))
    .filter((c) => c.sources.every((id) => sources[id]?.checked || results.sources?.[id]?.items?.[c.id]?.status === 'ok'))
    .map((c) => c.id);
  return { checkedSources, checkedClaims, problems };
}
