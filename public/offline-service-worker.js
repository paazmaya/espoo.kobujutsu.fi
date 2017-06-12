
var cacheName = '20170612a';

// index.html should be only used when offline, in order to have latest content always shown.
var cacheFiles = [
  '/index.html',
  '/favicon.ico',
  '/assets/default.css',
  '/assets/ohjaaja-jukka.jpg',
  '/assets/ohjaaja-kari.jpg',
  '/assets/ohjaaja-kimmo.jpg',
  '/assets/ohjaaja-jukka-300.jpg',
  '/assets/ohjaaja-kari-300.jpg',
  '/assets/ohjaaja-kimmo-300.jpg',
  '/assets/rkhsk-nunchaku.png',
  '/assets/rkhsk-nunchaku-icon-60.png',
  '/assets/rkhsk-logo.svg',
  '/assets/yuishinkai-logo.svg'
];

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(cacheFiles);
    }).catch(function(error) {
      console.error(error);
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      console.log('event.request.url', event.request.url);
      console.log('resp', resp);
      if (resp) {
        return resp;
      }
      return fetch(event.request).then(function(response) {
        return response;
      }).catch(function(error) {
        console.error(error);
      });
    }).catch(function() {
      return caches.match('/index.html');
    })
  );
});

// Remove any caches that are not the current
this.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }

        return true;
      }));
    })
  );
});
