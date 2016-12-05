
this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
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
        caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone());
        }).catch(function(error) {
          console.error(error);
        });
        return response;
      }).catch(function(error) {
        console.error(error);
      });
    }).catch(function() {
      return caches.match('/offline.html');
    })
  );
});
