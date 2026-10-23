# Aset landing hidup

## 3D lembut

`rig-source.png` adalah atlas asli dari ImageGen, dibuat 23 Oktober 2026 dengan `nudge-turtle-idle.png` sebagai referensi C1. Permintaan: enam bagian terpisah pada alpha transparan, tempurung sage dan underbelly tanpa kepala/kaki, kepala tersenyum, kepala bermata tertutup, kaki depan kiri/kanan, dan kaki belakang. Material clay lembut, proporsi C1, tanpa teks atau latar. Atlas ini adalah sumber ilustrasi, bukan animasi siap pakai.

Ekspor memakai `node scripts/export-landing-rig.mjs <atlas-png>`. Pemotongan menggunakan koordinat atlas yang diperiksa, trim alpha, dan WebP quality 90/alpha 100. Berkas produksi berada pada `public/brand/landing/alive/`.

| Berkas | Bagian | Ukuran |
| --- | --- | --- |
| shell.webp | Tempurung dan badan | 560 × 452 |
| head.webp | Kepala tersenyum | 425 × 354 |
| happy.webp | Ekspresi gembira, mata tertutup | 424 × 355 |
| foot-left.webp | Kaki depan kiri | 316 × 269 |
| foot-right.webp | Kaki depan kanan | 316 × 269 |
| foot-back.webp | Kaki belakang | 213 × 200 |

## Vektor ekspresif

Ponsel dan layar feed, kartu, jam, pijakan, jurnal, pensil, serta benda yang dirapikan dibuat sebagai SVG/HTML khusus landing. Tidak memakai aset, logo, karakter, atau file animasi Duolingo. Komponen adegan akan menyusun properti ini bersama rig 3D.

## Batas

Seluruh aset baru hanya untuk landing. Aset dan komponen aplikasi tidak diganti. Tampilan kedalaman 3D merupakan ilustrasi raster berlapis, bukan model 3D runtime.
