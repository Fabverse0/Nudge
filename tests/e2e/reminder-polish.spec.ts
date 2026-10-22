import { expect, test, type Page } from "@playwright/test";
import { REMINDER_KEY } from "../../src/lib/reminders/schedule";

async function mockNotifications(
  page: Page,
  initial: "default" | "denied" | "unsupported",
) {
  await page.addInitScript((initial) => {
    const state = { requests: 0 };
    Object.defineProperty(window, "reminderPermissionCalls", { value: state });
    if (initial === "unsupported") {
      Reflect.deleteProperty(window, "Notification");
      return;
    }
    class MockNotification {
      static permission: NotificationPermission = initial;
      static async requestPermission(): Promise<NotificationPermission> {
        state.requests += 1;
        MockNotification.permission = "granted";
        return "granted";
      }
    }
    Object.defineProperty(window, "Notification", {
      configurable: true,
      value: MockNotification,
    });
  }, initial);
}

const permissionCalls = (page: Page) =>
  page.evaluate(
    () =>
      (window as unknown as { reminderPermissionCalls: { requests: number } })
        .reminderPermissionCalls.requests,
  );
const enabled = (page: Page) =>
  page.getByRole("checkbox", { name: "Aktifkan pengingat", exact: false });
const save = (page: Page) =>
  page.getByRole("button", { name: "Simpan pengingat", exact: true });

async function openReminders(page: Page) {
  await page.goto("/app");
  await page.getByRole("button", { name: "Pengingat", exact: true }).click();
  await expect(enabled(page)).toBeVisible();
}

async function startManualActivity(page: Page) {
  await page.getByRole("button", { name: "Kegiatan", exact: true }).click();
  await page.getByRole("button", { name: "Lewati", exact: true }).click();
  await page.getByRole("radio", { name: "Bergerak", exact: false }).check();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await page.getByRole("radio", { name: "2 menit", exact: true }).check();
  await page
    .getByRole("button", { name: "Cari kegiatan kecil", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Mulai kegiatan", exact: true })
    .click();
  await expect(page.getByRole("timer")).toHaveText("02:00");
}

test.beforeEach(async ({ page }) => {
  await page.clock.install({ time: new Date(2026, 9, 22, 9, 0, 0) });
});

test("reminders require an explicit valid save before activation or browser permission", async ({
  page,
}) => {
  await mockNotifications(page, "default");
  await openReminders(page);
  await expect(enabled(page)).not.toBeChecked();
  await expect(page.locator(".reminder-status")).toHaveAttribute(
    "data-enabled",
    "false",
  );
  await expect(page.locator(".permission-status")).toContainText(
    "Izin browser baru diminta",
  );
  expect(await permissionCalls(page)).toBe(0);
  await enabled(page).check();
  await page.getByLabel("Waktu lokal perangkat", { exact: true }).fill("17:45");
  const days = page.getByRole("group", { name: "Hari pengingat", exact: true });
  for (const day of await days.getByRole("checkbox").all()) await day.uncheck();
  await save(page).click();
  await expect(page.getByRole("main").getByRole("alert")).toHaveText(
    "Pilih setidaknya satu hari dan waktu yang valid.",
  );
  await expect(page.locator(".reminder-status")).toHaveAttribute(
    "data-enabled",
    "false",
  );
  expect(await permissionCalls(page)).toBe(0);
  await days.getByRole("checkbox", { name: "Sen", exact: true }).check();
  expect(await permissionCalls(page)).toBe(0);
  await save(page).click();
  await expect(page.locator(".reminder-status")).toHaveAttribute(
    "data-enabled",
    "true",
  );
  await expect(page.locator(".permission-status")).toHaveText(
    "Notifikasi: diizinkan.",
  );
  expect(await permissionCalls(page)).toBe(1);
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!),
      REMINDER_KEY,
    ),
  ).toEqual({ enabled: true, days: [1], time: "17:45" });
  await enabled(page).uncheck();
  await days.getByRole("checkbox", { name: "Sen", exact: true }).uncheck();
  await page.getByLabel("Waktu lokal perangkat", { exact: true }).fill("");
  await expect(page.locator(".reminder-status")).toHaveAttribute(
    "data-enabled",
    "true",
  );
  await save(page).click();
  await expect(page.locator(".reminder-status")).toHaveAttribute(
    "data-enabled",
    "false",
  );
  await expect(page.getByRole("main").getByRole("alert")).toHaveCount(0);
  expect(await permissionCalls(page)).toBe(1);
  await page.reload();
  await page.getByRole("button", { name: "Pengingat", exact: true }).click();
  await expect(enabled(page)).not.toBeChecked();
  await expect(
    page.getByLabel("Waktu lokal perangkat", { exact: true }),
  ).toHaveValue("17:45");
  await expect(days.getByRole("checkbox", { checked: true })).toHaveCount(0);
});

for (const state of ["denied", "unsupported"] as const) {
  test(`${state} notifications explain the limitation and keep manual activities usable`, async ({
    page,
  }) => {
    await mockNotifications(page, state);
    await openReminders(page);
    await expect(page.locator(".permission-status")).toContainText(
      state === "denied"
        ? "Notifikasi belum diizinkan"
        : "Browser ini belum mendukung notifikasi",
    );
    await enabled(page).check();
    await save(page).click();
    await expect(page.locator(".reminder-status")).toHaveAttribute(
      "data-enabled",
      "true",
    );
    await expect(page.locator(".permission-status")).toContainText("manual");
    expect(await permissionCalls(page)).toBe(0);
    await startManualActivity(page);
  });
}

test("blocked local storage explains that a saved reminder lasts only while the page is open", async ({
  page,
}) => {
  await mockNotifications(page, "default");
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage unavailable");
      },
    });
  });
  await openReminders(page);
  await enabled(page).check();
  await save(page).click();
  await expect(page.getByRole("status")).toContainText(
    "Jadwal belum tersimpan. Pengaturan ini hanya berlaku selama halaman terbuka.",
  );
  await expect(page.locator(".reminder-status")).toHaveAttribute(
    "data-enabled",
    "true",
  );
  expect(await permissionCalls(page)).toBe(1);
  await startManualActivity(page);
});
