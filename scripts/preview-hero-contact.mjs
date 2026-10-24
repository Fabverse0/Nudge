import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const files = {
  "/": [
    "docs/assets/hero-redesign/contact-preview.html",
    "text/html; charset=utf-8",
  ],
  "/contact-study.json": [
    "docs/assets/hero-redesign/contact-study.json",
    "application/json",
  ],
  "/player.js": [
    "node_modules/lottie-web/build/player/lottie_light.min.js",
    "text/javascript",
  ],
  "/font.woff2": [
    "node_modules/@fontsource-variable/nunito/files/nunito-latin-wght-normal.woff2",
    "font/woff2",
  ],
  "/storyboard-v1.png": [
    "docs/assets/hero-redesign/storyboard-v1.png",
    "image/png",
  ],
};
createServer(async (request, response) => {
  const path = new URL(request.url, "http://127.0.0.1").pathname;
  const file = files[path];
  if (!file || !["GET", "HEAD"].includes(request.method)) {
    response.writeHead(404).end("Not found");
    return;
  }
  try {
    const bytes = await readFile(fileURLToPath(new URL(file[0], root)));
    response.writeHead(200, {
      "content-type": file[1],
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : bytes);
  } catch {
    response.writeHead(500).end("Preview file unavailable");
  }
}).listen(3101, "127.0.0.1", () =>
  console.log("C1 motion study: http://127.0.0.1:3101/"),
);
