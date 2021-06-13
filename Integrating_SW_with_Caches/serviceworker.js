let version = 1;
let staticCacheName = `staticCache-${version}`;
let dynamicCacheName = "dynamicCache";
let fontCacheName = "fontCache";
let imageCacheName = "imageCache";

let staticAssets = ["/", "/index.html", "/css/index.css", "/js/index.js"];

self.addEventListener("install", (evt) => {
  console.log("SW installed");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache
        .addAll(staticAssets)
        .then(() => {
          console.log(`${staticCacheName} has been updated`);
        })
        .catch(() => {
          console.error("Failed to update the cache");
        });
    })
  );
});

self.addEventListener("activate", (evt) => {
  console.log("SW activated");
  evt.waitUntil(
    caches.keys().then((cacheKeys) => {
      return Promise.all(
        cacheKeys
          .filter((cachekey) => cachekey !== staticCacheName)
          .map((cacheKey) => caches.delete(cacheKey))
      );
    })
  );
});

self.addEventListener("fetch", (evt) => {
  console.log("SW fetch", evt.request);
});

self.addEventListener("message", (evt) => {});
