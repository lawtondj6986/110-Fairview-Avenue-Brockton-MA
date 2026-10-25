/* Meridian service worker — keeps the emergency guide available offline. Hand-written, no deps. */
const VERSION = 'v1';
const CACHE = `meridian-${VERSION}`;
const LOCALES = ['ht', 'pt', 'kea', 'es', 'en'];

async function precache() {
  const cache = await caches.open(CACHE);
  const assets = new Set(['/icon.svg', '/manifest.webmanifest']);
  // Cache each emergency page plus the CSS/JS it needs, so it renders fully offline.
  await Promise.allSettled(
    LOCALES.map(async (l) => {
      const url = `/${l}/emergency`;
      const response = await fetch(url, { credentials: 'same-origin' });
      if (!response.ok) return;
      const html = await response.clone().text();
      await cache.put(url, response);
      for (const m of html.matchAll(/\/_next\/static\/[^"'\s)]+/g)) assets.add(m[0]);
    }),
  );
  await Promise.allSettled([...assets].map((a) => cache.add(a)));
}

self.addEventListener('install', (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('meridian-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

function preferredEmergency(url) {
  const locale = url.pathname.split('/')[1];
  return `/${LOCALES.includes(locale) ? locale : 'en'}/emergency`;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;

  // Pages: network first; offline → cached copy → emergency guide in the same language.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok && /\/emergency$/.test(url.pathname)) {
            const copy = response.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
          }
          return response;
        })
        .catch(async () => (await caches.match(request)) || (await caches.match(preferredEmergency(url))) || Response.error()),
    );
    return;
  }

  // Immutable build assets: cache first, so cached pages render with their CSS/JS offline.
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(CACHE).then((c) => c.put(request, copy));
            }
            return response;
          }),
      ),
    );
  }
});
