import { mkdir, copyFile } from "node:fs/promises";
import sharp from "sharp";

const sourceRoot = process.argv[2];
if (!sourceRoot) throw new Error("Pass the generated image directory.");
const assets = [
  ["exec-ebce4eaf-284d-41ed-8713-ecfd15af1461.png", "pause"],
  ["exec-b85444dd-2054-4136-8d2b-851bd16032b0.png", "stretch"],
  ["exec-e9c28b74-15f4-4585-b295-d654fdee375a.png", "content"],
];
await mkdir("docs/assets/small-steps/sources", { recursive: true });
await mkdir("public/brand/small-steps", { recursive: true });
for (const [source, name] of assets) {
  const master = `docs/assets/small-steps/sources/${name}.png`;
  await copyFile(`${sourceRoot}/${source}`, master);
  const result = await sharp(master)
    .resize(720, 720, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 86, alphaQuality: 100 })
    .toFile(`public/brand/small-steps/${name}.webp`);
  console.log(
    `${name}: ${result.width}x${result.height}, ${result.size} bytes`,
  );
}
