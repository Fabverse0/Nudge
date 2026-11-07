import { SceneMotivation } from "@/components/duo-landing/illustrations/scene-motivation";
import { ScenePersonal } from "@/components/duo-landing/illustrations/scene-personal";
import { FeatureRow } from "@/components/duo-landing/organisms/feature-row";

/** Feature rows 3 and 4: gentle motivation, then the personalised suggestion picker. */
export function FeaturesMore() {
  return (
    <>
      <FeatureRow
        id="motivasi"
        title="tetap termotivasi"
        art={<SceneMotivation />}
        body={
          <p>
            Pasang pengingat lembut kalau kamu mau, dengan jam yang kamu pilih
            sendiri. Simpan aktivitas favoritmu, ditemani kura-kura kecil yang
            selalu senang kamu kembali. Riwayat aktivitas yang selesai tersimpan
            di perangkatmu, tanpa hitungan beruntun dan tanpa rasa bersalah
            kalau hari ini kamu istirahat.
          </p>
        }
      />
      <FeatureRow
        id="personal"
        reverse
        title="disesuaikan denganmu"
        art={<ScenePersonal />}
        body={
          <p>
            Pilih suasana hati (atau lewati), tujuan, energi (boleh dilewati
            juga), dan waktu yang kamu punya. Nudge lalu memilihkan satu saran
            yang pas. Belum sreg? Tekan <strong>Kurang cocok</strong> dan saran
            baru langsung muncul. Tanpa akun, dan tidak ada yang keluar dari
            perangkatmu.
          </p>
        }
      />
    </>
  );
}
