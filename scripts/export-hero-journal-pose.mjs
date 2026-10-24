import sharp from "sharp";

const source = "public/brand/illustrations/nudge-turtle-journal.png";
const output = "public/brand/landing/motion/c1-journal.webp";

await sharp(source)
  .resize({ width: 1254, height: 1254, fit: "inside", withoutEnlargement: true })
  .webp({ quality: 90, alphaQuality: 100, effort: 6 })
  .toFile(output);

const result = await sharp(output).metadata();
console.log(`${output}: ${result.width}x${result.height}`);
