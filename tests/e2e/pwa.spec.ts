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
  await page.getByRole("link", { name: "Mulai satu kegiatan" }).click();
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
  await page.screenshot({
    path: `.impeccable/review/timer-production-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Jeda", exact: true }).click();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await page.getByRole("button", { name: "Selesai", exact: true }).click();
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
  await page.goto("/app");
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Mau mulai dari apa?" }),
  ).toBeVisible();
  await expect(page.getByRole("timer")).toHaveCount(0);
  for (const size of [192, 512]) {
    const icon = await request.get(`/icons/${size}`);
    expect(icon.ok()).toBe(true);
    expect(icon.headers()["content-type"]).toContain("image/png");
    const png = await icon.body();
    expect(png.readUInt32BE(16)).toBe(size);
    expect(png.readUInt32BE(20)).toBe(size);
  }
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
