// Service Worker for SKLab Homepage
// Caches pages and assets for faster navigation

const CACHE_NAME = 'sklab-cache-v1';

// Pages to cache immediately on install
const PRECACHE_URLS = [
  '/sklab_homepage/',
  '/sklab_homepage/ja/',
  '/sklab_homepage/en/',
  '/sklab_homepage/ja/research',
  '/sklab_homepage/ja/members',
  '/sklab_homepage/ja/publications',
  '/sklab_homepage/ja/activity',
  '/sklab_homepage/ja/news',
  '/sklab_homepage/ja/visit',
  '/sklab_homepage/en/research',
  '/sklab_homepage/en/members',
  '/sklab_homepage/en/publications',
  '/sklab_homepage/en/activity',
  '/sklab_homepage/en/news',
  '/sklab_homepage/en/visit',
  '/sklab_homepage/lab_guidelines_insight.webp',
];

// Install: Cache core pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
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

// Fetch: Stale-while-revalidate strategy
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Only handle same-origin requests
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  // Skip non-page requests (let browser handle assets normally)
  const isPage = event.request.mode === 'navigate' || 
                 event.request.destination === 'document' ||
                 url.pathname.endsWith('/') ||
                 !url.pathname.includes('.');

  if (!isPage) return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        // Fetch from network in background
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          // Cache the new response
          if (networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Network failed, return cached or offline page
          return cachedResponse;
        });

        // Return cached response immediately, or wait for network
        return cachedResponse || fetchPromise;
      });
    })
  );
});
