// use a cacheName for cache versioning
var cacheName = 'RUv1:static';

// during the install phase you usually want to cache static assets
self.addEventListener('install', function(e) {
    // once the SW is installed, go ahead and fetch the resources to make this work offline
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                './',
                './css/jquery.mobile-1.4.5.min.css',
                './css/jquery.mobile.theme-1.4.5.min.css',
				'./css/jquery.mobile.icons-1.4.5.min.css',
				'./css/images/ajax-loader.gif',
                './js/jquery.min.js',
                './js/jquery.mobile-1.4.5.min.js',	
				'js/jqmDialog.min.js',
                './img/icon.jpg',
				'./img/icon.svg',
                './index.html'
            ]).then(function() {
                self.skipWaiting();
            });
        })
    );
});

// when the browser fetches a url
self.addEventListener('fetch', function(event) {
    // either respond with the cached object or go ahead and fetch the actual url
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                // retrieve from cache
                return response;
            }
            // fetch as normal
            return fetch(event.request);
        })
    );
});