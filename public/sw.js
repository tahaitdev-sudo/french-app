/* Service worker — fonctionnement hors ligne + notifications de rappel */

const VERSION = 'v1';
const CACHE = `parlons-francais-${VERSION}`;

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

// La page envoie la liste des routes à mettre en cache pour le mode hors ligne.
self.addEventListener('message', (event) => {
  if (event.data?.type !== 'CACHE_URLS') return;
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await Promise.all(
        event.data.urls.map(async (url) => {
          try {
            const res = await fetch(url, { credentials: 'same-origin' });
            if (res.ok) await cache.put(url, res);
          } catch {
            /* hors ligne ou erreur réseau : on ignore */
          }
        }),
      );
    })(),
  );
});

const isStaticAsset = (url) =>
  url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/icons/');

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Pages : réseau d'abord, cache en secours
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(request);
          if (res.ok) {
            const cache = await caches.open(CACHE);
            cache.put(url.pathname, res.clone());
          }
          return res;
        } catch {
          const cached = await caches.match(url.pathname);
          return (
            cached ||
            new Response('أنت غير متصل بالإنترنت ولم تُحفظ هذه الصفحة بعد.', {
              status: 503,
              headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            })
          );
        }
      })(),
    );
    return;
  }

  // Fichiers statiques (hachés par Next.js) : cache d'abord
  if (isStaticAsset(url)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        const res = await fetch(request);
        if (res.ok) {
          const cache = await caches.open(CACHE);
          cache.put(request, res.clone());
        }
        return res;
      })(),
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    (async () => {
      const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      const open = all.find((c) => 'focus' in c);
      if (open) return open.focus();
      return self.clients.openWindow('/');
    })(),
  );
});
