console.log("Hey I am the service worker!", self);

self.addEventListener("install", (evt) => {
  console.log("SW installed");
});

self.addEventListener("activate", () => {
  console.log("SW activated");
});

self.addEventListener("fetch", (evt) => {
  // console.log("SW fetch", evt.request);
});
