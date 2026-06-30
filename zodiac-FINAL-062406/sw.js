/* Zodiac Fighters - service worker (offline + instalable)
   v3: network-first para que SIEMPRE se vean los cambios al subir; cae a caché si no hay red. */
const CACHE = 'zf-v3';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))   // borra cachés viejos
    )).then(() => self.clients.claim())
  );
});

/* network-first: intenta la red (versión fresca); si falla, usa caché. */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(c => { try { c.put(e.request, copy); } catch (_) {} });
      return resp;
    }).catch(() => caches.match(e.request))
  );
});
