import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function choose(
  page: import("@playwright/test").Page,
  goal = "Bergerak",
) {
  await page
    .getByRole("group", { name: "Ingin melakukan apa?" })
    .getByRole("radio", { name: goal, exact: false })
    .check();
  await page.getByRole("radio", { name: "2 menit" }).check();
  await page.getByRole("button", { name: "Cari kegiatan kecil" }).click();
}

test("landing gives a real route to the app and never auto-starts", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Jeda dulu.",
  );
  await page.getByRole("link", { name: "Mulai satu kegiatan" }).click();
  await expect(page).toHaveURL(/\/app$/);
  await expect(
    page.getByRole("heading", { name: "Mau mulai dari apa?" }),
  ).toBeVisible();
  await expect(page.getByRole("timer")).toHaveCount(0);
});

test("optional mood, validation, pause, elapsed and explicit completion", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/app");
  await page.getByRole("button", { name: "Cari kegiatan kecil" }).click();
  await expect(page.getByRole("main").getByRole("alert")).toContainText(
    "Pilih tujuan dan waktu",
  );
  await expect(
    page.getByRole("radio", { name: "Lewati", exact: true }),
  ).toBeChecked();
  await choose(page);
  await page.getByRole("button", { name: "Cocok", exact: true }).click();
  await expect(page.getByRole("timer")).toHaveCount(0);
  await page.getByRole("button", { name: "Mulai kegiatan" }).click();
  await expect(page.getByRole("timer")).toHaveText("02:00");
  await page.clock.fastForward(20_000);
  await page.getByRole("button", { name: "Jeda", exact: true }).click();
  const paused = await page.getByRole("timer").innerText();
  await page.clock.fastForward(30_000);
  await expect(page.getByRole("timer")).toHaveText(paused);
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await page.clock.fastForward(120_000);
  await expect(page.getByRole("timer")).toHaveText("00:00");
  await expect(page.getByText("Waktunya habis. Sudah selesai?")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Mood kamu berubah?" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Selesai", exact: true }).click();
  await page.getByRole("button", { name: "Lewati", exact: true }).click();
  await expect(
    page.getByRole("radio", { name: "Lewati", exact: true }),
  ).toBeChecked();
  await expect(page).toHaveURL(/\/app$/);
});

test("mood stays the same on skip and feedback resets on reload", async ({
  page,
}) => {
  await page.goto("/app");
  await page.getByRole("radio", { name: "Lelah", exact: true }).check();
  await choose(page);
  await page.getByRole("button", { name: "Mulai kegiatan" }).click();
  await page.getByRole("button", { name: "Selesai", exact: true }).click();
  await page.getByRole("button", { name: "Lewati", exact: true }).click();
  await expect(
    page.getByRole("radio", { name: "Lelah", exact: true }),
  ).toBeChecked();
  await page.reload();
  await expect(
    page.getByRole("radio", { name: "Lewati", exact: true }),
  ).toBeChecked();
});

test("alternatives explain differing filters, exhaust, and restart", async ({
  page,
}) => {
  await page.goto("/app");
  await page
    .getByRole("radio", { name: "Produktif ringan", exact: false })
    .check();
  await page.getByRole("radio", { name: "2 menit" }).check();
  await page.getByText("Tempat dan alat", { exact: false }).click();
  await page.getByLabel("Tempat", { exact: true }).selectOption("outdoor");
  await page.getByRole("button", { name: "Cari kegiatan kecil" }).click();
  await page.getByRole("button", { name: "Kurang cocok" }).click();
  await expect(
    page.getByText("Alternatif dengan kondisi berbeda"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Kurang cocok" }).click();
  await expect(
    page.getByRole("heading", { name: "Pilihan sesi ini sudah dicoba." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Lihat saran lagi" }).click();
  await expect(
    page.getByRole("button", { name: "Mulai kegiatan" }),
  ).toBeVisible();
});

test("favorites persist, open their own details and remove", async ({
  page,
}) => {
  await page.goto("/app");
  await choose(page);
  const title = await page.locator(".activity-content h2").innerText();
  await page.getByRole("button", { name: "Simpan ke favorit" }).click();
  await page.reload();
  await page.getByRole("button", { name: "Favorit", exact: true }).click();
  await page.getByRole("button", { name: title, exact: true }).click();
  await expect(
    page.getByText("Dibuka dari favoritmu.", { exact: false }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Hapus dari favorit", exact: true })
    .click();
  await page.getByRole("button", { name: "Favorit", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Belum ada favorit." }),
  ).toBeVisible();
});

test("journaling keeps writing outside the application", async ({ page }) => {
  await page.goto("/app");
  await page.getByRole("radio", { name: "Bosan", exact: true }).check();
  await page
    .getByRole("radio", { name: "Refleksi/jeda layar", exact: false })
    .check();
  await page.getByRole("radio", { name: "5 menit" }).check();
  await page.getByRole("button", { name: "Cari kegiatan kecil" }).click();
  await expect(
    page.getByRole("heading", { name: "Journaling sebentar" }),
  ).toBeVisible();
  await expect(
    page.getByText("Nudge tidak mengumpulkan", { exact: false }),
  ).toBeVisible();
  await expect(page.locator("textarea")).toHaveCount(0);
  await page.getByRole("button", { name: "Mulai kegiatan" }).click();
  await page.getByRole("button", { name: "Berhenti", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Mau mulai dari apa?" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Satu langkah sudah." }),
  ).toHaveCount(0);
});

test("corrupt and blocked local data does not block manual activities", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage unavailable");
      },
    });
  });
  await page.goto("/app");
  await choose(page);
  await page.getByRole("button", { name: "Simpan ke favorit" }).click();
  await expect(page.getByRole("status")).toContainText(
    "penyimpanan lokal tidak tersedia",
  );
  await page.getByRole("button", { name: "Mulai kegiatan" }).click();
  await expect(page.getByRole("timer")).toBeVisible();
});

test("keyboard and accessibility on landing, selection and suggestion", async ({
  page,
}) => {
  // Three Axe audits share this test's deadline.
  test.setTimeout(60_000);
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Lewati ke isi" })).toBeFocused();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.goto("/app");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await choose(page);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("manifest launches selection without starting timer", async ({
  request,
  page,
}) => {
  const response = await request.get("/manifest.webmanifest");
  const manifest = await response.json();
  expect(manifest.start_url).toBe("/app");
  await page.goto(manifest.start_url);
  await expect(page.getByRole("timer")).toHaveCount(0);
});

