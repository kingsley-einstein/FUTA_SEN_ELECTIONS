const CACHE_NAME = "FUTA_SEN_ELECTIONS_CACHE";
const RESOURCES = [
  "/",
  "/statics",
  "/css/materialize.css",
];

self.addEventListener("install", async (event) => {
  event.waitUntil(new Promise(async (resolve) => {
    const cache = await caches.open(CACHE_NAME);
    resolve(await cache.addAll(RESOURCES));
  }));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method === "GET") {
    event.respondWith(
      new Promise(async (resolve) => {
        const cache = await caches.open(CACHE_NAME);
        const response = await cache.match(event.request);
        event.waitUntil(
          fetch(event.request).then((network) => {
            cache.put(event.request, network.clone());
            return network;
          })
        );
        resolve(response);
      })
    );
  }
});
