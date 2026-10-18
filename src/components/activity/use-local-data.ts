"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { readFavorites, writeFavorites } from "@/lib/storage/storage";
import { defaultReminder, readReminder, REMINDER_KEY, reminderOccurrence, type Reminder } from "@/lib/reminders/schedule";

const SENT_KEY = "nudge.reminder-sent.v1";
export function useLocalData() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [reminder, setReminder] = useState<Reminder>(defaultReminder);
  const [notice, setNotice] = useState("");
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">("unsupported");
  const [loaded, setLoaded] = useState(false);
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    function load() {
      try {
        const saved = readFavorites(window.localStorage);
        const schedule = readReminder(window.localStorage);
        setFavorites(saved.value); setReminder(schedule.value);
        if (saved.error || schedule.error) setNotice(saved.error ?? schedule.error ?? "");
      } catch { setNotice("Penyimpanan lokal tidak tersedia. Kamu tetap bisa menggunakan Nudge selama halaman terbuka."); }
      setPermission("Notification" in window ? Notification.permission : "unsupported");
      setLoaded(true);
    }
    const timeout = window.setTimeout(load, 0);
    window.addEventListener("storage", load);
    const updatePermission = () => setPermission("Notification" in window ? Notification.permission : "unsupported");
    window.addEventListener("focus", updatePermission);
    return () => { clearTimeout(timeout); window.removeEventListener("storage", load); window.removeEventListener("focus", updatePermission); };
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
    setFavorites(next);
    try { setNotice(writeFavorites(window.localStorage, next) ?? (next.includes(id) ? "Kegiatan ditambahkan ke favorit." : "Kegiatan dihapus dari favorit.")); }
    catch { setNotice("Favorit hanya tersedia selama halaman terbuka karena penyimpanan lokal tidak tersedia."); }
  }, [favorites]);

  const saveReminder = useCallback(async (next: Reminder) => {
    setReminder(next);
    try { window.localStorage.setItem(REMINDER_KEY, JSON.stringify(next)); setNotice(next.enabled ? "Jadwal pengingat disimpan di perangkat ini." : "Pengingat dimatikan."); }
    catch { setNotice("Jadwal belum tersimpan. Pengaturan ini hanya berlaku selama halaman terbuka."); }
    if (!next.enabled) return;
    if (!("Notification" in window)) { setPermission("unsupported"); return; }
    try {
      const result = Notification.permission === "default" ? await Notification.requestPermission() : Notification.permission;
      setPermission(result);
    } catch { setNotice("Izin notifikasi belum bisa diminta. Kamu tetap bisa menggunakan Nudge secara manual."); }
  }, []);

  useEffect(() => {
    if (!loaded || !reminder.enabled) return;
    async function check() {
      const occurrence = reminderOccurrence(reminder, new Date());
      if (!occurrence) return;
      const deliver = async () => {
        if (lastSent.current === occurrence) return;
        try { if (window.localStorage.getItem(SENT_KEY) === occurrence) return; } catch { /* In-memory deduplication still protects this tab. */ }
        lastSent.current = occurrence;
        try { window.localStorage.setItem(SENT_KEY, occurrence); } catch { /* No personal content is stored in this event marker. */ }
        setNotice("Ada waktu sebentar? Kamu bisa mencoba satu kegiatan kecil.");
        if (!("Notification" in window) || Notification.permission !== "granted") return;
        try {
          const registration = "serviceWorker" in navigator ? await navigator.serviceWorker.getRegistration() : undefined;
          const options = { body: "Pilih kegiatan 2, 5, atau 10 menit. Kamu yang menentukan.", icon: "/icons/192", tag: occurrence };
          if (registration) await registration.showNotification("Saatnya satu langkah kecil?", options);
          else new Notification("Saatnya satu langkah kecil?", options);
        } catch { setNotice("Notifikasi belum bisa dikirim. Kamu bisa memulai kegiatan langsung di sini."); }
      };
      if (navigator.locks) await navigator.locks.request("nudge-reminder", deliver);
      else await deliver();
    }
    const interval = window.setInterval(() => { void check(); }, 15_000);
    const onVisible = () => { if (document.visibilityState === "visible") void check(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => { clearInterval(interval); document.removeEventListener("visibilitychange", onVisible); };
  }, [loaded, reminder]);

  return { favorites, reminder, notice, setNotice, permission, loaded, toggleFavorite, saveReminder };
}
