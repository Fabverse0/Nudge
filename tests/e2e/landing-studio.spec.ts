import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function activate(page: import("@playwright/test").Page) {
  await page.getByRole("radio", { name: "2 menit", exact: true }).check();
  await expect(
    page.getByRole("heading", { name: "Kembalikan lima benda" }),
  ).toBeVisible();
}

test("landing review uses a clear check, step icons and walking art", async ({
  page,
}) => {
  await page.goto("/");
  await activate(page);
  const selected = page
    .locator(".demo-duration label")
    .filter({ has: page.getByRole("radio", { name: "2 menit", exact: true }) });
  await expect(selected.locator(".demo-selection")).toBeVisible();
  expect(
    await selected
      .locator(".demo-selection")
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).width)),
  ).toBe(24);
  await expect(page.locator(".start-activity-icon")).toHaveCount(2);
  await expect(page.locator(".studio-category-move img")).toHaveAttribute(
    "src",
    /nudge-turtle-walk/,
  );
  await expect(page.locator('.closing [lang="en"]')).toContainText(
    "Small steps. A fuller life.",
  );
  await expect(
    page.getByRole("link", { name: "Mulai kegiatan", exact: true }),
  ).toHaveAttribute("href", "/app");
});

test("studio duration supports keyboard, rapid changes and the real app route", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(
    page.getByRole("radio", { name: "5 menit", exact: true }),
  ).toBeChecked();
  await activate(page);
  await page
    .getByRole("radio", { name: "2 menit", exact: true })
    .press("ArrowRight");
  await expect(
    page.getByRole("radio", { name: "5 menit", exact: true }),
  ).toBeChecked();
  for (const minutes of [10, 2, 5, 2, 10]) {
    await page
      .getByRole("radio", { name: `${minutes} menit`, exact: true })
      .check();
    await expect(
      page.getByRole("link", { name: "Pilih kegiatanku" }),
    ).toHaveAttribute("href", `/app?minutes=${minutes}`);
  }
  await expect(
    page.getByRole("heading", { name: "Jeda tanpa layar" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Pilih kegiatanku" }).click();
  await expect(
    page.getByRole("heading", { name: "Mau mulai dari apa?" }),
  ).toBeVisible();
  await expect(
    page.getByRole("radio", { name: "10 menit", exact: true }),
  ).toBeChecked();
  await expect(page.getByRole("timer")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("studio images and text reflow at four widths", async ({
  page,
}, testInfo) => {
  test.setTimeout(90_000);
  await page.goto("/");
  await activate(page);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(() =>
        page
          .locator(".studio-hero-art")
          .evaluate(
            (image: HTMLImageElement) =>
              image.complete && image.naturalWidth > 0,
          ),
      )
      .toBe(true);
    for (const image of await page.locator(".studio-category img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (element: HTMLImageElement) =>
              element.complete && element.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
    const layout = await page.evaluate(() => ({
      heroLoaded: [
        ...document.querySelectorAll<HTMLImageElement>(".studio-hero-art"),
      ].every((image) => image.complete && image.naturalWidth > 0),
      illustrationWidths: [
        ...document.querySelectorAll(".category-illustration"),
      ].map((element) => element.getBoundingClientRect().width),
      clippedText: [
        ...document.querySelectorAll(
          ".landing h1, .landing h2, .landing h3, .landing p, .landing a",
        ),
      ]
        .filter((element) => {
          const bounds = element.getBoundingClientRect();
          return (
            bounds.left < -1 ||
            bounds.right > innerWidth + 1 ||
            element.scrollWidth > element.clientWidth + 1
          );
        })
        .map((element) => element.textContent),
    }));
    expect(layout.heroLoaded).toBe(true);
    expect(layout.illustrationWidths.every((size) => size >= 240)).toBe(true);
    expect(layout.clippedText).toEqual([]);
    await page.getByRole("heading", { level: 1 }).scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `.impeccable/review/studio-${width}-${testInfo.project.name}.png`,
      fullPage: true,
      animations: "disabled",
    });
  }
});

test("studio reflows enlarged text on a narrow screen", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/");
  await activate(page);
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  const failures = await page.evaluate(() =>
    [
      ...document.querySelectorAll(
        ".landing h1, .landing h2, .landing h3, .landing p, .landing a, .flow-word, .demo-duration label > span",
      ),
    ]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return (
          rect.left < -1 ||
          rect.right > innerWidth + 1 ||
          element.scrollWidth > element.clientWidth + 1
        );
      })
      .map((element) => element.textContent),
  );
  expect(failures).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("studio motion runs once and honors a live reduced-motion change", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    const calls: string[] = [];
    Object.defineProperty(window, "studioMotionCalls", { value: calls });
    document.addEventListener("animationstart", (event) => {
      if (event.target instanceof Element)
        calls.push(event.target.className.toString());
    });
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (...args) {
      calls.push(this.className.toString());
      return animate.apply(this, args);
    };
  });
  const calls = () =>
    page.evaluate(
      () =>
        (window as unknown as { studioMotionCalls: string[] })
          .studioMotionCalls,
    );
  await page.goto("/");
  await activate(page);
  await expect
    .poll(
      async () =>
        (await calls()).filter((name) => name.includes("studio-hero-art"))
          .length,
    )
    .toBe(1);
  await page.locator(".studio-category-journal").scrollIntoViewIfNeeded();
  await expect
    .poll(
      async () =>
        (await calls()).filter((name) => name.includes("studio-art-frame"))
          .length,
    )
    .toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document
            .getAnimations()
            .filter((animation) => animation.playState === "running").length,
      ),
    )
    .toBe(0);
  const reducedCalls = (await calls()).length;
  await page.getByRole("radio", { name: "10 menit", exact: true }).check();
  await expect(
    page.getByRole("heading", { name: "Jeda tanpa layar" }),
  ).toBeVisible();
  expect((await calls()).length).toBe(reducedCalls);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("heading", { level: 1 }).scrollIntoViewIfNeeded();
  expect(
    (await calls()).filter((name) => name.includes("studio-hero-art")),
  ).toHaveLength(1);
});

test("studio remains readable without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  try {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Jeda dulu.",
    );
    await expect(
      page.getByRole("link", { name: "Mulai satu kegiatan" }),
    ).toHaveAttribute("href", "/app");
    await expect(
      page.getByText("Contoh ini memakai lima menit.", { exact: false }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "2 menit", exact: true }),
    ).toBeDisabled();
    await expect(
      page.getByRole("link", { name: "Pilih kegiatanku" }),
    ).toHaveAttribute("href", "/app?minutes=5");
    await expect(
      page.getByRole("heading", { name: "Refleksi dan jeda" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  } finally {
    await context.close();
  }
});

test("studio has no automated accessibility violations with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await activate(page);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
