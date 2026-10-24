# C1 v4: badan utuh dan kaki terpisah

Tanggal: 24 Oktober 2026. Pengguna menerima bentuk C1 v3 tetapi menunjukkan pipi terpotong dan tumpukan bagian tubuh saat kaki turun, lalu mengizinkan perbaikan pemisahan aset.

## Sumber dan penggunaan

- Master identitas: `public/brand/mascot/nudge-turtle-wave.png`. File asli tidak diedit. Preview v4 memakai PNG 1280 px ini agar koordinat potongan sesuai dengan master, menggantikan ekspor WebP pada preview v3.
- `c1-body-repair.png`: hasil edit ImageGen bawaan. Hanya area yang semula tertutup kaki dipakai, melalui mask di bawah potongan master. Wajah, mata, senyum, dan bagian tempurung di luar area itu tetap memakai master.
- `c1-foreleg.png`: hasil edit ImageGen bawaan, satu kaki lengkap dengan latar transparan. Ini mengganti potongan cekung dari foto utuh yang masih menyisakan tepi pipi saat diputar.
- `c1-original-rig.js`: menyiapkan dua texture plate melalui canvas lokal, kemudian menggerakkannya memakai mesh WebGL. Kaki berada di belakang badan/wajah. Tidak ada lagi tambalan bulat pangkal kaki atau pemisahan wajah berdasarkan warna kulit.

Tidak ada instalasi, model 3D, layanan video, atau perubahan aset aplikasi. Nama model gambar tidak ditampilkan oleh tool bawaan. Dua keluaran PNG disalin ke folder ini; file sumber dan keluaran generasi awal dipertahankan. Ukuran PNG belum dioptimalkan untuk produksi.

## Prompt body plate

```text
Use case: precise-object-edit. Edit target: supplied transparent Nudge turtle C1 master image. Prepare a clean animation BODY PLATE: remove ONLY the raised waving foreleg on the viewer's right (the cream oval extending up/right alongside the cheek). Reconstruct the small shoulder/body area previously hidden by that foreleg. Keep the complete right edge of the round face smooth and intact. Preserve every other aspect exactly: same turtle identity, face, two eyes, smile, proportions, sage shell silhouette, cream body, soft 3D shading, stationary supporting feet, camera, placement and square canvas. Do not add any limb at the removed foreleg location. No new pose, no redesign, no outlines, no props, no text, no shadows outside character. Transparent background, same composition and scale. This is an animation cutout body plate, not a new illustration.
```

## Prompt kaki

```text
Use case: precise-object-edit / background-extraction. Reference: original Nudge C1 turtle. Produce ONLY ONE detached complete waving foreleg for animation, using the viewer-right raised cream foreleg in this reference as the edit target. Isolate and complete its hidden base into a smooth rounded oval paddle/capsule. It must be one simple smooth cream limb, soft 3D shading identical to reference. No face pixels, no shell, no green fragments, no other body parts, no joint ring, no fingers, no toes, no lines. Closed convex outline, smoothly rounded base and tip. Limb long axis diagonally from lower left to upper right at 45 degrees. Slightly warmer shadow at lower left base, soft ivory highlight at upper right tip, matching original lighting. Transparent background. Single limb centered in square canvas with ample transparent margin. The detached foreleg is an animation component of the SAME original character, not a new mascot or scene.
```

Kedua panggilan memakai PNG master sebagai edit target/referensi dan `transparent_background: true`. Tidak memakai gambar Duolingo sebagai input.

## Pemeriksaan

- Pose awal, menyentuh (frame 91), menurunkan (145), meletakkan (184), dan tenang ditinjau dalam browser sepanjang iterasi. Wajah tetap utuh dan kaki final tidak membawa serpihan tempurung atau tambalan bulat v3.
- Bukti final: `c1-parts-v4-contact.png` dan `c1-parts-v4-laydown.png`, screenshot render browser, bukan hasil generasi.
- Perbandingan JSON terhadap `60f9dd4` membuktikan semua layer ponsel/alas dan track posisi kaki identik. Hanya URL master berubah. Durasi tetap 336 frame pada timeline 60 fps, bukan bukti framerate perangkat.
- Lebar desktop 1200 px, 390 px, dan 320 px diperiksa. Lebar dokumen pada 390/320 adalah 375/305 px karena scrollbar, tanpa overflow horizontal. Renderer siap dan log error browser kosong.
- Replay melalui Enter bekerja. ESLint script/module lulus. Jalur kegagalan grafis, tanpa JavaScript, reduced motion, serta perangkat Android fisik belum diperiksa pada v4.

Ini revisi cuplikan terpisah di port 3101. Adegan jurnal dan integrasi hero tetap menunggu penilaian cuplikan. Route `/app` serta hero aktif tidak diedit.
