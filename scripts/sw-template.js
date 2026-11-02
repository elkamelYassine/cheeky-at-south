// Service worker: makes the trip site work offline (there is little signal in the desert).
// Built by scripts/sw.mjs into dist/sw.js, which fills in the version and the precache list.
const VERSION = '__VERSION__';
const SHELL = `shell-${VERSION}`;   // the page, scripts, styles, icons, photo thumbnails
const MEDIA = 'media-v1';           // full-size photos opened in the lightbox
const TILES = 'tiles-v1';           // map tiles you have looked at
const FONTS = 'fonts-v1';
const PRECACHE = __PRECACHE__;
const MAX_TILES = 2500;

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(SHELL).then(async (c) => {
      // the page and code first (must succeed), then thumbnails (best effort)
      const core = PRECACHE.filter((u) => !u.startsWith('/img/'));
      await c.addAll(core);
      await Promise.allSettled(PRECACHE.filter((u) => u.startsWith('/img/')).map((u) => c.add(u)));
    }),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('shell-') && k !== SHELL).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const trim = async (name, max) => {
  const c = await caches.open(name);
  const keys = await c.keys();
  for (let i = 0; i < keys.length - max; i++) await c.delete(keys[i]);
};

// cache first, then network (and remember it)
const cacheFirst = async (req, name, max) => {
  const hit = await caches.match(req, { ignoreVary: true });
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res.ok || res.type === 'opaque') {
      const c = await caches.open(name);
      c.put(req, res.clone());
      if (max) trim(name, max);
    }
    return res;
  } catch {
    return hit || Response.error();
  }
};

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // the page: network first so updates show up, saved copy when offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL).then((c) => c.put('/', copy));
          return res;
        })
        .catch(() => caches.match('/', { ignoreSearch: true, ignoreVary: true })),
    );
    return;
  }

  if (url.origin === location.origin) {
    if (url.pathname.startsWith('/img/')) { e.respondWith(cacheFirst(req, MEDIA)); return; }
    e.respondWith(caches.match(req, { ignoreSearch: true, ignoreVary: true }).then((hit) => hit || fetch(req)));
    return;
  }
  if (url.hostname === 'server.arcgisonline.com') { e.respondWith(cacheFirst(req, TILES, MAX_TILES)); return; }
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') { e.respondWith(cacheFirst(req, FONTS)); return; }
});
