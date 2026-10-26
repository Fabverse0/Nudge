"use client";
import { useRef, useState } from "react";
import { TrashIcon } from "@phosphor-icons/react";
import { activities, goals, type Activity } from "@/lib/activities/catalog";
import type { HistoryState } from "@/lib/storage/history";
import { TurtleMascot } from "@/components/ui/turtle-mascot";
import { GoalIcon } from "./activity-primitives";

export function HistoryPanel({
  state,
  loaded,
  onEnabled,
  onRemove,
  onClear,
  onOpen,
}: {
  state: HistoryState;
  loaded: boolean;
  onEnabled: (enabled: boolean) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onOpen: (activity: Activity) => void;
}) {
  const [confirmClear, setConfirmClear] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const title = useRef<HTMLHeadingElement>(null);
  return (
    <section className="history-panel">
      <div className="app-intro">
        <div>
          <h1 ref={title} tabIndex={-1}>
            Langkah yang sudah kamu ambil.
          </h1>
          <p className="muted">
            Riwayat kegiatan di browser dan perangkat ini saja.
          </p>
        </div>
        <TurtleMascot pose="content" size={64} />
      </div>
      {!loaded ? (
        <p role="status">Membaca riwayat...</p>
      ) : (
        <>
          <div className="history-settings">
            <label className="history-toggle">
              <input
                type="checkbox"
                checked={state.enabled}
                onChange={(event) => onEnabled(event.target.checked)}
              />
              Simpan kegiatan selesai
            </label>
            <p className="field-hint">
              {state.enabled
                ? "Otomatis setelah kamu menekan Selesai. Maksimal 100 catatan terbaru."
                : "Pencatatan berikutnya nonaktif. Catatan yang sudah ada tetap tersedia."}
            </p>
          </div>
          {state.entries.length ? (
            <>
              <p className="field-hint">
                Durasi di bawah adalah durasi kegiatan, bukan catatan waktu yang
                benar-benar dijalani.
              </p>
              <ol className="history-list">
                {state.entries.map((entry) => {
                  const activity = activities.find(
                    (item) => item.id === entry.activityId,
                  );
                  return (
                    <li key={entry.id}>
                      <article className="history-row">
                        <span
                          className={`favorite-symbol ${goals[entry.goal].color}`}
                        >
                          <GoalIcon goal={entry.goal} />
                        </span>
                        <div className="history-description">
                          <h2>{entry.title}</h2>
                          <p className="small muted">
                            Durasi kegiatan: {entry.minutes} menit
                          </p>
                          <time
                            className="small"
                            dateTime={new Date(entry.completedAt).toISOString()}
                          >
                            {new Intl.DateTimeFormat("id-ID", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            }).format(entry.completedAt)}
                          </time>
                          {!activity && (
                            <p className="small">
                              Kegiatan ini sudah tidak tersedia di katalog.
                            </p>
                          )}
                        </div>
                        <div className="history-actions">
                          <button
                            className="button secondary"
                            disabled={!activity}
                            onClick={() => activity && onOpen(activity)}
                          >
                            Coba lagi
                          </button>
                          <button
                            className="icon-button"
                            aria-label={`Hapus ${entry.title} dari riwayat`}
                            onClick={() => {
                              onRemove(entry.id);
                              setAnnouncement("Catatan dihapus.");
                              title.current?.focus({ preventScroll: true });
                            }}
                          >
                            <TrashIcon size={22} aria-hidden="true" />
                          </button>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ol>
              {confirmClear ? (
                <div
                  className="history-confirm"
                  role="group"
                  aria-label="Konfirmasi hapus seluruh riwayat"
                >
                  <p>Hapus seluruh riwayat di perangkat ini?</p>
                  <div className="reason-options">
                    <button
                      className="button secondary"
                      onClick={() => setConfirmClear(false)}
                    >
                      Batal
                    </button>
                    <button
                      className="button primary"
                      onClick={() => {
                        onClear();
                        setConfirmClear(false);
                        setAnnouncement("Seluruh riwayat dihapus.");
                        title.current?.focus({ preventScroll: true });
                      }}
                    >
                      Ya, hapus semua
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="text-button"
                  onClick={() => setConfirmClear(true)}
                >
                  Hapus seluruh riwayat
                </button>
              )}
            </>
          ) : (
            <div className="empty-state">
              <TurtleMascot pose="pause" size={96} />
              <h2>Belum ada kegiatan di riwayat.</h2>
              <p>
                Kegiatan muncul di sini setelah kamu menekan Selesai, selama
                pencatatan aktif.
              </p>
            </div>
          )}
          <p className="field-hint">
            Menghapus data browser juga menghapus riwayat ini. Mood dan isi
            jurnal tidak disimpan.
          </p>
        </>
      )}
      <p role="status" className="field-hint">
        {announcement}
      </p>
    </section>
  );
}
