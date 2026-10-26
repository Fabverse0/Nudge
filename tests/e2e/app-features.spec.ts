import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { activities } from "../../src/lib/activities/catalog";
import { collections } from "../../src/lib/activities/collections";
import { HISTORY_KEY } from "../../src/lib/storage/history";

test.setTimeout(60_000);

const button = (page: Page, name: string) =>
  page.getByRole("button", { name, exact: true });

test("an exhausted collection offers a single clear edit action and preserves its duration", async ({
  page,
}) => {
  await page.goto("/app");
  await page.getByRole("button", { name: /Bangkit dari kursi/ }).click();
  await page.getByRole("radio", { name: "2 menit", exact: true }).check();
  await button(page, "Cari kegiatan kecil").click();
  await button(page, "Kurang cocok").click();
  await button(page, "Kurang cocok").click();
  await expect(
    page.getByRole("heading", { name: "Pilihan sesi ini sudah dicoba." }),
  ).toBeVisible();
  await expect(button(page, "Ubah pilihan")).toHaveCount(1);
  await button(page, "Ubah pilihan").click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Bangkit dari kursi",
  );
  await expect(
    page.getByRole("radio", { name: "2 menit", exact: true }),
  ).toBeChecked();
});
async function choose(
  page: Page,
  goal = "Bergerak",
  energy: string | null = null,
  minutes = 5,
) {
  await button(page, "Lewati").click();
  await page.getByRole("radio", { name: goal }).check();
  await button(page, "Lanjut").click();
  if (energy) {
    await page.getByRole("radio", { name: energy }).check();
    await button(page, "Lanjut").click();
  } else await button(page, "Lewati").click();
  await page
    .getByRole("radio", { name: `${minutes} menit`, exact: true })
    .check();
  await button(page, "Cari kegiatan kecil").click();
}
async function shown(page: Page) {
  const title = await page.locator(".activity-content h2").innerText();
  return activities.find((activity) => activity.title === title)!;
}
async function finishQuick(page: Page) {
  await button(page, "Pilihkan saja").click();
  await button(page, "Mulai kegiatan").click();
  await button(page, "Selesai").click();
  await button(page, "Lewati").click();
}

test("quick suggestions vary and meet the advertised constraints without starting a timer", async ({
  page,
}) => {
  await page.goto("/app");
  await button(page, "Pilihkan saja").click();
  const first = await shown(page);
  expect(first.minutes).toBe(2);
  expect(first.energy).toBe("light");
  expect(first.requiredTools).toEqual([]);
  expect(first.places).toContain("indoor");
  await expect(page.getByRole("timer")).toHaveCount(0);
  await button(page, "Ubah pilihan").click();
  await expect(
    page.getByText("Langkah 1 dari 4", { exact: true }),
  ).toBeVisible();
  await button(page, "Pilihkan saja").click();
  expect((await shown(page)).id).not.toBe(first.id);
});

