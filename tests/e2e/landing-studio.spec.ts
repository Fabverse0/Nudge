import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

test("landing tells eight distinct stories with decoded artwork", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Small steps.A fuller life.",
  );
  await expect(page.locator("h1")).toHaveAttribute("lang", "en");
  const scenes = page.locator("[data-alive-scene]");
  await expect(scenes).toHaveCount(8);
  expect(
    await scenes.evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("data-alive-scene")),
    ),
  ).toEqual([
    "hero",
    "phone",
    "time",
    "how",
    "move",
    "tidy",
    "journal",
    "welcome",
  ]);
  for (const scene of await scenes.all()) {
    await scene.scrollIntoViewIfNeeded();
    expect(
      await scene.evaluate(
        (node) =>
          Boolean(node.getAttribute("aria-label")) ||
          Boolean(node.getAttribute("aria-labelledby")),
      ),
    ).toBe(true);
    const kind = await scene.getAttribute("data-alive-scene");
    await expect(
      scene.locator(kind === "hero" ? ".hero-mascot-wave" : ".c1-portrait"),
    ).toHaveCount(kind === "hero" || kind === "welcome" ? 1 : 0);
    await expect
      .poll(() =>
        scene
          .locator("img")
          .evaluateAll((images: HTMLImageElement[]) =>
            images.every((image) => image.complete && image.naturalWidth > 0),
          ),
      )
      .toBe(true);
    if (kind !== "how") {
      await expect(scene).toHaveCSS("pointer-events", "none");
    }
  }
  await expect(
    page.getByText("Tulisanmu tetap milikmu. Nudge tidak menyimpannya."),
  ).toBeVisible();
  await expect(page.locator(".alive-closing [lang=en]")).toContainText(
    "Your next small step",
  );
});

test("native duration controls support keyboard and preserve every handoff", async ({
  page,
}) => {
  await page.goto("/");
  const five = page.getByRole("radio", { name: "5 menit", exact: true });
  await expect(five).toBeEnabled();
  await expect(five).toBeChecked();
  await five.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("radio", { name: "10 menit", exact: true }),
  ).toBeChecked();
  await expect(
    page.getByRole("link", { name: "Lanjut ke Nudge" }),
  ).toHaveAttribute("href", "/app?minutes=10");
  await page.keyboard.press("ArrowLeft");
  await expect(five).toBeChecked();
  for (const minutes of [2, 10, 5, 2]) {
    await page
      .getByRole("radio", { name: minutes + " menit", exact: true })
      .check();
    await expect(page.locator(".scene-time svg text").first()).toHaveText(
      String(minutes),
    );
    await expect(
      page.getByRole("link", { name: "Lanjut ke Nudge" }),
    ).toHaveAttribute("href", "/app?minutes=" + minutes);
  }
  await expect(page.locator(".alive-hero-cta")).toHaveAttribute("href", "/app");
  await expect(page.locator(".alive-closing .alive-button")).toHaveAttribute(
    "href",
    "/app",
  );
  await expect(
    page.getByText("Tanpa akun. Dua menit juga boleh."),
  ).toBeVisible();
});

test("all scene loops run in view and pause offscreen without resetting", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  for (const kind of [
    "hero",
    "phone",
    "time",
    "move",
    "tidy",
    "journal",
    "welcome",
  ]) {
    const scene = page.locator('[data-alive-scene="' + kind + '"]');
    await scene.scrollIntoViewIfNeeded();
    await expect(scene).toHaveAttribute("data-running", "true");
    if (kind === "phone" || kind === "journal") {
      const player = scene.locator("[data-motion-asset]");
      await expect(player).toHaveAttribute("data-loaded", "true");
      await expect(player).toHaveAttribute("data-playing", "true");
      const before = await player.locator(".motion-canvas").innerHTML();
      await expect
        .poll(() => player.locator(".motion-canvas").innerHTML())
        .not.toBe(before);
      continue;
    }
    const animations = await scene.evaluate((node) =>
      node.getAnimations({ subtree: true }).map((a) => ({
        duration: Number(a.effect!.getTiming().duration),
        infinite: a.effect!.getTiming().iterations === Infinity,
        state: a.playState,
      })),
    );
    if (kind === "hero") {
      expect(animations.length).toBeGreaterThan(0);
      expect(animations.some((a) => a.infinite && a.state === "running")).toBe(
        true,
      );
      expect(animations.every((a) => a.duration === 12000)).toBe(true);
      continue;
    }
    expect(animations.some((a) => a.infinite && a.state === "running")).toBe(
      true,
    );
    expect(
      animations.every((a) => a.duration >= 6000 && a.duration <= 10000),
    ).toBe(true);
  }
  const hero = page.locator(".scene-hero");
  await page.locator(".scene-welcome").scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute("data-running", "false");
  expect(
    await hero.evaluate((node) =>
      node
        .getAnimations({ subtree: true })
        .every((a) => a.playState !== "running"),
    ),
  ).toBe(true);
  await hero.scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute("data-running", "true");
  await expect(page.getByRole("button", { name: /jeda|pause/i })).toHaveCount(
    0,
  );
});

