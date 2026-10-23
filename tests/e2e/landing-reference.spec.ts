import { expect, test } from "@playwright/test";
import sharp from "sharp";
import { stat } from "node:fs/promises";

test("new clay atlas exports have alpha and a bounded shared download", async () => {
  let total = 0;
  for (const name of [
    "shell",
    "head",
    "happy",
    "foot-left",
    "foot-right",
    "foot-back",
  ]) {
    const path = "public/brand/landing/alive/" + name + ".webp";
    const metadata = await sharp(path).metadata();
    expect(metadata.hasAlpha).toBe(true);
    expect(metadata.width).toBeLessThanOrEqual(600);
    total += (await stat(path)).size;
  }
  expect(total).toBeLessThan(100000);
});

test("hero art precedes copy on mobile and sits left on desktop", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const art = await page.locator(".alive-hero .alive-scene").boundingBox();
    const copy = await page.locator(".alive-hero .alive-copy").boundingBox();
    const cta = await page.locator(".alive-hero-cta").boundingBox();
    if (width <= 700) {
      expect(art!.y + art!.height).toBeLessThanOrEqual(copy!.y + 1);
      expect(cta!.y + cta!.height).toBeLessThan(844);
    } else {
      expect(art!.x + art!.width).toBeLessThanOrEqual(copy!.x + 10);
    }
  }
});

test("sticky header and how-to anchor remain clear on small screens", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const header = await page.locator(".alive-header").boundingBox();
    expect(header!.height).toBeLessThanOrEqual(100);
    const brand = await page.locator(".alive-header .brand").boundingBox();
    const cta = await page.locator(".alive-header-cta").boundingBox();
    expect(brand!.x + brand!.width).toBeLessThan(cta!.x);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.getByRole("link", { name: "Cara pakai", exact: true }).click();
  await expect(page).toHaveURL(/#cara-pakai$/);
  await expect
    .poll(async () => {
      const title = await page.locator("#time-title").boundingBox();
      const header = await page.locator(".alive-header").boundingBox();
      return title!.y >= header!.height;
    })
    .toBe(true);
});

test("tactile CTA presses without moving surrounding content", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const cta = page.locator(".alive-hero-cta");
  await cta.scrollIntoViewIfNeeded();
  const before = await page.locator(".alive-hero .alive-note").boundingBox();
  await cta.hover();
  await page.mouse.down();
  await expect
    .poll(() => cta.evaluate((node) => getComputedStyle(node).transform))
    .not.toBe("none");
  const after = await page.locator(".alive-hero .alive-note").boundingBox();
  expect(Math.abs(after!.y - before!.y)).toBeLessThan(1);
  await page.mouse.move(0, 0);
  await page.mouse.up();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(cta).toHaveCSS("transition-duration", "0s");
});
