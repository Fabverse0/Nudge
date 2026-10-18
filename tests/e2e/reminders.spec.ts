import { expect, test } from "@playwright/test";

test("permission is requested after explicit opt-in, denial remains usable", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "notificationRequests", { value: 0, writable: true });
    class MockNotification {
      static permission = "default";
      static async requestPermission() { (window as unknown as { notificationRequests: number }).notificationRequests++; return "denied"; }
    }
    Object.defineProperty(window, "Notification", { value: MockNotification });
  });
  await page.goto("/app");
  expect(await page.evaluate(() => (window as unknown as { notificationRequests: number }).notificationRequests)).toBe(0);
  await page.getByRole("button", { name: "Pengingat", exact: true }).click();
  await page.getByRole("checkbox", { name: "Aktifkan pengingat", exact: false }).check();
  await page.getByRole("button", { name: "Simpan pengingat" }).click();
  expect(await page.evaluate(() => (window as unknown as { notificationRequests: number }).notificationRequests)).toBe(1);
  await expect(page.getByText("Notifikasi belum diizinkan.", { exact: false })).toBeVisible();
  await page.getByRole("checkbox", { name: "Aktifkan pengingat", exact: false }).uncheck();
  await page.getByRole("button", { name: "Simpan pengingat" }).click();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("nudge.reminder.v1")!).enabled)).toBe(false);
  await page.getByRole("button", { name: "Kegiatan", exact: true }).click();
  await expect(page.getByRole("button", { name: "Cari kegiatan kecil" })).toBeVisible();
});

test("editing or disabling schedule prevents old notifications", async ({ page }) => {
  await page.clock.install({ time: new Date(2026, 9, 19, 15, 59, 0) });
  await page.addInitScript(() => {
    Object.defineProperty(window, "sentReminders", { value: 0, writable: true });
    class MockNotification {
      static permission = "granted";
      static async requestPermission() { return "granted"; }
      constructor() { (window as unknown as { sentReminders: number }).sentReminders++; }
    }
    Object.defineProperty(window, "Notification", { value: MockNotification });
    localStorage.setItem("nudge.reminder.v1", JSON.stringify({ enabled: true, days: [1], time: "16:00" }));
  });
  await page.goto("/app");
  await page.getByRole("button", { name: "Pengingat", exact: true }).click();
  await page.getByLabel("Waktu lokal perangkat").fill("17:00");
  await page.getByRole("button", { name: "Simpan pengingat" }).click();
  await page.clock.fastForward(61_000);
  expect(await page.evaluate(() => (window as unknown as { sentReminders: number }).sentReminders)).toBe(0);
  await page.getByRole("checkbox", { name: "Aktifkan pengingat", exact: false }).uncheck();
  await page.getByRole("button", { name: "Simpan pengingat" }).click();
  await page.clock.fastForward(3_600_000);
  expect(await page.evaluate(() => (window as unknown as { sentReminders: number }).sentReminders)).toBe(0);
});