test("hero keeps C1 visible when animated pose downloads fail", async ({
  page,
}) => {
  await page.route("**/brand/landing/motion/c1-*.webp", (route) =>
    route.abort("failed"),
  );
  await page.goto("/");
  const hero = page.locator(".scene-hero");
  await expect(hero).toHaveAttribute("data-static", "true");
  const fallback = hero.locator(".hero-mascot-wave img");
  await expect(fallback).toHaveAttribute(
    "src",
    "/brand/mascot/nudge-turtle-wave.png",
  );
  await expect
    .poll(() =>
      fallback.evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await expect(hero.locator(".hero-mascot-wave")).toHaveCSS("opacity", "1");
  await expect(hero.locator("button")).toHaveCount(0);
  expect(
    await hero.evaluate((node) => node.getAnimations({ subtree: true }).length),
  ).toBe(0);
  await expect(page.locator(".alive-hero-cta")).toHaveAttribute("href", "/app");
});

test("hero loops automatically and pauses its timeline offscreen", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const hero = page.locator(".scene-hero");
  await hero.scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute("data-art-ready", "true");
  await expect(hero).toHaveAttribute("data-running", "true");
  await expect(hero.locator("button")).toHaveCount(0);
  await expect(page.getByText("Putar cerita", { exact: true })).toHaveCount(0);
  await expect
    .poll(
      () =>
        hero
          .locator(".hero-phone")
          .evaluate(
            (node) =>
              node.getAnimations()[0]?.effect?.getComputedTiming()
                .currentIteration ?? 0,
          ),
      { timeout: 16000 },
    )
    .toBeGreaterThanOrEqual(1);
  await page.locator(".scene-welcome").scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute("data-running", "false");
  const elapsed = () =>
    hero
      .locator(".hero-phone")
      .evaluate((node) => Number(node.getAnimations()[0].currentTime));
  const pausedAt = await elapsed();
  await page.waitForTimeout(250);
  expect(await elapsed()).toBeCloseTo(pausedAt, 0);
  await hero.scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute("data-running", "true");
  expect(await elapsed()).toBeGreaterThanOrEqual(pausedAt);
});

