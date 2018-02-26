
var cacheName = '20180226a';

// index.html should be only used when offline, in order to have latest content always shown.
var cacheFilesFirst = [
  // '/index.html',
  '/favicon.ico',
  '/assets/default.css',
  '/assets/ohjaaja-jukka.jpg',
  '/assets/ohjaaja-kari.jpg',
  '/assets/ohjaaja-kimmo.jpg',
  '/assets/rkhsk-logo.png',
  '/assets/rkhsk-nunchaku-754.png',
  '/assets/yuishinkai-logo.png'
];
var cacheFilesSoon = [
  '/assets/ohjaaja-jukka-300.jpg',
  '/assets/ohjaaja-kari-300.jpg',
  '/assets/ohjaaja-kimmo-300.jpg',
  '/assets/rkhsk-nunchaku-1507.png',
  '/assets/rkhsk-nunchaku-square-1024.png'
];

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      cache.addAll(cacheFilesSoon);
      return cache.addAll(cacheFilesFirst);
    }).catch(function(error) {
      console.error('Getting everything in cache failed.');
      console.error(error);
    })
  );
});

// Primarily use cache but fetch from the network when not found
this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// Remove any caches that are not the current
this.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(list) {
      return Promise.all(list.filter(function(key) {
        return key !== cacheName;
      }).map(function(key) {
        return caches.delete(key);
      }));
    })
  );
});

this.addEventListener('backgroundfetched', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {

      const promises = event.fetches.map(({ request, response }) => {
        if (response && response.ok) {
          return cache.put(request, response.clone());
        }
      });

      return Promise.all(promises);
    })
  );
});
