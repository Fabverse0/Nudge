import { expect, test } from "@playwright/test";

test("production reminder is accepted by the native service worker notification API", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["notifications"]);
  await page.addInitScript(() => {
    const accepted: { title: string; tag?: string }[] = [];
    Object.defineProperty(window, "acceptedNotifications", { value: accepted });
    const showNotification =
      ServiceWorkerRegistration.prototype.showNotification;
    ServiceWorkerRegistration.prototype.showNotification = async function (
      title,
      options,
    ) {
      await showNotification.call(this, title, options);
      accepted.push({ title, tag: options?.tag });
    };
  });
  await page.clock.install({ time: new Date(2026, 9, 19, 16, 0, 10) });
  await page.goto("/app");
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.getByRole("button", { name: "Pengingat", exact: true }).click();
  await page
    .getByRole("checkbox", { name: "Aktifkan pengingat", exact: false })
    .check();
  await page.getByRole("button", { name: "Simpan pengingat" }).click();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (
            window as unknown as {
              acceptedNotifications: { title: string; tag?: string }[];
            }
          ).acceptedNotifications,
      ),
    )
    .toEqual([
      { title: "Saatnya satu langkah kecil?", tag: "2026-10-19-16:00" },
    ]);
  await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    for (const notification of await registration.getNotifications())
      notification.close();
  });
});

test("production activity flow has no hydration or browser errors", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await page.locator(".hero-cta").click();
  await expect(
    page.getByRole("heading", { name: "Mau mulai dari apa?" }),
  ).toBeVisible();
  await page.screenshot({
    path: `.impeccable/review/app-production-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await page
    .getByRole("group", { name: "Ingin melakukan apa?" })
    .getByRole("radio", { name: "Bergerak", exact: false })
    .check();
  await page.getByRole("radio", { name: "2 menit" }).check();
  await page.getByRole("button", { name: "Cari kegiatan kecil" }).click();
  await page.getByRole("button", { name: "Mulai kegiatan" }).click();
  await expect
    .poll(() =>
      page
        .locator(".calm-companion img")
        .evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await page.screenshot({
    path: `.impeccable/review/timer-production-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Jeda", exact: true }).click();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await page.getByRole("button", { name: "Selesai", exact: true }).click();
  await expect
    .poll(() =>
      page
        .locator(".completion-mark img")
        .evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await page.screenshot({
    path: `.impeccable/review/completion-production-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Lewati", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Mau mulai dari apa?" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("production registers worker, serves real icons and keeps private state out of cache", async ({
  page,
  request,
}) => {
  await page.goto("/offline.html");
  await page.evaluate(async () => {
    const obsolete = await caches.open("nudge-static-obsolete");
    await obsolete.put("/icons/512", new Response("outdated icon"));
  });
  await page.goto("/app");
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Mau mulai dari apa?" }),
  ).toBeVisible();
  await expect(page.getByRole("timer")).toHaveCount(0);
  for (const [variant, size] of [
    ["32", 32],
    ["180", 180],
    ["192", 192],
    ["512", 512],
    ["maskable-512", 512],
  ] as const) {
    const icon = await request.get(`/icons/${variant}`);
    expect(icon.ok()).toBe(true);
    expect(icon.headers()["content-type"]).toContain("image/png");
    const png = await icon.body();
    expect(png.readUInt32BE(16)).toBe(size);
    expect(png.readUInt32BE(20)).toBe(size);
  }
  expect((await request.get("/icons/999")).status()).toBe(404);
  const manifest = await (await request.get("/manifest.webmanifest")).json();
  expect(manifest.icons).toContainEqual({
    src: "/icons/maskable-512",
    sizes: "512x512",
    type: "image/png",
    purpose: "maskable",
  });
  const unsafePixels = await page.evaluate(async () => {
    const image = new Image();
    image.src = "/icons/maskable-512";
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas unavailable for maskable icon check");
    context.drawImage(image, 0, 0);
    const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
    const center = canvas.width / 2;
    const safeRadius = canvas.width * 0.4;
    let outside = 0;
    for (let y = 0; y < canvas.height; y += 1) {
      for (let x = 0; x < canvas.width; x += 1) {
        if (Math.hypot(x + 0.5 - center, y + 0.5 - center) <= safeRadius)
          continue;
        const offset = (y * canvas.width + x) * 4;
        if (
          [0, 1, 2].some(
            (channel) => Math.abs(data[offset + channel] - data[channel]) > 8,
          )
        )
          outside += 1;
      }
    }
    return outside;
  });
  expect(unsafePixels, "Maskable artwork stays inside the safe circle").toBe(0);
  const cacheUrls = await page.evaluate(async () => {
    const urls: string[] = [];
    for (const key of await caches.keys()) {
      const cache = await caches.open(key);
      for (const request of await cache.keys())
        urls.push(new URL(request.url).pathname);
    }
    return urls;
  });
  expect(cacheUrls).toContain("/offline.html");
  expect(cacheUrls).not.toContain("/app");
  expect(cacheUrls).not.toContain("/");
  expect(await page.evaluate(() => caches.keys())).not.toContain(
    "nudge-static-obsolete",
  );
});

test("offline navigation explains the real limitation", async ({
  page,
  context,
}) => {
  await page.goto("/app");
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await context.setOffline(true);
  await page.goto("/app");
  await expect(
    page.getByRole("heading", { name: "Koneksi sedang terputus" }),
  ).toBeVisible();
  await context.setOffline(false);
  await page.getByRole("link", { name: "Coba buka aplikasi" }).click();
  await expect(
    page.getByRole("heading", { name: "Mau mulai dari apa?" }),
  ).toBeVisible();
});
