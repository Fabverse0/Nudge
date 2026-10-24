import { expect, test } from "@playwright/test";

test("development recovers from a cached hero bundle and hydrates cleanly after reload", async ({
  browser,
  baseURL,
}) => {
  test.setTimeout(60000);
  const context = await browser.newContext({ serviceWorkers: "allow" });
  await context.route("**/sw.js", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `self.addEventListener("fetch", event => {
      if (new URL(event.request.url).pathname.startsWith("/_next/static/")) {
        event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
      }
    });`,
    }),
  );
  const page = await context.newPage();
  const hydrationErrors: string[] = [];
  page.on("framenavigated", (frame) => {
    if (frame === page.mainFrame()) hydrationErrors.length = 0;
  });
  page.on("pageerror", (error) => {
    if (/hydration/i.test(error.message)) hydrationErrors.push(error.message);
  });
  try {
    await page.goto(baseURL! + "/");
    const scripts = await page
      .locator("script[src]")
      .evaluateAll((nodes) =>
        nodes.map((node) => (node as HTMLScriptElement).src),
      );
    let staleBundle: { url: string; body: string } | undefined;
    for (const url of scripts) {
      if (!url.includes("/_next/static/chunks/")) continue;
      const body = await (await context.request.get(url)).text();
      const art = body.indexOf('className: "hero-story-art"');
      if (art < 0) continue;
      const tag = body.lastIndexOf('"span"', art);
      expect(body.slice(tag, art)).toMatch(/^"span",\s*\{\s*$/);
      staleBundle = {
        url,
        body: body.slice(0, tag) + '"svg"' + body.slice(tag + 6),
      };
      break;
    }
    expect(staleBundle).toBeDefined();
    await page.evaluate(async ({ url, body }) => {
      localStorage.setItem("hydration-regression-sentinel", "keep");
      await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;
      const cache = await caches.open("nudge-static-v3");
      await cache.put(
        url,
        new Response(body, {
          headers: {
            "Content-Type": "application/javascript",
            "Cache-Control": "no-store, must-revalidate",
          },
        }),
      );
    }, staleBundle!);
    hydrationErrors.length = 0;
    await page.reload();
    await expect
      .poll(() =>
        page
          .evaluate(async () => ({
            controlled: navigator.serviceWorker.controller !== null,
            registrations: (
              await navigator.serviceWorker.getRegistrations()
            ).filter(
              (reg) =>
                new URL(
                  reg.active?.scriptURL ||
                    reg.waiting?.scriptURL ||
                    reg.installing?.scriptURL ||
                    location.href,
                ).pathname === "/sw.js",
            ).length,
            caches: (await caches.keys()).filter((key) =>
              key.startsWith("nudge-static-"),
            ),
          }))
          .catch((error) => {
            if (
              /Execution context was destroyed|Cannot find context/.test(
                String(error),
              )
            )
              return null;
            throw error;
          }),
      )
      .toEqual({ controlled: false, registrations: 0, caches: [] });
    await expect(page.locator(".hero-story-art")).toHaveJSProperty(
      "tagName",
      "SPAN",
    );
    await expect(page.locator(".scene-hero")).toHaveAttribute(
      "data-art-ready",
      "true",
    );
    expect(
      await page.evaluate(() =>
        localStorage.getItem("hydration-regression-sentinel"),
      ),
    ).toBe("keep");
    expect(hydrationErrors).toEqual([]);
    await page.reload();
    await expect(page.locator(".scene-hero")).toHaveAttribute(
      "data-art-ready",
      "true",
    );
    expect(hydrationErrors).toEqual([]);
  } finally {
    await context.close();
  }
});
