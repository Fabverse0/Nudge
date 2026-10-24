// Bump the version when releasing changed static assets.
const CACHE = "nudge-static-v4";
const STATIC = [
  "/offline.html",
  "/icons/32",
  "/icons/180",
  "/icons/192",
  "/icons/512",
  "/icons/maskable-512",
];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        cache.addAll(
          STATIC.map((url) => new Request(url, { cache: "reload" })),
        ),
      ),
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("nudge-static-") && key !== CACHE)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
});
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin)
    return;
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/offline.html")),
    );
  } else if (
    STATIC.includes(url.pathname) ||
    url.pathname.startsWith("/_next/static/")
  ) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        const isStatic = STATIC.includes(url.pathname);
        const isImmutable = (response) =>
          /(?:^|,)\s*immutable\s*(?:,|$)/i.test(
            response.headers.get("Cache-Control") || "",
          );
        const cached = await cache.match(event.request);
        if (cached && (isStatic || isImmutable(cached))) return cached;
        const response = await fetch(event.request);
        if (response.ok && (isStatic || isImmutable(response))) {
          await cache.put(event.request, response.clone());
        }
        return response;
      })(),
    );
  }
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(async (clients) => {
        const existing = clients.find(
          (client) => new URL(client.url).pathname === "/app",
        );
        if (existing) return existing.focus();
        return self.clients.openWindow("/app");
      }),
  );
});
