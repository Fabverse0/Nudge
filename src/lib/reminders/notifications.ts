export async function sendReminder(occurrence: string, cancelled: () => boolean): Promise<void> {
  if (cancelled() || !("Notification" in window) || Notification.permission !== "granted") return;
  const registration = "serviceWorker" in navigator ? await navigator.serviceWorker.getRegistration() : undefined;
  if (cancelled()) return;
  const options = { body: "Pilih kegiatan 2, 5, atau 10 menit. Kamu yang menentukan.", icon: "/icons/192", tag: occurrence };
  if (registration) await registration.showNotification("Saatnya satu langkah kecil?", options);
  else new Notification("Saatnya satu langkah kecil?", options);
}
