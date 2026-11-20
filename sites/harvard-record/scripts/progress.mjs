#!/usr/bin/env node
/**
 * Reports lines added to this project since a baseline commit, excluding the
 * lockfile, counting both committed and uncommitted work. Used for the daily
 * progress report in docs/progress/.
 *
 *   node scripts/progress.mjs [baseline-commit] [target]
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const baseline = process.argv[2] ?? 'ae97f63';
const target = Number(process.argv[3] ?? 20000);
const git = (...a) => execFileSync('git', a, { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const skip = (f) => f.endsWith('package-lock.json');

const groups = {};
let added = 0, removed = 0;
const tally = (file, a, r) => {
  if (skip(file)) return;
  added += a; removed += r;
  const rel = file.replace(/^sites\/harvard-record\//, '');
  const key = rel.startsWith('src/content/') ? rel.split('/').slice(0, 3).join('/')
    : rel.startsWith('src/') ? rel.split('/').slice(0, 2).join('/')
    : rel.split('/')[0];
  groups[key] = (groups[key] ?? 0) + a;
};

// Tracked changes since the baseline (committed or not).
for (const line of git('diff', '--numstat', baseline, '--', '.').trim().split('\n').filter(Boolean)) {
  const [a, r, file] = line.split('\t');
  if (a !== '-') tally(file, Number(a), Number(r));
}
// Files not yet added to git.
for (const file of git('ls-files', '--others', '--exclude-standard', '--', '.').trim().split('\n').filter(Boolean)) {
  tally(file, readFileSync(join(root, file), 'utf8').split('\n').length, 0);
}

console.log(`Lines added since ${baseline} (excluding lockfile): ${added.toLocaleString()}   removed: ${removed.toLocaleString()}`);
console.log(`Target: +${target.toLocaleString()}   Progress: ${Math.round((added / target) * 100)}%   Remaining: ${Math.max(0, target - added).toLocaleString()}\n`);
for (const [k, v] of Object.entries(groups).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(7)}  ${k}`);
