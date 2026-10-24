# Aset pengembangan hero

## storyboard-v1.png

- Tujuan: lima pose kunci untuk peninjauan sebelum produksi animasi.
- Sumber: ImageGen bawaan sesi Codex, dengan `public/brand/mascot/nudge-turtle-idle.png` sebagai referensi identitas C1.
- Tanggal: 24 Oktober 2026.
- Model: nama model tidak ditampilkan oleh tool.
- Status: konsep untuk persetujuan pengguna, bukan aset runtime, rig, atau sprite sheet.
- Output asli: `exec-3678804a-e794-4c78-93c1-d28f5c4b55ac.png`, disalin ke proyek tanpa menghapus hasil asli.
- Tidak ada gambar pihak ketiga yang diberikan sebagai input generasi.

Brief generasi: satu lembar storyboard lima panel berurutan, C1 quadruped dengan tempurung sage dan wajah sand, dari tertarik layar ke momen sadar, meletakkan ponsel, mengambil pensil, dan mulai membuat garis pada jurnal. Identitas memakai bentuk membulat, mata oval, empat kaki, tanpa jari manusia, tanpa corak tempurung, dan tanpa karakter kompetitor. Kamera tiga perempat, kontak tanah jelas, latar offwhite, serta properti biru/sand.

Gambar diperiksa langsung setelah generasi: lima pose terbaca, ekspresi berubah, ponsel telungkup pada akhir, dan jurnal terlihat. Ada beberapa bidang shading lembut. Posisi ponsel dan ukuran properti antarpanel belum menjadi koordinat produksi; normalisasi serta gerak penghubung diperlukan sebelum integrasi.

Rincian referensi, keputusan teknik, dan gerbang berikutnya ada di [hero-redesign.md](../../hero-redesign.md).

## contact-study.json dan contact-preview.html

Cuplikan vektor asli yang dibuat melalui `scripts/build-hero-contact.mjs`, bukan hasil konversi raster storyboard. Tidak ada aset karakter pihak ketiga. Runtime preview memakai `lottie-web` dan font Nunito yang sudah tersedia pada proyek; file runtime tidak disalin ke folder ini.

Jalankan `node scripts/build-hero-contact.mjs` untuk regenerasi. Jalankan `node scripts/preview-hero-contact.mjs` untuk membuka preview lokal pada port 3101. Server hanya melayani daftar file preview yang ditentukan dan bind ke loopback.

Status: storyboard disetujui; cuplikan gerak menunggu penilaian pengguna sebelum produksi adegan penuh. File ini belum dipakai oleh route landing atau aplikasi.

## Revisi bentuk v2

Pengguna menerima kualitas gerak meletakkan ponsel, tetapi meminta bentuk karakter diperbaiki. `contact-study.json` kini memakai proporsi v2 dengan wajah lebih lebar, tempurung yang membingkai wajah, mata/mulut mendekati C1 asli, dan kaki yang lebih membulat. Koreografi ponsel dan lintasan kontak dipertahankan.

`c1-proportions-v2.png` adalah screenshot area ilustrasi pada pose awal dari preview lokal, disimpan untuk membandingkan bentuk. Ini bukti render, bukan aset runtime atau gambar master pengganti C1. Penilaian bentuk oleh pengguna masih terbuka.

V2 kemudian ditolak pengguna. Jangan memakai bentuk vektor ini sebagai identitas C1 berikutnya.

## V3: master C1 asli

`contact-preview.html` kini memakai `c1-original-rig.js` untuk merender WebP C1 asli yang sudah ada di proyek. Server memetakan `/c1-master.webp` langsung ke `public/brand/landing/motion/c1-wave.webp`; tidak ada salinan atau hasil generasi karakter baru. Wajah, tempurung, warna, dan shading berasal dari gambar tersebut. Mask serta deformasi hanya berlangsung saat rendering.

`contact-study.json` sekarang berisi ponsel/alas dan data sinkronisasi C1, tanpa gambar karakter vektor. Bukti perbandingan berupa `c1-original-reference.png` dan `c1-original-motion-v3.png`, keduanya screenshot dari preview. Tombol **Lihat aset asli** menyediakan pembanding gambar utuh tanpa deformasi. Source gambar, kode aplikasi, dan hero aktif tidak diubah.
