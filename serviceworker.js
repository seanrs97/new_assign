var BASE_PATH = '/new_assign/';
var TEMP_IMAGE_CACHE_NAME = 'temp-cache-v1';
var CACHE_NAME = 'gih-cache-v7';
var newsAPIJSON = "https://newsapi.org/v1/articles?source=bbc-news&apiKey=c5b2ba3cfb4c4717852bf328348da961";

var CACHED_URLS = [
    // Our HTML
    BASE_PATH + 'first.html',
	BASE_PATH + 'index.html',

    //                      PUT THESE IN RIGHT SPOTS
    BASE_PATH + 'appimages/event-default.png',
    BASE_PATH + 'scripts.js',
    BASE_PATH + 'scripts_v2.js',
    BASE_PATH + 'events.json',
    BASE_PATH + 'second.html',
    BASE_PATH + 'appimages/news-default.jpg',


    // Images for favicons
    BASE_PATH + 'appimages/android-icon-36x36.png',
    BASE_PATH + 'appimages/android-icon-48x48.png',
    BASE_PATH + 'appimages/android-icon-72x72.png',
    BASE_PATH + 'appimages/android-icon-96x96.png',
    BASE_PATH + 'appimages/android-icon-144x144.png',
    BASE_PATH + 'appimages/android-icon-192x192.png',
    BASE_PATH + 'appimages/favicon-32x32.png',

    //Images for page
    BASE_PATH + 'appimages/offlinemap.jpg',
    BASE_PATH + 'appimages/dino.png',
    BASE_PATH + 'appimages/jack.jpg',
    BASE_PATH + 'appimages/paddy.jpg',
    BASE_PATH + 'appimages/favicon.ico',
    BASE_PATH + 'appimages/favicon-16x16.png',
    BASE_PATH + 'appimages/favicon-32x32.png',
    BASE_PATH + 'appimages/favicon-96x96.png',
    BASE_PATH + 'appimages/ms-icon-70x70.png',
    BASE_PATH + 'appimages/ms-icon-144x144.png',
    BASE_PATH + 'appimages/ms-icon-150x150.png',
    BASE_PATH + 'appimages/ms-icon-310x310.png',
    // BASE_PATH + 'eventsimages/example-blog01.jpg',
    // BASE_PATH + 'eventsimages/example-blog02.jpg',
    // BASE_PATH + 'eventsimages/example-blog03.jpg',
    // BASE_PATH + 'eventsimages/example-blog04.jpg',
    // BASE_PATH + 'eventsimages/example-blog05.jpg',
    // BASE_PATH + 'eventsimages/example-blog06.jpg',
    // BASE_PATH + 'eventsimages/example-blog07.jpg',
    // BASE_PATH + 'eventsimages/example-work01.jpg',
    // BASE_PATH + 'eventsimages/example-work02.jpg',
    // BASE_PATH + 'eventsimages/example-work03.jpg',
    // BASE_PATH + 'eventsimages/example-work04.jpg',
    // BASE_PATH + 'eventsimages/example-work05.jpg',
    // BASE_PATH + 'eventsimages/example-work06.jpg',
    // BASE_PATH + 'eventsimages/example-work07.jpg',
    // BASE_PATH + 'eventsimages/example-work08.jpg',
    // BASE_PATH + 'eventsimages/example-work09.jpg',
    // JavaScript
    BASE_PATH + 'offline-map.js',
    BASE_PATH + 'material.js',
    // Manifest
    BASE_PATH + 'manifest.json',
    // CSS and fonts
    'https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&lang=en',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    BASE_PATH + 'min-style.css',
    BASE_PATH + 'styles.css'
];

var googleMapsAPIJS = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAlVh89VvQ5fR8PCPFak-YoYGX_eg1DBSc&callback=initMap';

self.addEventListener('install', function(event) {
    // Cache everything in CACHED_URLS. Installation fails if anything fails to cache
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(CACHED_URLS);
        })
    );
});

