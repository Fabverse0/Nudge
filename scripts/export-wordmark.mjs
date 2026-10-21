import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fontPath = path.join(root, "docs/assets/turtle-c1/Nunito-Variable.ttf");
const font = fontkit.openSync(fontPath).getVariation({ wght: 900 });
const run = font.layout("nudge.");
const tracking = -0.05 * font.unitsPerEm;
const glyphs = [];
let cursor = 0;
let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;

for (let index = 0; index < run.glyphs.length; index += 1) {
  const glyph = run.glyphs[index];
  const position = run.positions[index];
  const x = cursor + position.xOffset;
  const y = position.yOffset;
  const bounds = glyph.bbox;
  minX = Math.min(minX, bounds.minX + x);
  minY = Math.min(minY, bounds.minY + y);
  maxX = Math.max(maxX, bounds.maxX + x);
  maxY = Math.max(maxY, bounds.maxY + y);
  glyphs.push({ d: glyph.path.toSVG(), x, y });
  cursor += position.xAdvance + tracking;
}

const padding = font.unitsPerEm * 0.035;
const width = Math.ceil(maxX - minX + padding * 2);
const height = Math.ceil(maxY - minY + padding * 2);
const variants = [
  { name: "nudge-wordmark", ink: "#315F5E", period: "#679F9E" },
  { name: "nudge-wordmark-mono", ink: "#315F5E", period: "#315F5E" },
  { name: "nudge-wordmark-inverse", ink: "#FFFFFF", period: "#FFFFFF" },
];
const directory = path.join(root, "public/brand/logo");
mkdirSync(directory, { recursive: true });

for (const variant of variants) {
  const shapes = glyphs
    .map(
      (glyph, index) =>
        `<path fill="${index === glyphs.length - 1 ? variant.period : variant.ink}" transform="translate(${glyph.x} ${glyph.y})" d="${glyph.d}"/>`,
    )
    .join("\n");
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="wordmark-title">
<title id="wordmark-title">Nudge</title>
<!-- Outlined from Nunito Variable, weight 900, tracking -0.05em. Source: Google Fonts. License notice: docs/licenses/Nunito-OFL.txt. -->
<g transform="translate(${padding - minX} ${padding + maxY}) scale(1 -1)">
${shapes}
</g>
</svg>
`;
  writeFileSync(path.join(directory, `${variant.name}.svg`), svg);
  process.stdout.write(`${variant.name}.svg: ${width} x ${height}\n`);
}

for (const mono of [false, true]) {
  const symbol = readFileSync(
    path.join(directory, mono ? "nudge-symbol-mono.png" : "nudge-symbol.png"),
  ).toString("base64");
  const wordmark = readFileSync(
    path.join(
      directory,
      mono ? "nudge-wordmark-mono.svg" : "nudge-wordmark.svg",
    ),
    "utf8",
  );
  const paths = wordmark.slice(
    wordmark.indexOf("<g "),
    wordmark.lastIndexOf("</svg>"),
  );
  const name = mono ? "nudge-logo-horizontal-mono" : "nudge-logo-horizontal";
  const symbolElement = mono
    ? `<defs><mask id="symbol" mask-type="alpha"><image href="data:image/png;base64,${symbol}" width="220" height="220"/></mask></defs><rect width="220" height="220" fill="#315F5E" mask="url(#symbol)"/>`
    : `<image href="data:image/png;base64,${symbol}" width="220" height="220"/>`;
  writeFileSync(
    path.join(directory, `${name}.svg`),
    `<svg xmlns="http://www.w3.org/2000/svg" width="690" height="220" viewBox="0 0 690 220" role="img" aria-label="Nudge">
<!-- Composite artwork: raster turtle with outlined vector lettering. -->
${symbolElement}
<g transform="translate(232 35) scale(${150 / height})">${paths}</g>
</svg>\n`,
  );
  process.stdout.write(
    `${name}.svg: 690 x 220 (raster symbol, vector lettering)\n`,
  );
}
