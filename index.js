const App = {
  cacheName1: "asset-cache",
  imageUrlString: "/images/img-1.jpg",
  init() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("./serviceworker.js", { scope: "/" })
          .then((registration) => {
            console.log("SW registered successfully", registration);
          });
      });
      // controller can be used to check the page has the service worker
      if (navigator.serviceWorker.controller) {
        console.log(
          "Service worked installed",
          navigator.serviceWorker.controller
        );
      }

      navigator.serviceWorker.oncontrollerchange = (evt) => {
        console.log("New service worker activated");
      };

      // Manual remove / unregister of the service workers
      //   navigator.serviceWorker.getRegistrations().then((registrations) => {
      //     console.log("Past registrations", registrations);
      //     for (let registration of registrations) {
      //       registration.unregister().then((hasUnregistered) => {
      //         console.log("Unregistered status", hasUnregistered);
      //         window.location.reload();
      //       });
      //     }
      //   });
    }
  },
  startCaching() {
    return caches
      .open(this.cacheName1)
      .then((cache) => {
        console.log(this.cacheName1, cache, this.imageUrlString);
        cache.add(this.imageUrlString);

        cache.keys().then((cacheKeys) => {
          console.log("cache keys", cacheKeys);
        });

        return cache;
      })
      .then((cache) => {
        caches.has(this.cacheName1).then((hasCache) => {
          console.log(`${this.cacheName1} ${hasCache}`);
        });

        return caches.match(this.imageUrlString).then((cacheResponse) => {
          console.log("cache response", cacheResponse);
          if (
            cacheResponse &&
            cacheResponse.status < 400 &&
            cacheResponse.headers.has("content-type") &&
            cacheResponse.headers.get("content-type").match(/^image\//i)
          ) {
            console.log("Found in the cache");
            return cacheResponse;
          } else {
            console.log("Not found in the cache");
            return fetch(`${this.imageUrlString}`).then(
              (response) => {
                if (!response) {
                  throw response.statusText;
                }
                cache.put(this.imageUrlString, response.clone());
                return response;
              }
            );
          }
        });
      })
      .then((response) => {
        console.log("Final response", response);
        document.querySelector(".imageContainer").textContent = response.url;
        return response.blob();
      })
      .then((blob) => {
        console.log("result", blob);
        const imageUrl = URL.createObjectURL(blob);
        const img = document.createElement("img");
        img.src = imageUrl;
        img.width = 500;
        document.querySelector(".imageContainer").append(img);
      });
  },
  deleteCache() {
    // Deleting a response from a cache
    // caches.open(this.cacheName1).then((cache) => {
    //   console.log("Cache data to be deleted", this.imageUrlString);
    //   cache.delete(this.imageUrlString).then((hasDeleted) => {
    //     console.log(`${this.imageUrlString} deleted ${hasDeleted}`);
    //   });
    // });
    // Deleting the entire cache
    caches.delete(this.cacheName1).then((hasDeleted) => {
      console.log(`${this.cacheName1} deleted ${hasDeleted}`);
    });
  },
};

App.startCaching();
document.querySelector("h2").addEventListener("click", () => {
  App.deleteCache();
});
