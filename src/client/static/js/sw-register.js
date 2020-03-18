(() => {
  window.addEventListener("load", async () => {
    if (navigator.serviceWorker) {
      const registration = await navigator.serviceWorker.register("/js/sw.js", {
        scope: "/"
      });
      if (registration) {
        console.log(`Successfully registered service worker: ${registration}`);
      }
    }
  });
})();
