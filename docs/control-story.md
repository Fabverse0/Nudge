# Demo kendali pada landing

24 Oktober 2026. Menanggapi komentar bahwa bagian "Kamu pegang kendalinya" terlalu polos, daftar ikon diganti dengan pemilih tiga pesan dan satu panggung interaktif. Identitas, kata kunci produk, dan perilaku aplikasi tetap mengikuti PRD.

## Interaksi yang dibuat

- Ganti kegiatan: menggilir tiga contoh dari katalog aktual melalui props server. Tidak menjalankan rekomendasi atau mengubah pilihan aplikasi.
- Favorit: menandai dan membatalkan contoh per ID dalam state komponen. Tidak memakai localStorage, akun, atau penyimpanan favorit asli.
- Pengingat: switch mengubah ikon dan pesan contoh. Tidak memanggil Notification API, penjadwal, atau izin browser.

Catatan yang selalu terlihat menjelaskan bahwa ini contoh interaktif dan tidak mengubah favorit/pengingat pengguna. Ketiga pesan tentang kontrol, penyimpanan per perangkat, serta pengingat opt-in tetap tersedia sebagai deskripsi pemilih. Perubahan hanya di komponen landing, import halaman `/`, stylesheet khusus, dan dokumen ini.

## Presentasi dan aksesibilitas

Bidang sage pucat menyatukan judul dan tiga pemilih. Buku vektor serta simbol yang berubah memberi respons pada tindakan. Animasi masuk 550 ms dan transisi singkat berjalan saat perubahan, tanpa loop tanpa akhir. Reduced motion meniadakan animasi/transisi melalui CSS. SVG dekoratif disembunyikan dari pembaca layar, tombol pilihan memakai aria-pressed, dan contoh pengingat memakai role switch dengan aria-checked. Tombol native mendukung keyboard serta fokus terlihat. Sebelum hidrasi atau tanpa JavaScript, kontrol nonaktif dan isi awal tetap terbaca.

## Bukti dan batas

- Typecheck lulus pada implementasi awal. ESLint lulus setelah pola hidrasi diganti ke useSyncExternalStore.
- Browser: ganti contoh mengubah judul dari regangan ke merapikan; Enter menandai favorit, klik membatalkannya; Space mengaktifkan switch dan klik menonaktifkannya. Status aksesibel ikut berubah.
- Render desktop ditinjau. DOM pada 320/390 px tidak menunjukkan overflow horizontal; susunan menjadi satu kolom. Pada 320 px tinggi semua kontrol yang diperiksa minimal 48 px.
- Impeccable memberi advisory tipografi untuk ukuran 18 px dan clamp judul 28–40 px; keduanya mengikuti skala khusus landing pada DESIGN.md. Tidak ada klaim detector membuktikan kualitas visual.
- Belum menjalankan suite aplikasi, build produksi baru, pengujian tanpa JavaScript/reduced motion di browser, atau pemeriksaan Android. Fallback tersebut diperiksa dari source. Penilaian artistik menunggu pengguna.

State demo hilang ketika halaman dimuat ulang. Pekerjaan ini tidak mengubah `/app`, konfigurasi PWA, atau service worker.
