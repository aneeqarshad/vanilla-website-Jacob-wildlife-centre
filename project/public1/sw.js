const CACHE_NAME = "jacob-wildlife-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/animals.html",
  "/map.html",
  "/favourites.html",
  "/kids-tips.html",
  "/animal-detail.html",
  "/404.html",

  "/css/base.css",
  "/css/home.css",
  "/css/animals.css",
  "/css/map.css",
  "/css/favourites.css",
  "/css/kids.css",
  "/css/animal-details.css",

  "/js/main.js",
  "/js/animals.js",
  "/js/details.js",
  "/js/favourites.js",
  "/js/map.js",
  "/js/camera.js",

  "/data/animals.json",

  "/images/logo.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-512x512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => caches.match("/404.html"))
      );
    })
  );
});
