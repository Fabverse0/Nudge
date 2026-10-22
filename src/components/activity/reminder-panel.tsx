"use client";
import { useState } from "react";
import { BellIcon, CheckIcon } from "@phosphor-icons/react";
import { isReminder, type Reminder } from "@/lib/reminders/schedule";
import { TurtleMascot } from "@/components/ui/turtle-mascot";

const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
export function ReminderPanel({
  value,
  permission,
  save,
}: {
  value: Reminder;
  permission: NotificationPermission | "unsupported";
  save: (next: Reminder) => Promise<void>;
}) {
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  return (
    <section className="settings-panel">
      <div className="settings-heading app-intro">
        <div>
          <h1>Jeda, sesuai jadwalmu.</h1>
          <p className="muted">
            Pengingat bersifat opsional. Atur kapan kamu ingin diajak bergerak
            sebentar.
          </p>
        </div>
        <TurtleMascot pose="think" size={64} eager />
      </div>
      <form
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          const next: Reminder = draft.enabled
            ? draft
            : {
                enabled: false,
                days: draft.days,
                time: isReminder(draft) ? draft.time : value.time,
              };
          if (!isReminder(next)) {
            setError("Pilih setidaknya satu hari dan waktu yang valid.");
            return;
          }
          setError("");
          setSaving(true);
          try {
            await save(next);
            setDraft(next);
          } finally {
            setSaving(false);
          }
        }}
      >
        <div className="reminder-status" data-enabled={value.enabled}>
          <BellIcon size={22} aria-hidden="true" />
          <p>
            <strong>
              Pengingat tersimpan: {value.enabled ? "aktif" : "nonaktif"}.
            </strong>
            <span className="small muted">
              Perubahan berlaku setelah kamu menekan Simpan pengingat.
            </span>
          </p>
        </div>
        <label className="toggle-row">
          <span>
            <strong>Aktifkan pengingat</strong>
            <span className="muted small">Bisa dimatikan kapan saja</span>
          </span>
          <input
            type="checkbox"
            checked={draft.enabled}
            onChange={(e) => setDraft({ ...draft, enabled: e.target.checked })}
          />
        </label>
        <fieldset>
          <legend>Hari pengingat</legend>
          <div className="day-options">
            {days.map((day, index) => (
              <label className="choice day-choice" key={day}>
                <input
                  type="checkbox"
                  checked={draft.days.includes(index)}
                  onChange={() =>
                    setDraft({
                      ...draft,
                      days: draft.days.includes(index)
                        ? draft.days.filter((d) => d !== index)
                        : [...draft.days, index],
                    })
                  }
                />
                <span>{day}</span>
                <CheckIcon
                  size={14}
                  className="selection-check"
                  aria-hidden="true"
                />
              </label>
            ))}
          </div>
        </fieldset>
        <label className="time-label">
          Waktu lokal perangkat
          <input
            type="time"
            required={draft.enabled}
            value={draft.time}
            onChange={(e) => setDraft({ ...draft, time: e.target.value })}
          />
        </label>
        <div className="info-note">
          <strong>Selama Nudge terbuka dan berjalan</strong>
          <p>
            Browser dapat menunda pengiriman. Jadwal yang terlewat tidak dikirim
            ulang. Pengingat belum bekerja ketika aplikasi ditutup.
          </p>
        </div>
        <p className="small permission-status">
          {permission === "granted"
            ? "Notifikasi: diizinkan."
            : permission === "denied"
              ? "Notifikasi belum diizinkan. Ubah izin di pengaturan browser jika ingin menerima notifikasi. Kamu tetap bisa memulai kegiatan secara manual."
              : permission === "unsupported"
                ? "Browser ini belum mendukung notifikasi. Nudge tetap bisa digunakan secara manual."
                : "Izin browser baru diminta setelah kamu menyimpan pengingat aktif."}
        </p>
        {error && (
          <p className="error-note" role="alert">
            {error}
          </p>
        )}
        <button className="button primary" disabled={saving} type="submit">
          {saving ? "Menyimpan..." : "Simpan pengingat"}
        </button>
      </form>
    </section>
  );
}
