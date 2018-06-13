const cacheName = "restaurant-reviews-v1.0";
/*const urlsToCache = [
  '/',
  'css/styles.css',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
  'img/1small.jpg',
  'img/2small.jpg',
  'img/3small.jpg',
  'img/4small.jpg',
  'img/5small.jpg',
  'img/6small.jpg',
  'img/7small.jpg',
  'img/8small.jpg',
  'img/9small.jpg',
  'img/10small.jpg',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js'
];*/
const urlsToCache = [
  '/mws-restaurant-stage-1//',
  '/mws-restaurant-stage-1/css/styles.css',
  '/mws-restaurant-stage-1/data/restaurants.json',
  '/mws-restaurant-stage-1/img/1.jpg',
  '/mws-restaurant-stage-1/img/2.jpg',
  '/mws-restaurant-stage-1/img/3.jpg',
  '/mws-restaurant-stage-1/img/4.jpg',
  '/mws-restaurant-stage-1/img/5.jpg',
  '/mws-restaurant-stage-1/img/6.jpg',
  '/mws-restaurant-stage-1/img/7.jpg',
  '/mws-restaurant-stage-1/img/8.jpg',
  '/mws-restaurant-stage-1/img/9.jpg',
  '/mws-restaurant-stage-1/img/10.jpg',
  '/mws-restaurant-stage-1/img/1small.jpg',
  '/mws-restaurant-stage-1/img/2small.jpg',
  '/mws-restaurant-stage-1/img/3small.jpg',
  '/mws-restaurant-stage-1/img/4small.jpg',
  '/mws-restaurant-stage-1/img/5small.jpg',
  '/mws-restaurant-stage-1/img/6small.jpg',
  '/mws-restaurant-stage-1/img/7small.jpg',
  '/mws-restaurant-stage-1/img/8small.jpg',
  '/mws-restaurant-stage-1/img/9small.jpg',
  '/mws-restaurant-stage-1/img/10small.jpg',
  '/mws-restaurant-stage-1/js/dbhelper.js',
  '/mws-restaurant-stage-1/js/main.js',
  '/mws-restaurant-stage-1/js/restaurant_info.js'
];

// This will cache all of our files, once installing the sw is done
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// This will intercept any fetch requests, and if they've been made before, it will respond from the cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {return response;}
      else {return fetch(event.request);}
    })
  );
});
