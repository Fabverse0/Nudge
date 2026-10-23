import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";

const source = process.argv[2];
if (!source) throw new Error("Pass the approved transparent atlas PNG path.");
const destination = "public/brand/landing/alive";
await mkdir(destination, { recursive: true });
await mkdir("docs/assets/landing-alive", { recursive: true });
await copyFile(source, "docs/assets/landing-alive/rig-source.png");
const parts = {
  shell: [0, 60, 600, 550],
  head: [600, 180, 460, 420],
  happy: [1060, 180, 476, 420],
  "foot-left": [80, 620, 400, 360],
  "foot-right": [590, 620, 410, 360],
  "foot-back": [1140, 650, 290, 300],
};
for (const [name, [left, top, width, height]] of Object.entries(parts)) {
  const output = path.join(destination, `${name}.webp`);
  const crop = await sharp(source)
    .extract({ left, top, width, height })
    .toBuffer();
  await sharp(crop)
    .trim({ threshold: 12 })
    .resize({ width: 600, withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(output);
  const metadata = await sharp(output).metadata();
  console.log(`${name}: ${metadata.width}x${metadata.height}`);
}
