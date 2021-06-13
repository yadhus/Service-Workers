const App = {
  SW: null,
  init() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/serviceworker.js")
          .then((registration) => {
            this.SW =
              registration.installing ||
              registration.waiting ||
              registration.active;
            console.log("SW registered successfully", registration);
          });
      });
    }
  },
};

App.init();
console.log("Hello world");
