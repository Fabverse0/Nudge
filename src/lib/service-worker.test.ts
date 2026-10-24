import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";

const source = readFileSync(
  new URL("../../public/sw.js", import.meta.url),
  "utf8",
);

function worker() {
  const stored = new Map<string, Response>();
  const listeners = new Map<string, (event: unknown) => void>();
  const fetch = vi.fn<typeof globalThis.fetch>();
  const cache = {
    match: async (request: Request) => stored.get(request.url)?.clone(),
    put: async (request: Request, response: Response) => {
      stored.set(request.url, response);
    },
  };
  runInNewContext(source, {
    self: {
      location: { origin: "https://nudge.test" },
      addEventListener: (name: string, listener: (event: unknown) => void) =>
        listeners.set(name, listener),
    },
    caches: { open: async () => cache },
    fetch,
    URL,
    Request,
  });
  const request = (path: string) => {
    let result: Promise<Response> | undefined;
    listeners.get("fetch")!({
      request: new Request("https://nudge.test" + path),
      respondWith: (response: Promise<Response>) => {
        result = response;
      },
    });
    return result!;
  };
  return { request, fetch, stored };
}

describe("service worker bundle freshness", () => {
  it("fetches changing development chunks instead of caching no-store responses", async () => {
    const { request, fetch, stored } = worker();
    fetch.mockResolvedValueOnce(
      new Response("old client", {
        headers: { "Cache-Control": "no-store, must-revalidate" },
      }),
    );
    fetch.mockResolvedValueOnce(
      new Response("new client", {
        headers: { "Cache-Control": "no-store, must-revalidate" },
      }),
    );
    expect(await (await request("/_next/static/chunks/hero.js")).text()).toBe(
      "old client",
    );
    expect(await (await request("/_next/static/chunks/hero.js")).text()).toBe(
      "new client",
    );
    expect(stored.size).toBe(0);
  });

  it("ignores a previously cached mutable bundle", async () => {
    const { request, fetch, stored } = worker();
    stored.set(
      "https://nudge.test/_next/static/chunks/hero.js",
      new Response("stale client", {
        headers: { "Cache-Control": "no-store" },
      }),
    );
    fetch.mockResolvedValue(
      new Response("current client", {
        headers: { "Cache-Control": "no-store" },
      }),
    );
    expect(await (await request("/_next/static/chunks/hero.js")).text()).toBe(
      "current client",
    );
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("serves an immutable production chunk from cache while offline", async () => {
    const { request, fetch } = worker();
    fetch.mockResolvedValueOnce(
      new Response("production client", {
        headers: { "Cache-Control": "public, max-age=31536000, immutable" },
      }),
    );
    expect(
      await (await request("/_next/static/chunks/hero-abc123.js")).text(),
    ).toBe("production client");
    fetch.mockRejectedValue(new Error("offline"));
    expect(
      await (await request("/_next/static/chunks/hero-abc123.js")).text(),
    ).toBe("production client");
    expect(fetch).toHaveBeenCalledOnce();
  });
});
