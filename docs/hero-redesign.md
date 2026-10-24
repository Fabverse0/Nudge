# Hero Nudge: dari scrolling ke satu kegiatan

Status: referensi dan storyboard v1 tersedia untuk persetujuan pengguna. Hero aktif belum diganti. Tanggal pemeriksaan: 24 Oktober 2026.

## Masalah yang ditangani

Pengguna menolak hero SVG sebelumnya karena terasa kaku dan kurang menarik dibandingkan adegan ponsel. Perubahan berikutnya harus memperbaiki pose, tindakan, dan hubungan karakter dengan benda. Menambah jumlah keyframe atau mengganti format file saja tidak membuktikan perbaikan artistik.

Lingkup hanya hero landing, tanpa perubahan aplikasi, adegan ponsel yang sudah disukai, headline, CTA, atau handoff durasi. Identitas C1, Nunito, sage, sand, dan biru dipertahankan. Video generatif dikeluarkan dari pendekatan ini.

## Referensi terpilih dan batas penggunaan

| Referensi primer                                                                                              | Yang dipelajari untuk Nudge                                                                                  | Batas bukti dan hak penggunaan                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Duolingo: shape language](https://blog.duolingo.com/shape-language-duolingos-art-style/)                     | Siluet sederhana, variasi ukuran bentuk, ekspresi dan cerita yang terbaca sekilas.                           | Artikel dan ilustrasi sebagai referensi, bukan sumber aset Nudge. Tidak menyalin karakter atau warna merek.                                                                                                       |
| [Duolingo Lily, studi kasus Rive](https://rive.app/blog/duolingo-s-ai-powered-video-call-brings-lily-to-life) | Peralihan ekspresi, pemisahan gerak kepala/tubuh, dan respons yang menunjukkan karakter sedang berpikir.     | Sumber menjelaskan blending dan proses tim; bukan bukti bahwa rig C1 sudah tersedia atau kualitas setara dapat dicapai otomatis.                                                                                  |
| [Headspace: How It Works, Anna Charity](https://dribbble.com/shots/1802932-Headspace-How-It-Works)            | Rujukan untuk pengembangan adegan singkat dengan karakter ramah dan pesan sederhana.                         | Halaman pembuat mengonfirmasi ilustrasi Headspace dan animasi Animade. Halaman browser tidak berhasil menampilkan karya lengkap saat pemeriksaan; kualitas geraknya belum dinilai langsung. Tidak mengunduh aset. |
| Adegan ponsel Nudge, [catatan produksi](./phone-story.md)                                                     | Ponsel berdimensi, feed ilustratif, perlambatan, perubahan menuju kegiatan, lintasan buku, serta jeda akhir. | Source lokal telah diperiksa. Waktu dan properti menjadi pembanding, bukan alasan mengubah adegan yang disukai pengguna.                                                                                          |

[Turtle Walking oleh Olivia Turner](https://lottiefiles.com/free-animation/turtle-walking-bI7vP6VOur) juga ditemukan dan dilihat melalui browser. Halaman menyebut Lottie Simple License. Tidak dipilih: karakter kecil, proporsi berbeda dari C1, dan presentasinya belum menjadi adegan hero yang dibutuhkan. Tidak ada file sumber yang diunduh atau dipasang.

Taste Skill dipakai untuk pemilihan gambar, kritik fokus, serta pembandingan dengan adegan ponsel. Draw arah seluruh halaman dilewati sesuai pengecualian pekerjaan satu bagian: identitas dan komposisi halaman tetap. Impeccable animate dipakai untuk urutan tindakan dan gerak susulan; ini belum merupakan audit browser hero baru.

## Storyboard v1

![Lima pose utama C1](./assets/hero-redesign/storyboard-v1.png)

Gambar konsep dibuat melalui tool ImageGen bawaan dengan `public/brand/mascot/nudge-turtle-idle.png` sebagai referensi identitas. Tool tidak mengekspos nama model. Tidak memakai referensi gambar Duolingo atau Headspace sebagai input generasi. Ini lembar pengembangan visual raster, bukan sprite sheet, rig, Lottie, atau animasi selesai.

| Momen                | Tindakan                                                      | Kebutuhan gerak produksi                                                                                                                                       |
| -------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01: tertarik layar   | C1 condong ke ponsel dengan satu kaki depan menyentuh layar.  | Pandangan dan kepala memimpin; badan menyusul. Dua kaki penyangga tetap kontak tanah. Feed memiliki gambar yang terbaca.                                       |
| 02: sadar            | Kepala terangkat, ekspresi penasaran menghadap pengunjung.    | Persiapan singkat, mata berubah lebih dahulu, kemudian kepala dan tubuh. Tidak memakai sapaan berulang sebagai aksi utama.                                     |
| 03: meletakkan       | Kaki depan menurunkan ponsel hingga telungkup.                | Titik kontak kaki dan ponsel tetap terhubung. Setelah diletakkan, C1 menggesernya ke sisi kiri sebelum mengalihkan perhatian.                                  |
| 04: memilih kegiatan | Berat badan beralih ke jurnal dan pensil.                     | Peralihan posisi ponsel dari panel 03 ke 04 harus terlihat dalam gerak penghubung, bukan teleport. Ukuran jurnal/pensil dinormalisasi dalam artboard produksi. |
| 05: mulai            | C1 membuat satu garis kecil pada jurnal dengan ekspresi puas. | Pena menyentuh halaman; garis mengikuti ujung pena. Tahan pose akhir tanpa gerak dekoratif berlebihan.                                                         |

Panel disusun untuk membaca pose, belum sebagai koordinat produksi. Kamera, ukuran karakter, ukuran ponsel, dan tanah harus konsisten ketika diturunkan ke animasi. Gaya saat ini memakai bidang warna dengan beberapa tone lembut; persetujuan pengguna diperlukan sebelum membuat aset produksi.

## Kandidat teknik dan keputusan sementara

Pilihan awal adalah Lottie melalui runtime `lottie-web` yang sudah ada, dengan animasi bentuk dan lintasan bertimeline. [Daftar fitur resmi](https://github.com/airbnb/lottie-web/wiki/Features) mencantumkan dukungan shapes, precomps, dan additive masks pada renderer SVG; ini tidak berarti tersedia rig tubuh otomatis. Cuplikan perlu membuktikan deformasi dan kontak yang baik sebelum keputusan produksi.

Source ponsel saat ini memakai 30 fps, 180 frame, playback 0,65, serta jeda akhir. Untuk C1, mulai dari cuplikan interaksi meletakkan ponsel, tanpa mengganti hero aktif. Jangan membuat seluruh adegan dari potret raster yang digeser atau anggota tubuh yang hanya diputar pada engsel.

Rive menjadi alternatif jika cuplikan menunjukkan Lottie tidak memenuhi kebutuhan. Tidak ada perintah `rive` pada PATH dan dependensi Rive belum ada di proyek. [Harga resmi yang diperiksa](https://rive.app/pricing) menyebut paket gratis dapat mengekspor dengan splash screen, sedangkan paket berbayar dapat menghilangkannya. Jangan menganggap jalur produksi tanpa branding gratis. Instalasi, runtime baru, akun, dan biaya memerlukan konfirmasi pengguna sebelum dilakukan.

Tidak ada jaminan format tertentu akan menghasilkan animasi bagus tanpa pekerjaan ilustrasi dan animasi. Jika aset yang disetujui belum dapat diproduksi dengan kualitas memadai melalui tool yang tersedia, laporkan keterbatasannya sebelum integrasi.

## Gerbang dan bukti penerimaan

- [x] Source hero, player Lottie, sumber ponsel, serta identitas C1 diperiksa.
- [x] Referensi primer dan satu kandidat aset gratis diteliti; keterbatasan visual dicatat.
- [x] Lima pose konsep tersedia secara lokal.
- [ ] Pengguna menyetujui bentuk dan storyboard.
- [ ] Cuplikan interaksi ponsel dibuat dan disetujui dalam keadaan bergerak.
- [ ] Adegan lengkap diproduksi dan diintegrasikan khusus hero.
- [ ] Replay, pause, reduced motion, tanpa JavaScript, kegagalan pemuatan, dan hidrasi diperiksa.
- [ ] Typecheck, lint, dan Playwright landing yang relevan dijalankan.
- [ ] Dua siklus ditinjau pada 1440/768/390 px serta reflow 320 px.
- [ ] Pengguna menerima kualitas artistik animasi final.

Tidak ada tes runtime baru pada tahap referensi/storyboard karena kode runtime belum berubah. Belum ada instalasi, biaya layanan animasi, push, atau klaim kelancaran Android fisik.
