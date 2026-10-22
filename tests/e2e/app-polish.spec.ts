import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const mood = (page: Page) =>
  page.getByRole("group", { name: /Lagi merasa bagaimana/ });
const goal = (page: Page) =>
  page.getByRole("group", { name: "Ingin melakukan apa?" });
const time = (page: Page) =>
  page.getByRole("group", { name: "Ada waktu berapa lama?" });
const next = (page: Page) =>
  page.getByRole("button", { name: "Lanjut", exact: true });
const back = (page: Page) =>
  page.getByRole("button", { name: "Kembali", exact: true });
const search = (page: Page) =>
  page.getByRole("button", { name: "Cari kegiatan kecil", exact: true });

async function step(page: Page, number: number) {
  await expect(
    page.getByText(`Langkah ${number} dari 3`, { exact: true }),
  ).toBeVisible();
  for (const [index, group] of [mood(page), goal(page), time(page)].entries()) {
    if (index + 1 === number) await expect(group).toBeVisible();
    else await expect(group).toHaveCount(0);
  }
  await expect(page.getByRole("timer")).toHaveCount(0);
}

async function selectTimeStep(page: Page) {
  await page.getByRole("button", { name: "Lewati", exact: true }).click();
  await page.getByRole("radio", { name: "Bergerak", exact: false }).check();
  await next(page).click();
  await page.getByRole("radio", { name: "2 menit", exact: true }).check();
}