test("four steps preserve energy and duration across menus and backwards navigation", async ({
  page,
}) => {
  await page.goto("/app");
  await button(page, "Lewati").click();
  await page.getByRole("radio", { name: "Bergerak" }).check();
  await button(page, "Lanjut").click();
  await expect(
    page.getByText("Langkah 3 dari 4", { exact: true }),
  ).toBeVisible();
  await expect(button(page, "Lanjut")).toBeDisabled();
  await page.getByRole("radio", { name: "Ringan dulu" }).check();
  await button(page, "Lanjut").click();
  await page.getByRole("radio", { name: "10 menit", exact: true }).check();
  await button(page, "Favorit").click();
  await button(page, "Kegiatan").click();
  await expect(
    page.getByText("Langkah 4 dari 4", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("radio", { name: "10 menit", exact: true }),
  ).toBeChecked();
  await button(page, "Kembali").click();
  await expect(page.getByRole("radio", { name: "Ringan dulu" })).toBeChecked();
  await button(page, "Lewati").click();
  await button(page, "Cari kegiatan kecil").click();
  expect((await shown(page)).minutes).toBe(10);
});

test("each collection keeps its theme, duration and alternatives", async ({
  page,
}) => {
  for (const collection of collections) {
    await page.goto("/app");
    await page
      .getByRole("button", { name: new RegExp(collection.title) })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      collection.title,
    );
    await page.getByRole("radio", { name: "10 menit", exact: true }).check();
    await button(page, "Cari kegiatan kecil").click();
    const first = await shown(page);
    expect(first.minutes).toBe(10);
    expect(collection.activityIds).toContain(first.id);
    await button(page, "Kurang cocok").click();
    const second = await shown(page);
    expect(second.id).not.toBe(first.id);
    expect(second.minutes).toBe(10);
    expect(collection.activityIds).toContain(second.id);
    await button(page, "Ubah pilihan").click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      collection.title,
    );
    await expect(
      page.getByRole("radio", { name: "10 menit", exact: true }),
    ).toBeChecked();
    await button(page, "Kembali ke semua kegiatan").click();
    await expect(
      page.getByText("Langkah 1 dari 4", { exact: true }),
    ).toBeVisible();
  }
});

test("rejection reasons refer to the previous activity and unavailable tools stay excluded for the session", async ({
  page,
}) => {
  await page.goto("/app");
  await choose(page, "Refleksi/jeda layar", "Siap agak aktif");
  const first = await shown(page);
  expect(first.requiredTools).toContain("paper");
  await button(page, "Kurang cocok").click();
  expect((await shown(page)).id).not.toBe(first.id);
  await expect(page.locator(".rejection-reasons h2")).toContainText(
    first.title,
  );
  await button(page, "Tidak punya alatnya").click();
  expect((await shown(page)).requiredTools).not.toContain("paper");
  await expect(page.locator(".rejection-reasons")).toHaveCount(0);
  await page.reload();
  await choose(page, "Refleksi/jeda layar", "Siap agak aktif");
  expect((await shown(page)).id).toBe(first.id);
});

test("too-heavy feedback prefers light activities without requiring another wizard", async ({
  page,
}) => {
  await page.goto("/app");
  await choose(page, "Bergerak", "Siap agak aktif");
  await button(page, "Kurang cocok").click();
  await button(page, "Terlalu berat").click();
  expect((await shown(page)).energy).toBe("light");
  await expect(button(page, "Mulai kegiatan")).toBeVisible();
});

test("history records explicit completion, survives reload, replays, disables and deletes", async ({
  page,
}) => {
  await page.goto("/app");
  await finishQuick(page);
  await button(page, "Riwayat").click();
  await expect(page.locator(".history-row")).toHaveCount(1);
  await page.reload();
  await button(page, "Riwayat").click();
  await expect(page.locator(".history-row")).toHaveCount(1);
  await button(page, "Coba lagi").click();
  await expect(page.getByRole("timer")).toHaveCount(0);
  await button(page, "Mulai kegiatan").click();
  await button(page, "Selesai").click();
  await button(page, "Lewati").click();
  await button(page, "Riwayat").click();
  await expect(page.locator(".history-row")).toHaveCount(2);
  await page
    .getByRole("checkbox", { name: "Simpan kegiatan selesai" })
    .uncheck();
  await button(page, "Kegiatan").click();
  await finishQuick(page);
  await button(page, "Riwayat").click();
  await expect(page.locator(".history-row")).toHaveCount(2);
  await page
    .locator(".history-row")
    .first()
    .getByRole("button", { name: /^Hapus/ })
    .click();
  await expect(page.locator(".history-row")).toHaveCount(1);
  await button(page, "Hapus seluruh riwayat").click();
  await button(page, "Batal").click();
  await expect(page.locator(".history-row")).toHaveCount(1);
  await button(page, "Hapus seluruh riwayat").click();
  await button(page, "Ya, hapus semua").click();
  await expect(page.locator(".history-row")).toHaveCount(0);
  await page.reload();
  await button(page, "Riwayat").click();
  await expect(
    page.getByRole("checkbox", { name: "Simpan kegiatan selesai" }),
  ).not.toBeChecked();
});

