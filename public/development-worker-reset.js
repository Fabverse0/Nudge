(async () => {
  if (!("serviceWorker" in navigator)) return;
  const isNudgeWorker = (worker) =>
    worker !== null &&
    new URL(worker.scriptURL).origin === location.origin &&
    new URL(worker.scriptURL).pathname === "/sw.js";
  try {
    const registrations = (
      await navigator.serviceWorker.getRegistrations()
    ).filter((registration) =>
      [registration.active, registration.waiting, registration.installing].some(
        isNudgeWorker,
      ),
    );
    const controlled = isNudgeWorker(navigator.serviceWorker.controller);
    await Promise.all(
      registrations.map((registration) => registration.unregister()),
    );
    if ("caches" in window) {
      await Promise.all(
        (await caches.keys())
          .filter((key) => key.startsWith("nudge-static-"))
          .map((key) => caches.delete(key)),
      );
    }
    if (controlled) location.reload();
  } catch {
    // Restricted browser modes can reject worker management.
  }
})();
