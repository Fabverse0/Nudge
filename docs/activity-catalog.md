# Katalog kegiatan Nudge

Pembaruan 24 Oktober 2026 memperluas katalog dari 14 menjadi 50 kegiatan. Source data adalah `src/lib/activities/catalog.ts`. Kegiatan tetap ditawarkan satu per satu melalui pilihan tujuan, waktu, mood opsional, serta filter tempat dan alat.

## Sebaran kegiatan

| Tujuan | 2 menit | 5 menit | 10 menit | Total |
| --- | ---: | ---: | ---: | ---: |
| Produktif ringan | 6 | 6 | 6 | 18 |
| Bergerak | 5 | 5 | 4 | 14 |
| Refleksi/jeda layar | 6 | 6 | 6 | 18 |
| Total | 17 | 17 | 16 | 50 |

Setiap kombinasi tujuan dan durasi memiliki sedikitnya empat kegiatan, termasuk sedikitnya dua pilihan dalam ruangan tanpa alat khusus. Durasi merupakan alokasi pengalaman kegiatan; pengguna tetap menentukan kapan selesai.

## Contoh tambahan

- Produktif ringan: melipat satu pakaian, mengecek barang bawaan, memasangkan barang, mencatat urusan yang boleh menunggu, dan membuat pengingat kertas.
- Bergerak: menulis nama di udara, menari bebas, menjadi dirigen imajiner, pantomim kegiatan sehari-hari, serta berjalan dengan tiga perhentian.
- Refleksi/jeda layar: mengamati warna atau tekstur, menggambar benda, menulis pertanyaan untuk nanti, membuat peta pikiran, menulis cerita enam kalimat, dan surat untuk diri sendiri.

Aktivitas menulis dan menggambar mencantumkan kebutuhan media menulis. Kegiatan dengan pencatatan opsional tetap bisa dilakukan tanpa alat. Seluruh instruksi menulis mengarahkan pengguna ke media di luar Nudge. Kegiatan gerak memakai gerakan ringan dengan pilihan sesuai kenyamanan.

## Identitas dan pemeriksaan

Seluruh 14 ID lama dipertahankan beserta urutannya agar favorit tetap dikenali. Sebanyak 36 ID baru ditambahkan. Aturan rekomendasi tidak berubah; kegiatan baru masuk ke kumpulan saran sesuai metadata, dan penolakan berlaku dalam sesi.

- 13 tes unit katalog, rekomendasi, dan penyimpanan lulus. Pemeriksaan mencakup ID/judul unik, kompatibilitas ID lama, cakupan setiap tujuan/durasi, serta pergantian seluruh kandidat yang sesuai tanpa mengulang yang sudah ditolak.
- 8 tes browser lulus pada Chrome desktop dan emulasi Pixel 7: pergantian sampai kandidat habis, alternatif dengan filter berbeda, favorit, journaling di luar aplikasi, serta seluruh 50 judul favorit pada lebar 320 px dengan teks diperbesar.
- Pemeriksaan TypeScript dan ESLint file yang diubah lulus. Walkthrough terpisah membuka kegiatan baru “Lipat satu pakaian” melalui pergantian saran normal, menyimpannya ke favorit, lalu membukanya kembali setelah reload tanpa error browser. Seluruh data walkthrough dibuat dalam profil pengujian terpisah.
- Bukti browser memakai server development lokal; ini bukan penerimaan perangkat Android fisik.
