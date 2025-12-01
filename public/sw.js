// Service Worker - Unregister itself to fix issues
// This will clean up any problematic cached data

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Delete all caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => caches.delete(name))
      );
    }).then(() => {
      // Unregister this service worker
      return self.registration.unregister();
    })
  );
});
