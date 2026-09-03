const CACHE = "makan-mana-v4";
const CORE  = ["/", "/index.html", "/styles.css", "/app.js", "/data.js"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  // Network-first for Firebase/Google APIs, cache-first for app shell
  if (e.request.url.includes("firebase") || e.request.url.includes("googleapis")) return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