test("wizard advances explicitly, validates required choices, and preserves values on back", async ({
  page,
}) => {
  await page.goto("/app");
  await step(page, 1);
  await expect(mood(page).getByRole("radio")).toHaveCount(4);
  await expect(mood(page)).toContainText("Opsional");
  await expect(
    page.getByRole("radio", { name: "Lewati", exact: true }),
  ).toHaveCount(0);
  await expect(next(page)).toBeDisabled();
  await expect(page.getByText("Tempat dan alat", { exact: false })).toHaveCount(
    0,
  );
  await page.getByRole("radio", { name: "Lelah", exact: true }).check();
  await step(page, 1);
  await expect(next(page)).toBeEnabled();
  await next(page).click();
  await step(page, 2);
  await expect(page.locator(".selection-step")).toBeFocused();
  await expect(next(page)).toBeDisabled();
  await expect(page.getByText("Tempat dan alat", { exact: false })).toHaveCount(
    0,
  );
  await page.getByRole("radio", { name: "Bergerak", exact: false }).check();
  await step(page, 2);
  await next(page).click();
  await step(page, 3);
  await expect(page.locator(".selection-step")).toBeFocused();
  await expect(search(page)).toBeDisabled();
  await page.getByRole("radio", { name: "5 menit", exact: true }).check();
  await step(page, 3);
  await expect(search(page)).toBeEnabled();
  await back(page).click();
  await step(page, 2);
  await expect(page.locator(".selection-step")).toBeFocused();
  await expect(
    page.getByRole("radio", { name: "Bergerak", exact: false }),
  ).toBeChecked();
  await back(page).click();
  await step(page, 1);
  await expect(page.locator(".selection-step")).toBeFocused();
  await expect(
    page.getByRole("radio", { name: "Lelah", exact: true }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Lewati", exact: true }).click();
  await step(page, 2);
  await back(page).click();
  await expect(mood(page).locator("input:checked")).toHaveCount(0);
  await page.getByRole("button", { name: "Lewati", exact: true }).click();
  await next(page).click();
  await expect(
    page.getByRole("radio", { name: "5 menit", exact: true }),
  ).toBeChecked();
});

test("menus preserve each wizard step and suggestion returns to its time choices", async ({
  page,
}) => {
  await page.goto("/app");
  for (const number of [1, 2, 3]) {
    if (number === 2)
      await page.getByRole("button", { name: "Lewati", exact: true }).click();
    if (number === 3) {
      await page.getByRole("radio", { name: "Bergerak", exact: false }).check();
      await next(page).click();
      await page.getByRole("radio", { name: "2 menit", exact: true }).check();
      await page.getByText("Tempat dan alat", { exact: false }).click();
      await page.getByLabel("Tempat", { exact: true }).selectOption("indoor");
      await page.getByLabel("Alat", { exact: true }).selectOption("none");
    }
    for (const menu of ["Favorit", "Pengingat"]) {
      await page.getByRole("button", { name: menu, exact: true }).click();
      await page.getByRole("button", { name: "Kegiatan", exact: true }).click();
      await step(page, number);
      await expect(page.locator(".screen-focus")).toBeFocused();
    }
  }
  await expect(
    page.getByRole("radio", { name: "2 menit", exact: true }),
  ).toBeChecked();
  await page.getByText("Tempat dan alat", { exact: false }).click();
  await expect(page.getByLabel("Tempat", { exact: true })).toHaveValue(
    "indoor",
  );
  await expect(page.getByLabel("Alat", { exact: true })).toHaveValue("none");
  await search(page).click();
  await page.getByRole("button", { name: "Ubah pilihan", exact: true }).click();
  await step(page, 3);
  await expect(
    page.getByRole("radio", { name: "2 menit", exact: true }),
  ).toBeChecked();
});

test("changing selection context clears rejected activities for the next search", async ({
  page,
}) => {
  await page.goto("/app");
  await selectTimeStep(page);
  await search(page).click();
  const originalTitle = await page.locator(".activity-content h2").innerText();
  await page.getByRole("button", { name: "Kurang cocok", exact: true }).click();
  await expect(page.locator(".activity-content h2")).not.toHaveText(
    originalTitle,
  );
  await page.getByRole("button", { name: "Ubah pilihan", exact: true }).click();
  await page.getByRole("radio", { name: "5 menit", exact: true }).check();
  await page.getByRole("radio", { name: "2 menit", exact: true }).check();
  await search(page).click();
  await expect(page.locator(".activity-content h2")).toHaveText(originalTitle);
});

test("timer primary control follows running, paused and elapsed states", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/app");
  await selectTimeStep(page);
  await search(page).click();
  await page
    .getByRole("button", { name: "Mulai kegiatan", exact: true })
    .click();
  const finish = page.getByRole("button", { name: "Selesai", exact: true });
  await expect(
    page.getByRole("button", { name: "Jeda", exact: true }),
  ).toHaveClass(/\bprimary\b/);
  await expect(finish).toHaveClass(/\bsecondary\b/);
  await page.getByRole("button", { name: "Jeda", exact: true }).click();
  await expect(next(page)).toHaveClass(/\bprimary\b/);
  await expect(finish).toHaveClass(/\bsecondary\b/);
  await next(page).click();
  await page.clock.fastForward(120_000);
  await expect(finish).toHaveClass(/\bprimary\b/);
  await expect(
    page.getByRole("button", { name: "Jeda", exact: true }),
  ).toHaveCount(0);
  await finish.click();
  await page.getByRole("button", { name: "Bosan", exact: true }).click();
  await step(page, 1);
  await expect(
    page.getByRole("radio", { name: "Bosan", exact: true }),
  ).toBeChecked();
  await next(page).click();
  await expect(
    page.getByRole("radio", { name: "Bergerak", exact: false }),
  ).toBeChecked();
  await next(page).click();
  await expect(
    page.getByRole("radio", { name: "2 menit", exact: true }),
  ).toBeChecked();
});

test("goal and time steps have no automated accessibility violations", async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.goto("/app");
  await page.getByRole("button", { name: "Lewati", exact: true }).click();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole("radio", { name: "Bergerak", exact: false }).check();
  await next(page).click();
  await page.getByText("Tempat dan alat", { exact: false }).click();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

for (const { width, enlarged } of [
  ...[320, 390, 710, 768, 1440].map((width) => ({ width, enlarged: false })),
  { width: 320, enlarged: true },
]) {
  test(`all app screens reflow at ${width}${enlarged ? " with 200% text" : ""}`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(60_000);
    await page.clock.install();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/app");
    if (enlarged)
      await page.evaluate(() => {
        document.documentElement.style.fontSize = "200%";
      });
    const check = async (screen: string) => {
      const overflowing = await page
        .locator("header, nav, main, footer")
        .evaluateAll((roots) =>
          roots
            .flatMap((root) => [
              ...root.querySelectorAll(
                "h1, h2, h3, p, button, label, summary, select, .timer-display",
              ),
            ])
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              return (
                rect.width > 0 &&
                (rect.left < -1 ||
                  rect.right > innerWidth + 1 ||
                  element.scrollWidth > element.clientWidth + 1)
              );
            })
            .map((element) => ({
              tag: element.tagName,
              text: element.textContent,
            })),
        );
      expect(overflowing, screen).toEqual([]);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        screen,
      ).toBe(true);
      expect(
        await page.evaluate(
          () =>
            document
              .getAnimations()
              .filter((animation) => animation.playState === "running").length,
        ),
        screen,
      ).toBe(0);
      if (width === 390 || enlarged)
        await page.screenshot({
          path: testInfo.outputPath(`${screen}.png`),
          fullPage: true,
          animations: "disabled",
        });
    };
    await check("mood");
    await page.getByRole("button", { name: "Favorit", exact: true }).click();
    await check("favorites-empty");
    await page.getByRole("button", { name: "Pengingat", exact: true }).click();
    await check("reminders");
    await page.getByRole("button", { name: "Kegiatan", exact: true }).click();
    await page.getByRole("button", { name: "Lewati", exact: true }).click();
    await check("goal");
    await page.getByRole("radio", { name: "Bergerak", exact: false }).check();
    await next(page).click();
    await page.getByRole("radio", { name: "2 menit", exact: true }).check();
    await page.getByText("Tempat dan alat", { exact: false }).click();
    await check("time");
    await search(page).click();
    await check("suggestion");
    const title = await page.locator(".activity-content h2").innerText();
    await page
      .getByRole("button", { name: "Simpan ke favorit", exact: true })
      .click();
    await page.getByRole("button", { name: "Favorit", exact: true }).click();
    await check("favorites-saved");
    await page.getByRole("button", { name: title, exact: true }).click();
    await page
      .getByRole("button", { name: "Mulai kegiatan", exact: true })
      .click();
    await check("timer-running");
    await page.getByRole("button", { name: "Jeda", exact: true }).click();
    await check("timer-paused");
    await next(page).click();
    await page.clock.fastForward(120_000);
    await expect(page.getByRole("timer")).toHaveText("00:00");
    await check("timer-elapsed");
    await page.getByRole("button", { name: "Selesai", exact: true }).click();
    await check("completion");
  });
}
