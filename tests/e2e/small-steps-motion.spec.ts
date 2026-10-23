import { expect, test, type Page } from "@playwright/test";

async function startMoving(page: Page) {
  await page.goto("/app");
  await page.getByRole("button", { name: "Lewati", exact: true }).click();
  await page.getByRole("radio", { name: "Bergerak", exact: false }).check();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await page.getByRole("radio", { name: "2 menit", exact: true }).check();
  await page.getByRole("button", { name: "Cari kegiatan kecil" }).click();
}

test("new illustrations decode and decorative trails never intercept input", async ({
  page,
}) => {
  await page.goto("/");
  for (const selector of [
    ".scene-move .rig-shell",
    ".scene-journal .rig-head",
  ]) {
    const image = page.locator(selector);
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (node: HTMLImageElement) => node.complete && node.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  for (const trail of await page.locator(".step-trail").all()) {
    await expect(trail).toHaveAttribute("aria-hidden", "true");
    await expect(trail).toHaveCSS("pointer-events", "none");
  }
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("landing loops only while visible and pauses scenes offscreen", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const pace = page.locator(".scene-journal");
  await pace.scrollIntoViewIfNeeded();
  await expect(pace).toHaveAttribute("data-running", "true");
  const timings = await pace.evaluate((node) =>
    node.getAnimations({ subtree: true }).map((animation) => {
      const timing = animation.effect!.getTiming();
      return {
        duration: Number(timing.duration),
        iterations: timing.iterations ?? 1,
      };
    }),
  );
  expect(
    timings.some(
      (timing) => timing.iterations === Infinity && timing.duration === 8000,
    ),
  ).toBe(true);
  expect(
    timings.every(
      (timing) => timing.duration >= 6000 && timing.duration <= 10000,
    ),
  ).toBe(true);
  await page.getByRole("heading", { level: 1 }).scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      pace.evaluate(
        (node) =>
          node
            .getAnimations({ subtree: true })
            .filter((a) => a.playState === "running").length,
      ),
    )
    .toBe(0);
});

test("step direction, focus and repeated choices remain immediate", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/app");
  await page.getByRole("button", { name: "Lewati", exact: true }).click();
  await expect(page.locator(".selection-step")).toHaveAttribute(
    "data-direction",
    "forward",
  );
  await expect(page.locator(".selection-step")).toBeFocused();
  await page.getByRole("radio", { name: "Bergerak", exact: false }).check();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await page.getByRole("radio", { name: "2 menit", exact: true }).check();
  await page.getByRole("radio", { name: "10 menit", exact: true }).check();
  await page.getByRole("button", { name: "Kembali", exact: true }).click();
  await expect(page.locator(".selection-step")).toHaveAttribute(
    "data-direction",
    "backward",
  );
  await expect(page.locator(".selection-step")).toBeFocused();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await expect(
    page.getByRole("radio", { name: "10 menit", exact: true }),
  ).toBeChecked();
});

test("feedback is immediate, timer static, completion uses the new C1 pose", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await startMoving(page);
  await page
    .getByRole("button", { name: "Simpan ke favorit", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Hapus dari favorit", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Cocok", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Ditandai cocok" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", { name: "Mulai kegiatan", exact: true })
    .click();
  await expect(page.getByRole("timer")).toBeVisible();
  expect(
    await page
      .locator(".timer-screen")
      .evaluate((node) => node.getAnimations({ subtree: true }).length),
  ).toBe(0);
  await page.getByRole("button", { name: "Jeda", exact: true }).click();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await page.getByRole("button", { name: "Selesai", exact: true }).click();
  const illustration = page.locator(".completion-mark img");
  await expect(illustration).toHaveAttribute(
    "src",
    /small-steps%2Fcontent|small-steps\/content/,
  );
  await expect
    .poll(() =>
      illustration.evaluate(
        (node: HTMLImageElement) => node.complete && node.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await expect(
    page.getByRole("heading", { name: "Mood kamu berubah?" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Lewati", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Mau mulai dari apa?" }),
  ).toBeVisible();
});

test("live reduced motion and simulated hidden-tab lifecycle cancel animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.locator(".scene-journal").scrollIntoViewIfNeeded();
  await expect(page.locator(".scene-journal")).toHaveAttribute(
    "data-running",
    "true",
  );
  // Simulate the platform lifecycle event to exercise the visibility listener.
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator(".scene-journal")).toHaveAttribute(
    "data-running",
    "false",
  );
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
  ).toBe(0);
  await page.evaluate(() => {
    Reflect.deleteProperty(document, "hidden");
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".scene-journal")).toHaveAttribute(
    "data-running",
    "false",
  );
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
  ).toBe(0);
  await startMoving(page);
  await page
    .getByRole("button", { name: "Mulai kegiatan", exact: true })
    .click();
  await page.getByRole("button", { name: "Selesai", exact: true }).click();
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
  ).toBe(0);
});
