const CACHE_NAME = 'moon-phases-pro-v1';
const urlsToCache = [
  '/',
  '/Index.html',
  '/manifest.json',
  '/lroc_color_poles_1k.jpg',
  '/ldem_3_8bit.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
