import { expect, test } from "@playwright/test";
import { stat } from "node:fs/promises";
import sharp from "sharp";

test("first-step hero is transparent, within budget, and arranged for each viewport", async ({
  page,
}) => {
  expect(
    (await stat("public/brand/landing/nudge-first-step.webp")).size,
  ).toBeLessThanOrEqual(150_000);
  const metadata = await sharp(
    "public/brand/landing/nudge-first-step.webp",
  ).metadata();
  expect(metadata.hasAlpha).toBe(true);
  expect([metadata.width, metadata.height]).toEqual([1200, 900]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("radio", { name: "5 menit", exact: true }).check();
  const image = page.locator(".studio-hero-art");
  await expect(image).toHaveAttribute("src", /nudge-first-step/);
  await expect
    .poll(() =>
      image.evaluate(
        (node: HTMLImageElement) => node.complete && node.naturalWidth > 0,
      ),
    )
    .toBe(true);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    const imageBox = await image.boundingBox();
    const copyBox = await page.locator(".hero-copy").boundingBox();
    const actionBox = await page.locator(".hero-cta").boundingBox();
    if (width <= 700) {
      expect(imageBox!.y + imageBox!.height).toBeLessThanOrEqual(copyBox!.y);
      expect(imageBox!.width).toBeLessThanOrEqual(280);
      expect(actionBox!.y + actionBox!.height).toBeLessThan(844);
    } else {
      expect(imageBox!.x + imageBox!.width).toBeLessThan(copyBox!.x);
      expect(Math.abs(imageBox!.y - copyBox!.y)).toBeLessThan(120);
    }
  }
});

test("sticky header stays compact and the real how-to anchor clears it", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("radio", { name: "5 menit", exact: true }).check();
  await page.setViewportSize({ width: 320, height: 844 });
  const brand = await page.locator(".site-header .brand").boundingBox();
  const action = await page.locator(".site-header .button").boundingBox();
  expect(Math.abs(brand!.y - action!.y)).toBeLessThan(6);
  expect(brand!.x + brand!.width).toBeLessThan(action!.x);
  expect(action!.x + action!.width).toBeLessThanOrEqual(320);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.getByRole("link", { name: "Cara pakai", exact: true }).click();
  await expect(page).toHaveURL(/#cara-pakai$/);
  const header = await page.locator(".site-header").boundingBox();
  const heading = await page.locator("#cara-pakai h2").boundingBox();
  expect(header!.y).toBeCloseTo(0, 0);
  expect(heading!.y).toBeGreaterThanOrEqual(header!.height);
  await expect(page.locator(".site-header .button")).toHaveAttribute(
    "href",
    "/app",
  );
});

test("reference rhythm uses benefits before steps and only the movement frame is colored", async ({
  page,
}) => {
  await page.goto("/");
  const order = await page
    .locator("main > section")
    .evaluateAll((nodes) => nodes.map((node) => node.className));
  expect(order.map((name) => name.split(" ")[0])).toEqual([
    "hero",
    "hero-demo",
    "activity-world",
    "small-start",
    "your-pace",
    "closing",
  ]);
  await expect(
    page.locator(".studio-category-tidy .studio-art-frame"),
  ).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(
    page.locator(".studio-category-journal .studio-art-frame"),
  ).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(
    page.locator(".studio-category-move .studio-art-frame"),
  ).toHaveCSS("background-color", "rgb(126, 173, 219)");
});

test("tactile CTA gives press feedback without shifting the page", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.getByRole("radio", { name: "5 menit", exact: true }).check();
  const action = page.locator(".hero-cta");
  await action.scrollIntoViewIfNeeded();
  const initial = await action.boundingBox();
  const footnote = await page.locator(".hero-footnote").boundingBox();
  await expect(action).toHaveCSS("border-bottom-width", "4px");
  await page.mouse.move(
    initial!.x + initial!.width / 2,
    initial!.y + initial!.height / 2,
  );
  await page.mouse.down();
  try {
    await expect(action).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 2)");
    const pressed = await action.boundingBox();
    expect(pressed!.height).toBe(initial!.height);
    expect((await page.locator(".hero-footnote").boundingBox())!.y).toBe(
      footnote!.y,
    );
  } finally {
    await page.mouse.move(0, 0);
    await page.mouse.up();
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(action).toHaveCSS("transform", "none");
});
