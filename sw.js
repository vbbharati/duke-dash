const CACHE_NAME = 'duke-dash-v1';

// Resources to cache on initial installation
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet.offline@2.2.0/dist/leaflet.offline.min.js',
  'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;700;800&family=Inter:wght@400;600&display=swap'
];

// 1. Install Event: Cache app shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching offline dashboard shell');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Cache-first strategy with network fallback
self.addEventListener('fetch', (event) => {
  // Ignore tile fetch requests here (Leaflet.offline handles tiles via IndexedDB)
  if (event.request.url.includes('tile.openstreetmap.org')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Cache external fonts or stylesheets on demand
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          (event.request.url.startsWith('https://fonts.gstatic.com') ||
           event.request.url.startsWith('https://fonts.googleapis.com'))
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback to offline index if everything fails
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});