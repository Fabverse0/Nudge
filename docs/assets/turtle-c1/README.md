# Keluarga aset kura-kura C1

Pengguna memilih C1 pada 18 Oktober 2026. Produksi turunan dan integrasi diperbarui pada 21 Oktober 2026.

## Identitas yang dipertahankan

- Tempurung sage besar dengan lengkungan lebar tanpa pola berulang.
- Wajah sand sangat besar, dua mata oval sage dengan detail sand kecil, dan senyum pendek melengkung.
- Dua kaki depan sand yang besar dan membulat; tubuh ringkas dengan sudut lunak.
- Rendering grafis lembut dengan kedalaman ringan seperti kandidat C1 yang dipilih pengguna.

Kandidat asli tetap tersimpan tanpa perubahan di ../logo-exploration-01/c1.png. Turunan dibuat dengan referensi gambar tersebut agar identitas tidak berasal dari prompt teks saja. Mode: tool gambar bawaan; nama model tidak diasumsikan.

## Inventaris produksi

Seluruh gambar PNG di bawah berukuran asli 1254 × 1254. Berkas produksi berada di `public/brand/`; `manifest.json` mencatat ukuran, hash, sumber, dan prompt terkait.

| Berkas di public/brand | Fungsi |
| --- | --- |
| mascot/nudge-turtle-idle.png | Pose tenang, dipakai statis pada timer 40 px. Juga merupakan referensi tubuh utuh untuk turunan. |
| mascot/nudge-turtle-wave.png | Menyapa pada hero landing dan pemilihan konteks aplikasi. |
| mascot/nudge-turtle-think.png | Penasaran pada saran, keadaan kosong, dan bagian kendali pengguna. |
| mascot/nudge-turtle-complete.png | Respons penyelesaian, mata tersenyum dan gerakan kecil. |
| illustrations/nudge-turtle-tidy.png | Produktif ringan, merapikan benda. |
| illustrations/nudge-turtle-move.png | Bergerak, mengambil satu langkah kecil. |
| illustrations/nudge-turtle-journal.png | Refleksi, menulis di jurnal kosong di luar aplikasi. |
| logo/nudge-symbol.png | Wajah C1 yang disederhanakan untuk header, favicon, dan ikon pemasangan. |
| logo/nudge-symbol-mono.png | Sumber simbol monokrom berbasis raster. Versi komposit memakai alpha mask dengan satu warna. |
| logo/nudge-wordmark.svg | Tulisan `nudge.` berupa path vektor, 3011 × 977. |
| logo/nudge-wordmark-mono.svg | Wordmark deep sage satu warna. |
| logo/nudge-wordmark-inverse.svg | Wordmark putih untuk permukaan gelap. |
| logo/nudge-logo-horizontal.svg | Simbol dan wordmark, 690 × 220. Komposit simbol raster dan tulisan vektor. |
| logo/nudge-logo-horizontal-mono.svg | Komposit satu warna deep sage, 690 × 220. |

Logo komposit menyertakan raster di dalam SVG. Hanya wordmark yang seluruh bentuknya berupa path vektor. Header memakai gambar simbol dan wordmark terpisah agar tidak mengunduh berkas komposit yang besar. Next Image menyediakan ukuran gambar sesuai pemakaian tanpa mengubah berkas master.

## Ikon browser dan pemasangan

Route `src/app/icons/[size]/route.tsx` merender simbol ringkas pada bidang biru:

- `/icons/32`: favicon 32 × 32.
- `/icons/180`: ikon Apple 180 × 180.
- `/icons/192` dan `/icons/512`: ikon PWA biasa.
- `/icons/maskable-512`: ikon maskable 512 × 512; kotak gambar sekitar 56% lebar kanvas, dibulatkan menjadi 287 × 287. Jarak pusat ke sudut kotak sekitar 202.94 px, lebih kecil dari radius aman 204.8 px. Seluruh kotak berada di dalam lingkaran aman, dengan margin tambahan pada sumber.

Manifest tetap meluncurkan `/app`. Cache worker dinaikkan ke `nudge-static-v3`. Instalasi cache memakai permintaan `reload` agar ikon yang diperbarui diambil kembali dari server. Worker baru tetap mengikuti siklus pembaruan yang sudah ada dan tidak memaksa reload sesi. Pemasangan dan pemotongan ikon pada Android Chrome fisik masih harus diperiksa secara manual.

## Sumber dan reproduksi

Gambar dihasilkan khusus untuk Nudge melalui tool gambar bawaan dengan referensi C1. Tool tidak mengekspos nama model; tidak ada nama model gambar yang diasumsikan. Kandidat asli dan seluruh PNG hasil generasi dipertahankan. Tidak memakai karakter Duo atau aset showcase upstream.

Prompt pose awal disimpan sebagai `*-prompt.txt`; prompt penyelesaian dan tiga ilustrasi berada di `production-prompts.json`. Simbol memiliki prompt tersendiri. `source-master-v1.png` adalah salinan master tubuh utuh yang dipakai sebagai idle. Percobaan pembersihan tepi yang tidak diadopsi tidak menggantikan master.

Wordmark dibuat dari Nunito Variable resmi di [Google Fonts](https://github.com/google/fonts/tree/main/ofl/nunito), bobot 900 dan tracking -0.05em. Sumber `Nunito-Variable.ttf` memiliki SHA256 `BB55A5CA5C2042335B3991AF27C4D0705D0EF41CAC6164AC737FD8F2A1E85207`; lisensi SIL OFL ada di `docs/licenses/Nunito-OFL.txt`. Fontkit 2.0.4 digunakan lokal sebagai dependensi pengembangan. Ekspor ulang dengan `npm run assets:wordmark`. Sumber TTF dipakai karena pembacaan variasi WOFF2 oleh fontkit gagal; eksportir menggunakan API publik `getVariation` pada TTF.

Maskot tetap tenang pada timer dan ramah saat pengguna melewati atau menghentikan kegiatan. Ekspresi lebih terbuka dipakai untuk landing dan penyelesaian, tanpa pesan yang menyalahkan pengguna.

Gambar yang mendampingi teks memakai alt kosong; gambar pengenal pada awal aplikasi dan hero memiliki deskripsi singkat. Semua gambar memiliki ukuran intrinsik. Animasi penyelesaian hanya sekali dan mengikuti aturan reduced motion yang sudah ada.