self.addEventListener('fetch', function(event) {
    var requestURL = new URL(event.request.url);
    // Handle requests for index.html
    if (requestURL.pathname === BASE_PATH + 'index.html') {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return cache.match('index.html').then(function(cachedResponse) {
                    var fetchPromise = fetch('index.html').then(function(networkResponse) {
                        cache.put('index.html', networkResponse.clone());
                        return networkResponse;
                    });
                    return cachedResponse || fetchPromise;
                });
            })
        );
    } else if (requestURL.pathname === BASE_PATH + 'second.html') {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return cache.match('second.html').then(function(cachedResponse) {
                    var fetchPromise = fetch('second.html').then(function(networkResponse) {
                        cache.put('second.html', networkResponse.clone());
                        return networkResponse;
                    });
                    return cachedResponse || fetchPromise;
                });
            })
        );

        // Handle requests for Google Maps JavaScript API file
    } else if (requestURL.href === googleMapsAPIJS) {
        event.respondWith(
            fetch(
                googleMapsAPIJS+'&'+Date.now(),
                { mode: 'no-cors', cache: 'no-store' }
            ).catch(function() {
                return caches.match('offline-map.js');
            })
        );
    //     // Handle requests for events JSON file
    // } else if (requestURL.pathname === BASE_PATH + 'events.json') {
    //     event.respondWith(
    //         caches.open(CACHE_NAME).then(function(cache) {
    //             return fetch(event.request).then(function(networkResponse) {
    //                 cache.put(event.request, networkResponse.clone());
    //                 return networkResponse;
    //             }).catch(function() {
    //                 return caches.match(event.request);
    //             });
    //         })
    //     );
    //     // Handle requests for event images.
    // } else if (requestURL.pathname.includes('/eventsimages/')) {
    //     event.respondWith(
    //         caches.open(CACHE_NAME).then(function(cache) {
    //             return cache.match(event.request).then(function(cacheResponse) {
    //                 return cacheResponse||fetch(event.request).then(function(networkResponse) {
    //                     cache.put(event.request, networkResponse.clone());
    //                     return networkResponse;
    //                 }).catch(function() {
    //                     return cache.match('appimages/event-default.png');
    //                 });
    //             });
    //         })
    //     );

    // Handle requests for events JSON file
    } else if (requestURL.pathname === BASE_PATH + 'events.json') {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(networkResponse) {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                }).catch(function() {
                    return caches.match(event.request);
                });
            })
        );
    } else if (requestURL.href === newsAPIJSON) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(networkResponse) {
                    cache.put(event.request, networkResponse.clone());
                    caches.delete(TEMP_IMAGE_CACHE_NAME);
                    return networkResponse;
                }).catch(function() {
                    return caches.match(event.request);
                });
            })
        );
        // Handle requests for event images.
    } else if (requestURL.pathname.includes('/eventsimages/')) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return cache.match(event.request).then(function(cacheResponse) {
                    return cacheResponse||fetch(event.request).then(function(networkResponse) {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    }).catch(function() {
                        return cache.match('appimages/event-default.png');
                    });
                });
            })
        );
        //
    } else if (requestURL.href.includes('bbci.co.uk/news/')) {
        event.respondWith(
            caches.open(TEMP_IMAGE_CACHE_NAME).then(function(cache) {
                return cache.match(event.request).then(function(cacheResponse) {
                    return cacheResponse||fetch(event.request, {mode: 'no-cors'}).then(function(networkResponse) {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    }).catch(function() {
                        return cache.match('appimages/news-default.jpg');
                    });
                });
            })
        );


    } else if (
        CACHED_URLS.includes(requestURL.href) ||
        CACHED_URLS.includes(requestURL.pathname)
    ) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return cache.match(event.request).then(function(response) {
                    return response || fetch(event.request);
                });
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