test("elapsed, stopped and replaced activities do not create a history record", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/app");
  await button(page, "Pilihkan saja").click();
  await button(page, "Mulai kegiatan").click();
  await page.clock.fastForward(121_000);
  await expect(page.getByRole("timer")).toHaveText("00:00");
  expect(
    await page.evaluate((key) => localStorage.getItem(key), HISTORY_KEY),
  ).toBeNull();
  await button(page, "Berhenti").click();
  await button(page, "Riwayat").click();
  await expect(page.locator(".history-row")).toHaveCount(0);
  await button(page, "Kegiatan").click();
  await button(page, "Pilihkan saja").click();
  await button(page, "Mulai kegiatan").click();
  await button(page, "Ganti kegiatan").click();
  expect(
    await page.evaluate((key) => localStorage.getItem(key), HISTORY_KEY),
  ).toBeNull();
});

test("history changes sync between tabs and removed activities retain their snapshot", async ({
  page,
  context,
}) => {
  await page.goto("/app");
  const other = await context.newPage();
  await other.goto("/app");
  await button(other, "Riwayat").click();
  await finishQuick(page);
  await expect(other.locator(".history-row")).toHaveCount(1);
  await other
    .locator(".history-row")
    .getByRole("button", { name: /^Hapus/ })
    .click();
  await button(page, "Riwayat").click();
  await expect(page.locator(".history-row")).toHaveCount(0);
  await page.evaluate(
    (key) =>
      localStorage.setItem(
        key,
        JSON.stringify({
          enabled: true,
          entries: [
            {
              id: "removed-run",
              activityId: "removed-activity",
              title: "Kegiatan lama",
              goal: "move",
              minutes: 5,
              completedAt: 1700000000000,
            },
          ],
        }),
      ),
    HISTORY_KEY,
  );
  await page.reload();
  await button(page, "Riwayat").click();
  await expect(
    page.getByRole("heading", { name: "Kegiatan lama" }),
  ).toBeVisible();
  await expect(button(page, "Coba lagi")).toBeDisabled();
  await other.close();
});

test("storage write failure keeps successive completions usable in memory", async ({
  page,
}) => {
  await page.addInitScript((key) => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (name, value) {
      if (name === key) throw new DOMException("quota", "QuotaExceededError");
      original.call(this, name, value);
    };
  }, HISTORY_KEY);
  await page.goto("/app");
  await finishQuick(page);
  await finishQuick(page);
  await button(page, "Riwayat").click();
  await expect(page.locator(".history-row")).toHaveCount(2);
  expect(
    await page.evaluate((key) => localStorage.getItem(key), HISTORY_KEY),
  ).toBeNull();
});

test("new app surfaces reflow, respect reduced motion and have no axe or hydration errors", async ({
  page,
}, info) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    await page.goto("/app");
    await button(page, "Pilihkan saja").click();
    await button(page, "Ubah pilihan").click();
    await expect(
      page.getByRole("heading", { name: "Coba dari koleksi" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
    const results = await new AxeBuilder({ page })
      .include(".app-shell")
      .analyze();
    expect(results.violations).toEqual([]);
    await page.screenshot({
      path: `.impeccable/review/features-home-${width}-${info.project.name}.png`,
      fullPage: true,
    });
  }
  await finishQuick(page);
  await button(page, "Riwayat").click();
  expect(
    (await new AxeBuilder({ page }).include(".app-shell").analyze()).violations,
  ).toEqual([]);
  await page.screenshot({
    path: `.impeccable/review/features-history-${info.project.name}.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
});
