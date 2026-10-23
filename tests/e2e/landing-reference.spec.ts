import { expect, test } from "@playwright/test";
import sharp from "sharp";
import { stat, readFile } from "node:fs/promises";

test("licensed derivatives are local vectors and C1 uses bounded alpha exports", async () => {
  let total = 0;
  for (const name of ["phone", "diary"]) {
    const path = `public/brand/landing/motion/${name}.json`;
    const text = await readFile(path, "utf8");
    const data = JSON.parse(text);
    expect(data.fr).toBeGreaterThanOrEqual(30);
    expect(data.layers.length).toBeGreaterThan(0);
    expect(text).not.toMatch(/https?:|data:image|"nm":"Hand"|I am|worthy/);
    total += (await stat(path)).size;
    const poster = await sharp(
      `public/brand/landing/motion/${name}.svg`,
    ).metadata();
    expect(poster.width).toBeGreaterThan(500);
  }
  expect(total).toBeLessThan(150000);
  for (const name of ["idle", "wave"]) {
    const path = `public/brand/landing/motion/c1-${name}.webp`;
    const metadata = await sharp(path).metadata();
    expect(metadata.hasAlpha).toBe(true);
    expect(metadata.width).toBeLessThanOrEqual(800);
    expect((await stat(path)).size).toBeLessThan(60000);
  }
  const diary = JSON.parse(
    await readFile("public/brand/landing/motion/diary.json", "utf8"),
  );
  expect(
    diary.layers.filter((layer: { nm: string }) =>
      layer.nm.startsWith("Nudge neutral note"),
    ),
  ).toHaveLength(2);
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
