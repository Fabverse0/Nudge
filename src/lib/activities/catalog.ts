export const goals = {
  productive: {
    label: "Produktif ringan",
    description: "Bereskan satu hal kecil.",
    color: "sage",
  },
  move: {
    label: "Bergerak",
    description: "Beri badan ruang bergerak.",
    color: "blue",
  },
  reflect: {
    label: "Refleksi/jeda layar",
    description: "Ambil jeda untuk dirimu.",
    color: "sand",
  },
} as const;

export const moods = ["Lelah", "Bosan", "Gelisah", "Siap bergerak"] as const;
export type Mood = (typeof moods)[number];
export type Goal = keyof typeof goals;
export type Place = "indoor" | "outdoor";
export type Tool = "paper" | "water";
export type Activity = {
  id: string;
  title: string;
  goal: Goal;
  minutes: 2 | 5 | 10;
  summary: string;
  steps: string[];
  places: Place[];
  requiredTools: Tool[];
  optionalTools: Tool[];
  moods: Mood[];
};

export const activities: Activity[] = [
  {
    id: "stretch-2",
    title: "Regangkan badan sebentar",
    goal: "move",
    minutes: 2,
    summary: "Lepaskan layar. Beri ruang untuk bahu dan punggungmu.",
    steps: [
      "Berdiri atau tetap duduk dengan nyaman.",
      "Putar bahu pelan, lalu rentangkan kedua tangan sesuai kenyamanan.",
      "Ambil beberapa napas biasa. Hentikan gerakan jika terasa tidak nyaman.",
    ],
    places: ["indoor"],
    requiredTools: [],
    optionalTools: [],
    moods: ["Lelah", "Gelisah"],
  },
  {
    id: "walk-5",
    title: "Jalan santai lima menit",
    goal: "move",
    minutes: 5,
    summary: "Pindah suasana dengan langkah kecil di tempat yang aman.",
    steps: [
      "Pilih jalur aman di rumah atau dekat rumah.",
      "Letakkan ponsel dan berjalan dengan kecepatan nyaman.",
      "Perhatikan sekitar. Kamu boleh berhenti kapan saja.",
    ],
    places: ["indoor", "outdoor"],
    requiredTools: [],
    optionalTools: [],
    moods: ["Bosan", "Siap bergerak"],
  },
  {
    id: "walk-10",
    title: "Beri langkahmu sepuluh menit",
    goal: "move",
    minutes: 10,
    summary: "Jalan santai atau bergerak ringan di rumah.",
    steps: [
      "Pilih tempat dan rute yang aman.",
      "Berjalan santai, atau lakukan gerakan ringan di rumah.",
      "Sesuaikan gerakan dengan kenyamanan, lalu tutup dengan jeda singkat.",
    ],
    places: ["indoor", "outdoor"],
    requiredTools: [],
    optionalTools: [],
    moods: ["Siap bergerak", "Bosan"],
  },
  {
    id: "five-things-2",
    title: "Kembalikan lima benda",
    goal: "productive",
    minutes: 2,
    summary: "Mulai dari lima benda di dekatmu. Cukup itu dulu.",
    steps: [
      "Lihat sekeliling dan pilih lima benda yang tidak pada tempatnya.",
      "Kembalikan satu per satu. Tidak perlu merapikan seluruh ruangan.",
      "Setelah lima benda, berhenti dan lihat ruang kecil yang sudah lega.",
    ],
    places: ["indoor"],
    requiredTools: [],
    optionalTools: [],
    moods: ["Bosan", "Siap bergerak"],
  },
  {
    id: "desk-5",
    title: "Rapikan satu sudut meja",
    goal: "productive",
    minutes: 5,
    summary: "Satu permukaan kecil, tanpa target beres semuanya.",
    steps: [
      "Pilih bagian kecil meja atau permukaan di dekatmu.",
      "Pisahkan yang masih dipakai dan kembalikan benda lainnya.",
      "Sisakan tempat untuk kegiatan berikutnya.",
    ],
    places: ["indoor"],
    requiredTools: [],
    optionalTools: [],
    moods: ["Gelisah", "Bosan"],
  },
  {
    id: "prepare-10",
    title: "Siapkan kegiatan berikutnya",
    goal: "productive",
    minutes: 10,
    summary: "Buat kegiatan setelah ini sedikit lebih mudah dimulai.",
    steps: [
      "Tentukan satu kegiatan yang ingin kamu lakukan setelah ini.",
      "Kumpulkan atau rapikan barang yang akan dibutuhkan.",
      "Letakkan di tempat yang mudah dijangkau. Cukup siapkan langkah pertamanya.",
    ],
    places: ["indoor"],
    requiredTools: [],
    optionalTools: [],
    moods: ["Siap bergerak"],
  },
  {
    id: "water-note-2",
    title: "Minum dan tulis satu langkah",
    goal: "reflect",
    minutes: 2,
    summary: "Jeda sebentar, lalu tulis hal kecil yang ingin dilakukan.",
    steps: [
      "Siapkan air minum dan media menulis di luar Nudge.",
      "Letakkan ponsel dan minum secukupnya.",
      "Tulis satu hal kecil yang ingin kamu lakukan berikutnya.",
    ],
    places: ["indoor"],
    requiredTools: ["water", "paper"],
    optionalTools: [],
    moods: ["Lelah"],
  },
  {
    id: "journal-5",
    title: "Journaling sebentar",
    goal: "reflect",
    minutes: 5,
    summary: "Beri tempat untuk yang sedang memenuhi pikiranmu.",
    steps: [
      "Ambil kertas dan pena, atau media menulis pilihanmu di luar Nudge.",
      "Tulis: Apa yang sedang memenuhi pikiranku saat ini?",
      "Lanjutkan: Langkah kecil apa yang ingin aku ambil setelah ini? Tidak perlu rapi.",
    ],
    places: ["indoor", "outdoor"],
    requiredTools: ["paper"],
    optionalTools: [],
    moods: ["Gelisah", "Bosan"],
  },
  {
    id: "journal-10",
    title: "Tulis keadaanmu sekarang",
    goal: "reflect",
    minutes: 10,
    summary: "Beberapa kalimat untuk menyapa diri sendiri.",
    steps: [
      "Siapkan media menulis di luar Nudge.",
      "Tulis beberapa kalimat tentang keadaanmu sekarang tanpa perlu mengoreksi.",
      "Pilih satu kegiatan kecil untuk dilakukan berikutnya.",
    ],
    places: ["indoor", "outdoor"],
    requiredTools: ["paper"],
    optionalTools: [],
    moods: ["Gelisah", "Lelah"],
  },
  {
    id: "screen-break-2",
    title: "Istirahatkan pandangan",
    goal: "reflect",
    minutes: 2,
    summary: "Jauhkan layar sebentar. Kamu tidak perlu alat apa pun.",
    steps: [
      "Letakkan perangkat dalam posisi aman.",
      "Lihat ke arah lain yang nyaman dan perhatikan hal di sekitarmu.",
      "Pikirkan satu langkah kecil berikutnya. Tidak perlu menuliskannya.",
    ],
    places: ["indoor", "outdoor"],
    requiredTools: [],
    optionalTools: [],
    moods: ["Lelah", "Gelisah"],
  },
  {
    id: "notice-5",
    title: "Perhatikan sekitarmu",
    goal: "reflect",
    minutes: 5,
    summary: "Lima menit mengamati, tanpa perlu mencatat.",
    steps: [
      "Letakkan layar dan cari posisi nyaman.",
      "Perhatikan beberapa benda, warna, atau suara di sekitarmu.",
      "Pilih satu hal kecil yang ingin kamu lakukan setelah jeda ini.",
    ],
    places: ["indoor", "outdoor"],
    requiredTools: [],
    optionalTools: [],
    moods: ["Bosan", "Gelisah"],
  },
  {
    id: "quiet-10",
    title: "Jeda tanpa layar",
    goal: "reflect",
    minutes: 10,
    summary: "Berdiam sebentar dan beri pikiran ruang.",
    steps: [
      "Cari tempat yang nyaman dan aman.",
      "Letakkan layar. Kamu boleh duduk, melihat sekitar, atau berpindah posisi.",
      "Menjelang selesai, pikirkan satu kegiatan kecil berikutnya.",
    ],
    places: ["indoor", "outdoor"],
    requiredTools: [],
    optionalTools: [],
    moods: ["Lelah"],
  },
  {
    id: "hands-2",
    title: "Gerakkan tangan dan bahu",
    goal: "move",
    minutes: 2,
    summary: "Gerakan kecil yang bisa dilakukan sambil duduk.",
    steps: [
      "Duduk atau berdiri dengan nyaman.",
      "Buka dan tutup telapak tangan pelan, lalu gerakkan bahu sesuai kenyamanan.",
      "Berhenti bila gerakan terasa tidak nyaman.",
    ],
    places: ["indoor", "outdoor"],
    requiredTools: [],
    optionalTools: [],
    moods: ["Lelah"],
  },
  {
    id: "one-task-2",
    title: "Tentukan langkah pertama",
    goal: "productive",
    minutes: 2,
    summary: "Pilih satu urusan dan buat langkah pertamanya terasa kecil.",
    steps: [
      "Pilih satu hal yang ingin kamu kerjakan.",
      "Pecah menjadi satu langkah yang bisa dimulai dengan mudah.",
      "Siapkan diri untuk melakukan langkah itu setelah timer.",
    ],
    places: ["indoor", "outdoor"],
    requiredTools: [],
    optionalTools: [],
    moods: ["Gelisah", "Lelah"],
  },
];

export const placeLabels = {
  indoor: "Dalam ruangan",
  outdoor: "Luar ruangan",
} as const;
export const toolLabels = {
  paper: "Media menulis",
  water: "Air minum",
} as const;
