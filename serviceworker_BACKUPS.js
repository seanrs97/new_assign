var CACHE_NAME = 'gih-cache-v5';
var CACHED_URLS = [
    // Our HTML
    'first.html',
    // Stylesheets and fonts
    'mystyles.css',
    'styles.css',
    'material-theme.css',
    // JavaScript
    'material.js',
    // Images
    'dino.png',
    'favicon-16x16.png',
    'favicon.ico',
    'appimages/android-icon-36x36.png',
    'appimages/android-icon-48x48.png',
    'appimages/android-icon-72x72.png',
    'appimages/android-icon-96x96.png',
    'appimages/android-icon-144x144.png',
    'appimages/android-icon-192x192.png',
    'appimages/favicon-32x32.png',
    'appimages/favicon-96x96.png',
    'appimages/jack.jpg',
    'appimages/ms-icon-70x70.png',
    'appimages/ms-icon-144x144.png',
    'appimages/ms-icon-150x150.png',
    'appimages/ms-icon-310x310.png',
    'appimages/paddy.jpg',
    'eventsimages/example-blog01.jpg',
    'eventsimages/example-blog02.jpg',
    'eventsimages/example-blog03.jpg',
    'eventsimages/example-blog04.jpg',
    'eventsimages/example-blog05.jpg',
    'eventsimages/example-blog06.jpg',
    'eventsimages/example-blog07.jpg',
    'eventsimages/example-work01.jpg',
    'eventsimages/example-work02.jpg',
    'eventsimages/example-work03.jpg',
    'eventsimages/example-work04.jpg',
    'eventsimages/example-work05.jpg',
    'eventsimages/example-work06.jpg',
    'eventsimages/example-work07.jpg',
    'eventsimages/example-work08.jpg',
    'eventsimages/example-work09.jpg'
];

self.addEventListener('install', function(event) {
    // Cache everything in CACHED_URLS. Installation will fail if something fails to cache
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(CACHED_URLS);
        })
    );
});

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         fetch(event.request).catch(function() {
//             return caches.match(event.request).then(function(response) {
//                 if (response) {
//                     return response;
//                 } else if (event.request.headers.get('accept').includes('text/html')) {
//                     return caches.match('first.html');
//                 }
//             });
//         })
//     );
// });

self.addEventListener('fetch', function(event) {
    var requestURL = new URL(event.request.url);
    if (requestURL.pathname === 'first.html') {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return cache.match('first.html').then(function(cachedResponse) {
                    var fetchPromise = fetch('first.html').then(function(networkResponse) {
                        cache.put('first.html', networkResponse.clone());
                        return networkResponse;
                    });
                    return cachedResponse || fetchPromise;
                });
            })
        );
    } else if (
        CACHED_URLS.indexOf(requestURL.href) !== -1 ||
        CACHED_URLS.indexOf(requestURL.pathname) !== -1
    ) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return cache.match(event.request).then(function(response) {
                    return response || fetch(event.request);
                })
            })
        );
    }
});


self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName.startsWith('gih-cache') && CACHE_NAME !== cacheName) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
