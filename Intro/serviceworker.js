console.log("Hey I am the service worker!", self);

// the install, activate, fetch and message are Extendable Event

self.addEventListener("install", (evt) => {
  // service worker has been installed
  console.log("SW installed");
  // self.skipWaiting(); // skip waiting to activate
  evt.waitUntil(
    Promise.resolve()
      .then(() => {
        test1();
      })
      .then(() => {
        return test2();
      })
  );
});

function test1() {
  console.log("Test 1");
}

function test2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Test 2");
      resolve();
    }, 2000);
  });
}


self.addEventListener("activate", () => {
  console.log("Clients", clients);
  // service worker has been activated
  // clients.claim().then(() => {
  //   console.log("claim will make the page use the new service worker");
  // });
  console.log("SW activated");
});

self.addEventListener("fetch", (evt) => {
  console.log("SW fetch", evt.request);
});

self.addEventListener("message", (evt) => {});
