/**
 * PWA bits written after the static build:
 *  - dist/sw.js               the service worker, stamped with a build version
 *  - dist/offline-sheets.json  every market sheet URL, so "save for offline" knows the list
 *
 * Caching policy (kept deliberately simple):
 *  - navigations: network first, cached copy if offline, /offline/ if nothing cached
 *  - hashed assets under /_astro/: cache first (they never change at a URL)
 *  - images, icons, fonts: stale-while-revalidate
 *  - old caches are deleted on activate, keyed by the build version
 */
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

export function generatePwa(distDir) {
  const version = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  const sheets = walk(distDir)
    .filter((p) => p.endsWith(`${join('sheet', 'index.html')}`))
    .map((p) => '/' + relative(distDir, p).replace(/index\.html$/, '').split('\\').join('/'))
    .sort();
  writeFileSync(join(distDir, 'offline-sheets.json'), JSON.stringify({ version, sheets }));

  const sw = `/* ICS service worker · build ${version} */
const VERSION = '${version}';
const PAGES = 'ics-pages-' + VERSION;
const ASSETS = 'ics-assets-' + VERSION;
const OFFLINE = '/offline/';
const PRECACHE = [OFFLINE, '/manifest.webmanifest', '/favicon.svg', '/icons/icon-192.png', '/icons/icon-512.png', '/market-sheets/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PAGES).then((c) => c.addAll(PRECACHE).catch(() => undefined)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('ics-') && !k.endsWith(VERSION)).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

const isHtml = (req) => req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (isHtml(req)) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(PAGES).then((c) => c.put(stripSearch(req), copy));
          }
          return res;
        })
        .catch(async () => (await caches.match(stripSearch(req))) || (await caches.match(OFFLINE)) || Response.error())
    );
    return;
  }

  if (url.pathname.startsWith('/_astro/')) {
    event.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => cachePut(ASSETS, req, res))));
    return;
  }

  if (/^\\/(images|icons|og)\\//.test(url.pathname) || /\\.(woff2?|svg|png|jpe?g|webp|json)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then((hit) => {
        const net = fetch(req).then((res) => cachePut(ASSETS, req, res)).catch(() => hit);
        return hit || net;
      })
    );
  }
});

function stripSearch(req) {
  const u = new URL(req.url);
  u.search = '';
  return new Request(u.toString(), { headers: req.headers });
}

function cachePut(name, req, res) {
  if (res && res.ok) {
    const copy = res.clone();
    caches.open(name).then((c) => c.put(req, copy));
  }
  return res;
}

// "Save the sheets for offline": fetch every sheet page and the assets it references.
self.addEventListener('message', async (event) => {
  const data = event.data || {};
  if (data.type !== 'cache-sheets') return;
  const client = event.source;
  const say = (msg) => client && client.postMessage({ type: 'cache-sheets', ...msg });
  try {
    const list = await (await fetch('/offline-sheets.json', { cache: 'no-store' })).json();
    const pages = await caches.open(PAGES);
    const assets = await caches.open(ASSETS);
    const seen = new Set();
    let done = 0;
    for (const path of list.sheets) {
      try {
        const res = await fetch(path, { cache: 'no-store' });
        if (res.ok) {
          const html = await res.clone().text();
          await pages.put(path, res);
          const refs = Array.from(html.matchAll(/(?:href|src)="(\\/(?:_astro|images|icons)\\/[^"]+)"/g)).map((m) => m[1]);
          for (const ref of refs) {
            if (seen.has(ref)) continue;
            seen.add(ref);
            if (!(await assets.match(ref))) {
              try {
                const r = await fetch(ref);
                if (r.ok) await assets.put(ref, r);
              } catch { /* skip */ }
            }
          }
        }
      } catch { /* skip this sheet */ }
      done++;
      if (done % 5 === 0 || done === list.sheets.length) say({ done, total: list.sheets.length });
    }
    say({ complete: true, done, total: list.sheets.length });
  } catch (e) {
    say({ error: String(e && e.message ? e.message : e) });
  }
});
`;
  writeFileSync(join(distDir, 'sw.js'), sw);
  return { version, sheets: sheets.length };
}
