import { SceneFun } from "@/components/duo-landing/illustrations/scene-fun";
import { SceneScience } from "@/components/duo-landing/illustrations/scene-science";
import { FeatureRow } from "@/components/duo-landing/organisms/feature-row";

/** First two alternating feature rows of the landing page. */
export function FeaturesIntro() {
  return (
    <>
      <FeatureRow
        id="fitur"
        title="gratis. seru. ringan."
        art={<SceneFun />}
        body={
          <>
            <p>
              Nudge gratis dan langsung bisa dipakai, tanpa bikin akun. Saat
              bosan datang, kamu cukup dapat{" "}
              <strong>satu aktivitas kecil</strong> untuk 2, 5, atau 10 menit.
            </p>
            <p>
              Timernya kamu yang pegang: mulai, jeda, lalu selesai kapan pun
              kamu siap. Tidak ada daftar panjang, tidak ada tekanan.
            </p>
          </>
        }
      />
      <FeatureRow
        id="riset"
        reverse
        title="didukung riset sederhana"
        art={<SceneScience />}
        body={
          <>
            <p>
              Ringkasan riset mendukung hal yang sederhana: jeda aktivitas
              singkat dan lebih sedikit berpindah-pindah tanpa ujung di layar.
              WHO pun mengingatkan bahwa <strong>setiap gerakan berarti</strong>
              .
            </p>
            <p>
              Nudge tidak menjanjikan efek medis. Nudge memberi satu langkah
              yang jelas, lengkap dengan awal dan akhir, supaya kamu bisa
              kembali dengan kepala lebih ringan.
            </p>
          </>
        }
      />
    </>
  );
}
