# Produksi video berjalan untuk landing

## Arah yang disepakati

Ganti adegan sepatu melayang pada bagian bergerak dengan C1 utuh yang meninggalkan ponsel, berjalan menuju tanaman, lalu menoleh. Gaya 3D lembut, sage/sand/biru, kamera tetap, lantai mendatar, dan properti sederhana. ENERGY 3 / RHYTHM 2 / MOTION 3 mengikuti arah landing sebelumnya, bukan alasan menambah gerak acak.

Dua komposisi gambar disiapkan sebelum video. Pilihan pengguna atas gambar dan peninjauan video merupakan dua gerbang terpisah. Master, prompt, hash, kritik gambar, serta status ada di [eksplorasi gambar awal](./assets/turtle-walk-exploration-01/README.md).

## Status 24 Oktober 2026

- Dua kandidat v2 dibuat dan disimpan; versi awal juga dipertahankan. Pengguna memilih kandidat B v2 untuk gambar awal.
- Veo 3.1 Fast dipilih pada setelan project dengan output video x1. Pengguna telah mengunggah gambar B secara manual; gambar diperiksa secara visual dan dilampirkan ke perintah Flow. Tidak ada perubahan izin ekstensi yang dilakukan.
- Permintaan usulan dikirim dengan batas 6 detik dan 20 kredit, tanpa generasi otomatis. Respons agen Flow menyatakan Veo 3.1 Fast I2V hanya mendukung 8 detik pada 720p seharga 20 kredit di tier akun ini. Respons yang sama menawarkan Omni 1.1 Flash I2V 6 detik pada 720p seharga 10 kredit. Ini merupakan informasi dari agen Flow, belum konfirmasi biaya akhir generasi. Perubahan durasi/model menunggu keputusan pengguna.
- Flow telah diperiksa sebelumnya: akun menampilkan PLUS dan 250 kredit saat pemeriksaan, dengan Veo 3.1 Fast dalam daftar. Saldo dan biaya wajib diperiksa ulang saat eksekusi.
- Generasi video: belum dilakukan. Kredit Flow yang dipakai untuk pekerjaan ini: 0.
- Integrasi landing, optimasi video, pemeriksaan runtime video, dan penerimaan pengguna: belum dilakukan.
- Source aplikasi dan landing belum diubah pada tahap gambar ini. `next-env.d.ts` sudah berubah sebelum pekerjaan dimulai dan tidak termasuk commit.

## Langkah setelah pilihan gambar

Tunggu keputusan pengguna atas perbedaan durasi/model yang dilaporkan Flow. Draft instruksi ada di `docs/assets/turtle-walk-exploration-01/video-prompt.txt`; versi permintaan dengan isi adegan yang sama sudah dikirim untuk meminta usulan dan konfirmasi, bukan menjalankan generasi. Periksa dukungan gambar awal, durasi, dan total biaya pada konfirmasi akhir sebelum menekan generasi.

Tinjau rekaman gerak sumber agar prompt menekankan pijakan dan perpindahan berat. Gunakan gambar awal yang dipilih, durasi 6 detik, Veo 3.1 Fast, satu hasil, maksimal 20 kredit tanpa pembelian. Target: melihat tujuan selama 0–0,8 detik, berjalan hingga detik 4, melambat dan menoleh pada detik 4–5, lalu menahan pose hingga detik 6. Jika pengaturan tidak mendukung kombinasi ini, laporkan sebelum mengganti pendekatan atau memakai kredit.

Periksa video pada kecepatan normal dan beberapa frame. Tolak hasil yang berubah identitas, menambah/menghilangkan kaki, meluncur, membuat properti berpindah, atau terasa seperti gambar digoyang. Tidak ada percobaan kedua otomatis. Tampilkan hasil untuk peninjauan pengguna sebelum mengganti adegan.

Setelah video disetujui, integrasi dibatasi pada scene bergerak di landing. Target WebM + MP4 maksimal 4 MB gabungan dan poster maksimal 150 KB. Putar tanpa suara ketika terlihat, jeda di luar viewport/tab tersembunyi, tampilkan poster saat reduced motion, no-JS, gagal unduh, atau autoplay ditolak. Tahan frame akhir 2 detik setelah video yang sudah memiliki pose akhir 1 detik, lalu transisi 400 ms ke awal, tanpa memutar mundur. Transisi perlu ditinjau, bukan diasumsikan seamless.

Pemeriksaan runtime setelah integrasi mencakup 320/390/768/1440 px, keyboard, lifecycle video, reduced motion, no-JS, kegagalan pemuatan, dan console. Commit aset yang disetujui, integrasi, dan dokumentasi secara terpisah. Push tidak termasuk instruksi ini.
