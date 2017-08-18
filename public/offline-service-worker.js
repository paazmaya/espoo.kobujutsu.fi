
var cacheName = '20170815a';

// index.html should be only used when offline, in order to have latest content always shown.
var cacheFiles = [
  '/index.html',
  '/favicon.ico',
  '/assets/default.css',
  '/assets/espoon-yuishinkai-ry-yhdistyksen-saannot-2016-12-210.pdf',
  '/assets/ohjaaja-jukka-300.jpg',
  '/assets/ohjaaja-jukka.jpg',
  '/assets/ohjaaja-kari-300.jpg',
  '/assets/ohjaaja-kari.jpg',
  '/assets/ohjaaja-kimmo-300.jpg',
  '/assets/ohjaaja-kimmo.jpg',
  '/assets/rkhsk-logo.png',
  '/assets/rkhsk-nunchaku-1507.png',
  '/assets/rkhsk-nunchaku-754.png',
  '/assets/rkhsk-nunchaku-square-1024.png',
  '/assets/yuishinkai-logo.png'
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

// Primarily to to fetch from the network
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
      // Got offline?
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
