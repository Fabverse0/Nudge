import { expect, test } from "@playwright/test";

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
