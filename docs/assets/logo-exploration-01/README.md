# Eksplorasi karakter Nudge, batch 01

Tanggal: 18 Oktober 2026. Status: enam kandidat tersedia untuk dipilih; bentuk induk belum ditetapkan. Pengguna membuka kembali tahap logo, maskot, dan ilustrasi. Persetujuan sebelumnya mencakup enam kandidat serta penggunaan tool gambar bawaan.

## Arah dan batas

| Arah | Hubungan dengan Nudge | Ciri yang dieksplorasi |
| --- | --- | --- |
| A. Tempurung bulat kompak | Satu langkah kecil yang mudah dimulai. | Tempurung hampir bundar, kepala besar, satu kaki mulai melangkah. |
| B. Kura-kura beristirahat | Memberi ruang untuk jeda tanpa tekanan. | Tempurung berkubah, kepala dekat tempurung, dua kaki depan beristirahat. |
| C. Wajah ramah dan tempurung besar | Pendamping yang menyapa dan merespons penyelesaian. | Wajah menghadap pengguna, tempurung besar di belakang, ekspresi penasaran atau senang. |

Prompt meminta kura-kura sederhana dengan bentuk berat membulat. Latar yang diminta adalah Glacial Periwinkle `#7EADDB`. Dua warna karakter memakai keluarga sage dan Toasted Sand `#E6D4BE`; sebagian kandidat mengeksplorasi sage gelap `#315F5E` yang sudah tersedia pada DESIGN.md. Tanda wajah diminta memakai kembali warna karakter. Prompt meminta gambar persegi sekitar 1536 x 1536. Keenam hasil asli berupa PNG 1254 x 1254 dan dipertahankan tanpa resampling.

| ID | Arah | Sudut yang diminta | Warna karakter yang diminta | Berkas hasil |
| --- | --- | --- | --- | --- |
| A1 | Tempurung bulat kompak | Kiri bawah | Tidal Sage `#679F9E` dan sand | [a1.png](./a1.png) |
| A2 | Tempurung bulat kompak | Kanan bawah | Sage gelap `#315F5E` dan sand | [a2.png](./a2.png) |
| B1 | Kura-kura beristirahat | Kiri bawah | Sage gelap `#315F5E` dan sand | [b1.png](./b1.png) |
| B2 | Kura-kura beristirahat | Kanan bawah | Tidal Sage `#679F9E` dan sand | [b2.png](./b2.png) |
| C1 | Wajah ramah dan tempurung besar | Kiri bawah | Tidal Sage `#679F9E` dan sand | [c1.png](./c1.png) |
| C2 | Wajah ramah dan tempurung besar | Kanan bawah | Sage gelap `#315F5E` dan sand | [c2.png](./c2.png) |

## Generasi dan sumber

Mode: tool `image_gen` bawaan. Metadata hasil hanya memuat `image_url` dan `output_hint`, tanpa nama model/provider; tidak diasumsikan sebagai model tertentu. Pengguna sebelumnya menyetujui pemakaian tool bawaan setelah batas informasi model dijelaskan. Constraints dikirim sebagai bagian prompt utama, bukan parameter negative prompt.

Setiap kandidat dibuat melalui satu panggilan terpisah tanpa referensi kandidat lain. Hasil dipertahankan sebagaimana dikembalikan tool, tanpa penyaringan, peringkat, perbaikan, atau regenerasi otomatis. Keenam hasil disampaikan bersama untuk dipilih pengguna. Salinan di proyek memiliki hash identik dengan sumber hasil tool. [manifest.json](./manifest.json) mencatat ukuran, panjang berkas, dan SHA256. Pemeriksaan metadata ini tidak menyatakan hasil telah lulus pemeriksaan visual, ukuran kecil, atau kemiripan merek. Gambar raster bukan berkas vektor dan bukan ikon PWA siap rilis.

[prompt-template.txt](./prompt-template.txt) dan [candidates.json](./candidates.json) memuat template serta substitusi. Prompt lengkap tiap kandidat disimpan bersama hasilnya. Sumber: gambar baru yang dihasilkan untuk proyek ini melalui tool bawaan, bukan aset Duolingo atau showcase upstream. Tidak ada atribusi stok pihak ketiga yang ditambahkan; tidak ada klaim pemeriksaan kemiripan merek atau hak eksklusif.

## Turunan setelah bentuk induk dipilih

Pengguna telah memilih C1. Turunan pada daftar berikut sudah dibuat dan diintegrasikan; berkas, prompt, dan ukuran aktual tercatat pada [inventaris keluarga C1](../turtle-c1/README.md). Tabel ini mempertahankan batas penggunaan dari brief eksplorasi:

| Kelompok | Keluaran | Batas penggunaan |
| --- | --- | --- |
| Logo | Simbol, simbol bersama wordmark Nudge, wordmark saja, versi satu warna | Periksa bentuk kecil; gambar kandidat bersudut tidak langsung dijadikan ikon sistem. |
| Maskot | Menyapa, penasaran/berpikir, istirahat, senang setelah selesai | Proporsi, warna dan bentuk tempurung mengikuti satu desain terpilih. |
| Timer | Pose ringkas yang tenang | Tetap hadir pada 32-48 px, statis tanpa gerak berulang. |
| Produktif ringan | Kura-kura merapikan beberapa benda sederhana | Aktivitas yang dapat dikenali, tanpa deretan alat dekoratif. |
| Bergerak | Kura-kura mengambil langkah kecil atau meregangkan badan | Ramah dan ringan, tanpa tuntutan pencapaian. |
| Refleksi/jeda layar | Kura-kura dengan buku jurnal sederhana atau sedang beristirahat | Tulisan jurnal tetap di luar aplikasi; tidak menggambarkan pengumpulan data. |
| Sistem | Favicon serta PNG 192/512 dan varian maskable | Komposisi dengan area aman dibuat terpisah dari gambar eksplorasi. |

Ekspresi lebih kuat untuk landing dan respons selesai. Saat pengguna melewati, mengganti, atau menghentikan kegiatan, karakter tetap menerima dan ramah. Pemilihan bentuk induk belum mengubah perilaku PRD atau memberi izin publikasi.
