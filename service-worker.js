const CACHE = "ohnd-hub-v3";
const ASSETS = ["./", "./index.html", "./app.js", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Save a copy of a successful response; never cache errors.
function remember(request, response) {
  if (response.ok) {
    const copy = response.clone(); // clone now, before the browser starts reading the body
    caches.open(CACHE).then((cache) => cache.put(request, copy));
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  if (new URL(request.url).origin !== location.origin) return; // movie API calls go straight to the network

  // Page and app code: network-first, so a new deploy shows up on the next open.
  // The cached copy is only used when offline.
  if (request.mode === "navigate" || request.url.endsWith("/app.js")) {
    event.respondWith(
      fetch(request)
        .then((response) => remember(request, response))
        .catch(() => caches.match(request).then((hit) =>
          hit || (request.mode === "navigate" ? caches.match("./index.html") : Response.error())))
    );
    return;
  }

  // Icons and manifest: cache-first.
  event.respondWith(
    caches.match(request).then((hit) => hit || fetch(request).then((response) => remember(request, response)))
  );
});
