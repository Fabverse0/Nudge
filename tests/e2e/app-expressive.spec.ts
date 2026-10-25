import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 390, 768, 1440]) {
  test(`expressive application remains usable across its full path at ${width}px`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 960 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    async function capture(name: string) {
      await expect(page.locator(".app-main")).toBeVisible();
      await expect
        .poll(() =>
          page
            .locator(".app-main img")
            .evaluateAll((images) =>
              images.every(
                (image) =>
                  (image as HTMLImageElement).complete &&
                  (image as HTMLImageElement).naturalWidth > 0,
              ),
            ),
        )
        .toBe(true);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
      ).toBe(false);
      const accessibility = await new AxeBuilder({ page })
        .include(".app-shell")
        .analyze();
      expect(accessibility.violations).toEqual([]);
      await page.screenshot({
        path: `.impeccable/review/app-expressive-${name}-${width}-${testInfo.project.name}.png`,
        fullPage: true,
      });
    }
    await page.goto("/app");
    await capture("mood");
    await page.getByRole("radio", { name: "Lelah", exact: true }).check();
    await page.getByRole("button", { name: "Lanjut", exact: true }).click();
    await capture("goal");
    await page.getByRole("radio", { name: "Bergerak", exact: false }).check();
    await page.getByRole("button", { name: "Lanjut", exact: true }).click();
    await page.getByRole("radio", { name: "2 menit", exact: true }).check();
    await capture("time");
    await page.getByRole("button", { name: "Cari kegiatan kecil" }).click();
    await capture("suggestion");
    const title = await page.locator(".activity-content h2").innerText();
    await page.getByRole("button", { name: "Simpan ke favorit" }).click();
    await page.getByRole("button", { name: "Favorit", exact: true }).click();
    await capture("favorites");
    await page.reload();
    await page.getByRole("button", { name: "Favorit", exact: true }).click();
    await page.getByRole("button", { name: title, exact: true }).click();
    await page
      .getByRole("button", { name: "Mulai kegiatan", exact: true })
      .click();
    await page.getByRole("button", { name: "Jeda", exact: true }).click();
    await capture("timer");
    expect(
      await page
        .locator(".timer-screen")
        .evaluate((element) => element.getAnimations({ subtree: true }).length),
    ).toBe(0);
    await page.getByRole("button", { name: "Selesai", exact: true }).click();
    await capture("completion");
    await page.getByRole("button", { name: "Lewati", exact: true }).click();
    await page.getByRole("button", { name: "Pengingat", exact: true }).click();
    await capture("reminders");
    await expect(
      page.getByRole("checkbox", { name: /Aktifkan pengingat/ }),
    ).not.toBeChecked();
    expect(errors).toEqual([]);
  });
}

test("expressive mood feedback respects reduced motion and native keyboard choices", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/app");
  await page.getByRole("radio", { name: "Lelah", exact: true }).press("Space");
  await expect(
    page.getByRole("radio", { name: "Lelah", exact: true }),
  ).toBeChecked();
  await expect(
    page.getByRole("button", { name: "Lanjut", exact: true }),
  ).toBeEnabled();
  expect(
    await page
      .locator(".app-shell")
      .evaluate((element) => element.getAnimations({ subtree: true }).length),
  ).toBe(0);
});
