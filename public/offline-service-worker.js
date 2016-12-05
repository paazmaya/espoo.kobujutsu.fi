
var cacheName = 'v2';

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/favicon.ico',
        '/rkhsk-nunchaku.png',
        '/rkhsk-nunchaku-icon-60.png',
        '/rkhsk-logo.svg',
        '/yuishinkai-logo.svg',
        '/offline.html'
      ]);
    }).catch(function(error) {
      console.error(error);
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      if (resp) {
        return resp;
      }
      return fetch(event.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        }).catch(function(error) {
          console.error(error);
        });
      }).catch(function(error) {
        console.error(error);
      });
    }).catch(function() {
      return caches.match('/offline.html');
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