test("changing mood updates the next selection and changing activity stops the previous timer", async ({
  page,
}) => {
  await page.goto("/app");
  await choose(page);
  await page.getByRole("button", { name: "Mulai kegiatan" }).click();
  await page
    .getByRole("button", { name: "Ganti kegiatan", exact: true })
    .click();
  await expect(page.getByRole("timer")).toHaveCount(0);
  await page.getByRole("button", { name: "Mulai kegiatan" }).click();
  await page.getByRole("button", { name: "Selesai", exact: true }).click();
  await page.getByRole("button", { name: "Bosan", exact: true }).click();
  await expect(
    page.getByRole("radio", { name: "Bosan", exact: true }),
  ).toBeChecked();
});

test("layout has no horizontal overflow at 320, 768 and 1440", async ({
  page,
}) => {
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/app"]) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflow, `${path} at ${width}`).toBe(false);
    }
  }
});

test("keyboard choices work and every remaining screen has accessible controls", async ({
  page,
}, testInfo) => {
  await page.goto("/app");
  await page.screenshot({
    path: `.impeccable/review/app-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await page
    .getByRole("radio", { name: "Lelah", exact: true })
    .press("ArrowRight");
  await expect(
    page.getByRole("radio", { name: "Bosan", exact: true }),
  ).toBeChecked();
  await page
    .getByRole("group", { name: "Ingin melakukan apa?" })
    .getByRole("radio", { name: "Bergerak", exact: false })
    .press("Space");
  await page.getByRole("radio", { name: "2 menit" }).press("Space");
  await page
    .getByRole("button", { name: "Cari kegiatan kecil" })
    .press("Enter");
  await page.getByRole("button", { name: "Mulai kegiatan" }).press("Enter");
  await page.screenshot({
    path: `.impeccable/review/timer-${testInfo.project.name}.png`,
    fullPage: true,
  });
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page
    .getByRole("button", { name: "Selesai", exact: true })
    .press("Enter");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page
    .getByRole("button", { name: "Lewati", exact: true })
    .press("Enter");
  await page
    .getByRole("button", { name: "Favorit", exact: true })
    .press("Enter");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page
    .getByRole("button", { name: "Pengingat", exact: true })
    .press("Enter");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("large text and reduced motion keep controls inside a narrow viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/app");
  await page.getByRole("button", { name: "Favorit", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Belum ada favorit." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Kegiatan", exact: true }).click();
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  const overflowing = () =>
    page.evaluate(() =>
      [...document.querySelectorAll("main *, nav *")]
        .filter(
          (el) => el.getBoundingClientRect().right > window.innerWidth + 1,
        )
        .map((el) => ({
          tag: el.tagName,
          class: el.className,
          text: el.textContent?.slice(0, 45),
        })),
    );
  expect(await overflowing()).toEqual([]);
  await choose(page);
  await page.getByRole("button", { name: "Mulai kegiatan" }).click();
  expect(await overflowing()).toEqual([]);
  await page.getByRole("button", { name: "Selesai", exact: true }).click();
  expect(await overflowing()).toEqual([]);
});