test("licensed players pause offscreen and leave visible static posters", async ({
  page,
}) => {
  await page.goto("/");
  const phone = page.locator(".scene-phone");
  await phone.scrollIntoViewIfNeeded();
  const player = phone.locator("[data-motion-asset]");
  await expect(player).toHaveAttribute("data-loaded", "true");
  await expect(player).toHaveAttribute("data-playing", "true");
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(player).toHaveAttribute("data-playing", "false");
  await page.evaluate(() => {
    Reflect.deleteProperty(document, "hidden");
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(player).toHaveAttribute("data-playing", "true");
  await page.locator(".scene-welcome").scrollIntoViewIfNeeded();
  await expect(player).toHaveAttribute("data-playing", "false");
  const stopped = await player.locator(".motion-canvas").innerHTML();
  await page.waitForTimeout(250);
  expect(await player.locator(".motion-canvas").innerHTML()).toBe(stopped);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(player.locator(".motion-poster")).toHaveCSS("opacity", "1");
  await expect(player.locator(".motion-canvas")).toHaveCSS("opacity", "0");
});

test("runtime reduced motion and hidden document halt all scene motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const hero = page.locator(".scene-hero");
  await expect(hero).toHaveAttribute("data-running", "true");
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(hero).toHaveAttribute("data-running", "false");
  expect(
    await hero.evaluate((node) =>
      node
        .getAnimations({ subtree: true })
        .every((a) => a.playState !== "running"),
    ),
  ).toBe(true);
  await page.evaluate(() => {
    Reflect.deleteProperty(document, "hidden");
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(hero).toHaveAttribute("data-running", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(hero).toHaveAttribute("data-running", "false");
  expect(
    await page
      .locator(".nudge-alive")
      .evaluate((node) => node.getAnimations({ subtree: true }).length),
  ).toBe(0);
  await page.getByRole("radio", { name: "2 menit", exact: true }).check();
  await expect(
    page.getByRole("link", { name: "Lanjut ke Nudge" }),
  ).toHaveAttribute("href", "/app?minutes=2");
});

test("landing reflows at five widths with visible controls and intact scenes", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await mkdir(".impeccable/review", { recursive: true });
  for (const width of [320, 390, 710, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.getByRole("heading", { level: 1 }).scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const h1 = page.locator("h1");
    const lines = await h1.evaluate(
      (node) =>
        node.getBoundingClientRect().height /
        parseFloat(getComputedStyle(node).lineHeight),
    );
    expect(lines).toBeLessThanOrEqual(2.1);
    for (const node of await page
      .locator(".alive-scene,.alive-time-options,.alive-closing")
      .all()) {
      const box = await node.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(-1);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
    }
    await page.screenshot({
      path:
        ".impeccable/review/alive-" +
        width +
        "-" +
        testInfo.project.name +
        ".png",
      fullPage: true,
    });
  }
});

test("landing supports enlarged text on a narrow screen", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.addStyleTag({
    content:
      ".nudge-alive h1,.nudge-alive h2,.nudge-alive h3,.nudge-alive p,.nudge-alive a,.nudge-alive legend,.nudge-alive strong,.alive-time-options span,.alive-time-options small {font-size:200% !important}",
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  for (const node of await page
    .locator(".alive-button,.alive-time-options,.alive-copy")
    .all()) {
    const box = await node.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(-1);
    expect(box!.x + box!.width).toBeLessThanOrEqual(321);
  }
});

test("without JavaScript the complete story and native links remain available", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto(baseURL! + "/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Small steps.",
    );
    await expect(page.locator("[data-alive-scene]")).toHaveCount(8);
    await expect(page.locator("fieldset")).toHaveAttribute("disabled", "");
    for (const radio of await page.getByRole("radio").all()) {
      await expect(radio).toBeDisabled();
    }
    await expect(
      page.getByRole("link", { name: "Lanjut ke Nudge" }),
    ).toHaveAttribute("href", "/app?minutes=5");
    expect(
      await page
        .locator("[data-alive-scene]")
        .evaluateAll((nodes) =>
          nodes.every((node) =>
            node
              .getAnimations({ subtree: true })
              .every((a) => a.playState !== "running"),
          ),
        ),
    ).toBe(true);
    await expect(page.locator(".alive-hero-cta")).toHaveAttribute(
      "href",
      "/app",
    );
  } finally {
    await context.close();
  }
});

test("landing has no automated accessibility violations in static mode", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByRole("radio", { name: "5 menit", exact: true }),
  ).toBeEnabled();
  const result = await new AxeBuilder({ page })
    .include(".nudge-alive")
    .analyze();
  expect(result.violations).toEqual([]);
});

test("failed illustration downloads leave the story and duration usable", async ({
  page,
}) => {
  await page.route("**/brand/landing/motion/*.json", (route) =>
    route.abort("failed"),
  );
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Small steps.",
  );
  await expect(page.locator(".alive-hero-cta")).toHaveAttribute("href", "/app");
  for (const kind of ["phone", "journal"]) {
    const scene = page.locator(`.scene-${kind}`);
    await scene.scrollIntoViewIfNeeded();
    await expect(scene.locator(".motion-poster")).toHaveCSS("opacity", "1");
    await expect(scene.locator(".motion-canvas")).toHaveCSS("opacity", "0");
    await expect
      .poll(() =>
        scene
          .locator("img")
          .evaluate(
            (image: HTMLImageElement) =>
              image.complete && image.naturalWidth > 0,
          ),
      )
      .toBe(true);
  }
  await page.getByRole("radio", { name: "2 menit", exact: true }).check();
  await expect(
    page.getByRole("link", { name: "Lanjut ke Nudge" }),
  ).toHaveAttribute("href", "/app?minutes=2");
  expect(
    await page
      .locator(".scene-hero")
      .evaluate((node) => node.getBoundingClientRect().height),
  ).toBeGreaterThan(150);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("landing has no browser errors and no fake app store controls", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(".nudge-alive")).toBeVisible();
  await page.getByRole("radio", { name: "2 menit", exact: true }).check();
  expect(errors).toEqual([]);
  await expect(
    page.getByRole("link", { name: /app store|google play/i }),
  ).toHaveCount(0);
});

test("licensed stories keep moving after two complete cycles", async ({
  browser,
  baseURL,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Desktop documents the long-running cycles; mobile lifecycle is covered separately",
  );
  test.setTimeout(90000);
  await mkdir(".impeccable/review/motion", { recursive: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    serviceWorkers: "block",
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  try {
    await page.goto(baseURL! + "/");
    for (const kind of ["phone", "journal"]) {
      const scene = page.locator(`.scene-${kind}`);
      await scene.scrollIntoViewIfNeeded();
      const player = scene.locator("[data-motion-asset]");
      await expect(player).toHaveAttribute("data-loaded", "true");
      // Both source cycles, including their final rests, are shorter than eleven seconds.
      await page.waitForTimeout(22000);
      const sample = await player.locator(".motion-canvas").innerHTML();
      await expect
        .poll(() => player.locator(".motion-canvas").innerHTML(), {
          timeout: 5000,
        })
        .not.toBe(sample);
      await page.screenshot({
        path: `.impeccable/review/motion/${kind}-cycles.png`,
      });
    }
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});
