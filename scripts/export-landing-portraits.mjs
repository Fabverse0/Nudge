import sharp from "sharp";

for (const name of ["idle", "wave"]) {
  await sharp(`public/brand/mascot/nudge-turtle-${name}.png`)
    .resize(800, 800, { fit: "inside" })
    .webp({ quality: 86 })
    .toFile(`public/brand/landing/motion/c1-${name}.webp`);
}
