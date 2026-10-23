# Eksplorasi gambar awal video berjalan C1

Tanggal: 24 Oktober 2026. Status: pengguna memilih kandidat B v2. Kandidat belum dipakai di landing atau berhasil diunggah ke Flow; unggah otomatis membutuhkan izin file URL pada ekstensi Chrome.

## Kandidat untuk dipilih

| Kandidat | File | Arah |
| --- | --- | --- |
| A | `candidate-a-v2.png` | Wajah lebih menonjol, tubuh tiga perempat, tanaman sederhana dengan dua daun. |
| B | `candidate-b-v2.png` | Komposisi lebih lebar, empat kaki lebih jelas, ruang menuju tanaman lebih lapang. |

Keduanya 1672 × 941 RGB, mendekati 16:9. Dimensi, ukuran, dan hash ada di `manifest.json`. Semua file PNG telah dibuka dengan pembaca gambar untuk memeriksa integritas dan ditinjau dari hasil generasi. Tidak ada klaim bahwa gambar diam membuktikan kualitas gerak.

Identitas berasal dari `public/brand/mascot/nudge-turtle-idle.png`, dengan tempurung sage tanpa pola, wajah sand, mata oval sage, senyum pendek, kaki membulat, dan rendering 3D lembut. Tool gambar bawaan digunakan dengan referensi gambar aktual; nama model tidak diekspos dan tidak diasumsikan. Prompt lengkap serta instruksi perbaikan disimpan di `prompts.json`.

Versi awal `candidate-a.png` dan `candidate-b.png` dipertahankan. Revisi v2 menyelaraskan daun A ke sage dan memperlebar margin kedua adegan. Warna lantai masih memiliki variasi pencahayaan; kecocokannya dengan kanvas landing perlu diperiksa saat integrasi. Pada A, kaki jauh sebagian tertutup tubuh; B lebih jelas untuk peninjauan anatomi sebelum video.

## Referensi dan batas penggunaan

Taste Skill dipakai untuk komposisi subjek, properti bermakna, dan pencarian referensi. Pencarian `tortoise walking` menghasilkan [Turtle walking oleh Matanya](https://commons.wikimedia.org/wiki/File:Turtle_walking.ogv), CC BY 3.0. [Desert Tortoise Clips, NPS](https://www.nps.gov/media/video/view.htm?id=E1FA8BB4-AD44-4BBC-B0B4-987F183F6ED1) juga ditemukan untuk studi pijakan. Rekaman tersebut belum dipakai sebagai input generasi atau disalin ke aset Nudge; jangan menyatakan analisis gerak selesai sebelum menonton rekaman.

Kedua gambar baru dihasilkan untuk Nudge, bukan mengambil karakter dari rekaman atau produk referensi. Tidak ada instalasi, perubahan aplikasi, perubahan landing, atau pemakaian kredit Flow pada tahap ini.

## Gerbang berikutnya

1. Pengguna memilih A atau B, atau meminta revisi gambar.
2. Pengguna memilih B dan mengunggahnya ke Flow. Setelah Flow melaporkan batas durasi, pengguna menyetujui satu percobaan 8 detik, Veo 3.1 Fast, 720p, x1, maksimal 20 kredit. Jika biaya atau model berubah, berhenti sebelum generasi dan laporkan.
3. Pengguna meninjau hasil gerak sebelum integrasi landing. Jangan menganggap pilihan gambar sebagai persetujuan otomatis atas video yang belum dilihat.
