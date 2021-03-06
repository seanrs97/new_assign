var BASE_PATH = '/new_assign/';
var TEMP_IMAGE_CACHE_NAME = 'temp-cache-v1';
var CACHE_NAME = 'gih-cache-v7';
var newsAPIJSON = "https://newsapi.org/v1/articles?source=bbc-news&apiKey=c5b2ba3cfb4c4717852bf328348da961";

var CACHED_URLS = [
    // Our HTML
	BASE_PATH + 'index.html',
	BASE_PATH + 'staffs-uni.html',
	BASE_PATH + 'sign-up.html',

    //                      PUT THESE IN RIGHT SPOTS
    BASE_PATH + 'scripts.js',
    BASE_PATH + 'events.json',


    // Images for favicons
   BASE_PATH +'images/favicon/android-icon-36x36.png',
   BASE_PATH +'images/favicon/android-icon-48x48.png',
   BASE_PATH +'images/favicon/android-icon-72x72.png',
   BASE_PATH +'images/favicon/android-icon-96x96.png',
   BASE_PATH +'images/favicon/android-icon-144x144.png',
   BASE_PATH +'images/favicon/android-icon-192x192.png',
   BASE_PATH +'images/favicon/favicon-16x16.png',
   BASE_PATH +'images/favicon/favicon-32x32.png',
   BASE_PATH +'images/favicon/favicon-96x96.png',
   BASE_PATH +'images/favicon/ic_launcher-1x.png',
   BASE_PATH +'images/favicon/ic_launcher-2x.png',
   BASE_PATH +'images/favicon/ic_launcher-3x.png',
   BASE_PATH +'images/favicon/ic_launcher-4x.png',
   BASE_PATH +'images/favicon/ic_launcher-5x.png',
   
   
   
   
   
   BASE_PATH +'images/main-image.webp',
   BASE_PATH +'images/universityImage-1x.png',
   BASE_PATH +'images/universityImage-2x.png',
   BASE_PATH +'images/universityImage-3x.png',
   
   BASE_PATH +'images/indexImage1.webp',
   BASE_PATH +'images/indexImage2.webp',
   BASE_PATH +'images/indexImage3.webp',
   BASE_PATH +'images/indexImage4.webp',
   BASE_PATH +'images/indexImage5.webp',
   BASE_PATH +'images/indexImage6.webp',
   BASE_PATH +'images/indexImage7.webp',
   BASE_PATH +'images/indexImage8.webp',
   BASE_PATH +'images/indexImage9.webp',
   BASE_PATH +'images/indexImage10.webp',
   
   
   BASE_PATH +'assets/css/images/overlay.png',
   BASE_PATH +'assets/css/images/shadow.png',
   BASE_PATH +'assets/css/font-awesome.min.css',
   BASE_PATH +'assets/css/ie8.css',
   BASE_PATH +'assets/css/main.css',

   BASE_PATH +'assets/fonts/FontAwesome.otf',
   BASE_PATH +'assets/js/gen_validatorv31.js',
   BASE_PATH +'assets/js/jquery.min.js',
   BASE_PATH +'assets/js/main.js',
   BASE_PATH +'assets/sass/ie8.scss',
   BASE_PATH +'assets/sass/main.scss',
   BASE_PATH +'assets/browserconfig.xml',
   
   
   
   

    //Images for page
    BASE_PATH + 'assets/css/images/offlinemap.jpg',

    BASE_PATH + 'offline-map.js',
    BASE_PATH + 'material.js',
    // Manifest
    BASE_PATH + 'images/favicon/manifest.json',
    // CSS and fonts
    'https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&lang=en',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
];

var googleMapsAPIJS ="https://maps.googleapis.com/maps/api/js?key=AIzaSyBMA8ic4_Gyh0D7XUW9gBtrCcEwoBbBJ8E&sensor=false&libraries=places&callback=initMap"

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
    } else if (requestURL.pathname === BASE_PATH + 'staffs-uni.html') {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return cache.match('staffs-uni.html').then(function(cachedResponse) {
                    var fetchPromise = fetch('staffs-uni.html').then(function(networkResponse) {
                        cache.put('staffs-uni.html', networkResponse.clone());
                        return networkResponse;
                    });
                    return cachedResponse || fetchPromise;
                });
            })
        );

        // Handle requests for Google Maps JavaScript API file
    } 
	else if (requestURL.pathname === BASE_PATH + 'sign-up.html') {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return cache.match('sign-up.html').then(function(cachedResponse) {
                    var fetchPromise = fetch('sign-up.html').then(function(networkResponse) {
                        cache.put('sign-up.html', networkResponse.clone());
                        return networkResponse;
                    });
                    return cachedResponse || fetchPromise;
                });
            })
        );

        // Handle requests for Google Maps JavaScript API file
    }else if (requestURL.href === googleMapsAPIJS) {
        event.respondWith(
            fetch(
                googleMapsAPIJS+'&'+Date.now(),
                { mode: 'no-cors', cache: 'no-store' }
            ).catch(function() {
                return caches.match('offline-map.js');
            })
        );

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
    } else if (requestURL.pathname.includes('/images/')) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return cache.match(event.request).then(function(cacheResponse) {
                    return cacheResponse||fetch(event.request).then(function(networkResponse) {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    }).catch(function() {
                        return cache.match('images/universityImage-1x.png');
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
                        return cache.match('images/universityImage-1x.png');
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
