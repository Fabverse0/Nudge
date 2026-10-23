import { mkdir, copyFile } from "node:fs/promises";
import sharp from "sharp";

const source = process.argv[2];
if (!source) throw new Error("Pass the generated hero PNG path.");
await mkdir("docs/assets/landing-duolingo", { recursive: true });
await copyFile(source, "docs/assets/landing-duolingo/source.png");
const result = await sharp(source)
  .resize(1200, 900, { fit: "inside", withoutEnlargement: true })
  .webp({ quality: 86, alphaQuality: 100 })
  .toFile("public/brand/landing/nudge-first-step.webp");
if (result.size > 150_000) throw new Error("Hero exceeds the 150 KB budget.");
console.log(JSON.stringify(result));
