// Service Worker for SKLab Homepage
// Caches pages and assets for faster navigation

const CACHE_NAME = 'sklab-cache-v1';

// Assets to cache (not pages, to avoid redirect issues)
const PRECACHE_URLS = [
  '/sklab_homepage/lab_guidelines_insight.webp',
  '/sklab_homepage/images/members/sakata.webp',
  '/sklab_homepage/images/members/mori.webp',
  '/sklab_homepage/images/members/asatani.webp',
  '/sklab_homepage/images/members/nishimoto.webp',
];

// Install: Cache assets only
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch(() => {
        // Ignore errors for missing files
      });
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch: Cache-first for assets, network-first for pages
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  
  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  // Skip navigation requests entirely (let browser handle pages normally)
  // This avoids Safari's redirect issues
  if (event.request.mode === 'navigate') return;

  // Only cache static assets (images, CSS, JS)
  const isAsset = /\.(webp|png|jpg|jpeg|svg|css|js|woff2?)$/i.test(url.pathname);
  if (!isAsset) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        // Cache successful responses
        if (networkResponse.ok) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      });
    })
  );
});
