# Cara memakai Nudge sebagai rangkaian visual

24 Oktober 2026. Pengguna menilai tiga kolom teks lama terlalu polos. Revisi khusus landing menggantinya dengan satu bidang sage pucat berjudul "Dari bingung, jadi mulai." dan ordered list tiga langkah.

- Pilih: ilustrasi pilihan mood, dengan penanda centang. Mood tetap opsional menurut teks yang dipertahankan.
- Coba: buku pada satu kartu saran dengan simbol ganti, sesuai hak pengguna mengganti kegiatan.
- Jalani: timer dan centang penyelesaian. Teks tetap menjelaskan pengguna menentukan selesai.

Ilustrasi dekoratif bukan kontrol, tidak dapat difokuskan, dan tidak menyimulasikan aplikasi yang dapat dioperasikan. SVG disembunyikan dari pembaca layar; heading serta daftar memuat isi sebenarnya. Tidak ada penambahan fitur aplikasi, paket, atau aset eksternal. Tiga bagian setara dipakai karena menyampaikan urutan proses, bukan daftar fitur yang dibuat untuk mengisi layout.

Gerak berdurasi sembilan detik menekankan centang pilihan, kartu saran, lalu jarum timer secara bergiliran. Lifecycle AliveMotion mengatur adegan hanya berjalan ketika terlihat dan tab aktif; default tanpa JavaScript diam. Reduced motion menghentikan animasi. Di seluler, ilustrasi berada di samping teks dalam satu kolom.

Revisi setelah komentar berikutnya: bagian Pilih kini menganimasikan tiap wajah dengan anggukan kecil dan kedipan bergiliran. Cincin indikator bergerak dari opsi pertama ke kedua lalu ketiga, garis pilihan terisi, dan centang muncul setelah penetapan pilihan. Gerak berlangsung pada awal siklus, kemudian menahan hasil agar bagian Coba dan Jalani mendapat gilirannya. Ketiga wajah memakai bentuk/reaksi setara; rangkaian ini ilustratif dan tidak memilih mood pengguna. Seluruh elemen baru mengikuti pause serta reduced motion bagian yang sama. Keyframe dan status berjalan diverifikasi di preview localhost.

## Pemeriksaan

Koreksi presisi cincin: pengguna melihat cincin meleset ketika wajah mengangguk. Cincin tunggal sebelumnya berada di luar grup wajah dan memiliki translasi sendiri. Kini tiap wajah memiliki cincin konsentris dalam grup yang sama; opacity menyorot ketiganya bergiliran. Pemeriksaan DOM sebelum perbaikan gagal (1 cincin, 0 menempel ke grup wajah). Sesudah perbaikan lulus (3 cincin di grup masing-masing), dengan selisih pusat X/Y setiap cincin dan wajah kurang dari 0,1 CSS px pada preview desktop. Reduced motion tetap menampilkan hanya cincin wajah ketiga.

Render desktop dan 390 px ditinjau. DOM 320/390 px tidak menunjukkan overflow horizontal. Pada 320 px kolom ilustrasi diperkecil menjadi 84 px untuk memberi ruang teks. Typecheck lulus. Impeccable memberi advisory ukuran/radius dan warna; ukuran serta radius diselaraskan dengan skala, sementara sage pucat dan teks pendukung mengikuti nilai khusus landing yang sudah tercatat di DESIGN.md. Detector bukan bukti penerimaan estetika. Tidak menjalankan suite pengujian aplikasi atau pemeriksaan Android untuk revisi ini.

Preview localhost dipakai untuk menghindari CSS lama pada cache preview 127.0.0.1. Tidak mengubah service worker. Penerimaan visual menunggu peninjauan pengguna.
