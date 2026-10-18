import { afterEach, expect, it, vi } from "vitest";
import { sendReminder } from "./notifications";

afterEach(() => vi.unstubAllGlobals());

function mockNotifications(permission: NotificationPermission = "granted") {
  const notification = Object.assign(vi.fn(), { permission });
  vi.stubGlobal("Notification", notification);
  vi.stubGlobal("window", { Notification: notification });
  return notification;
}

it("uses the service worker notification adapter when available", async () => {
  const notification = mockNotifications();
  const showNotification = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal("navigator", {
    serviceWorker: {
      getRegistration: vi.fn().mockResolvedValue({ showNotification }),
    },
  });
  await sendReminder("2026-10-19-16:00", () => false);
  expect(showNotification).toHaveBeenCalledWith(
    "Saatnya satu langkah kecil?",
    expect.objectContaining({ tag: "2026-10-19-16:00", icon: "/icons/192" }),
  );
  expect(notification).not.toHaveBeenCalled();
});

it("does not send after cancellation while registration is pending", async () => {
  mockNotifications();
  const showNotification = vi.fn();
  let finishRegistration!: (value: {
    showNotification: typeof showNotification;
  }) => void;
  const registration = new Promise<{
    showNotification: typeof showNotification;
  }>((resolve) => {
    finishRegistration = resolve;
  });
  vi.stubGlobal("navigator", {
    serviceWorker: { getRegistration: () => registration },
  });
  let cancelled = false;
  const delivery = sendReminder("2026-10-19-16:00", () => cancelled);
  cancelled = true;
  finishRegistration({ showNotification });
  await delivery;
  expect(showNotification).not.toHaveBeenCalled();
});

it("does not access service workers when notification permission is denied", async () => {
  const notification = mockNotifications("denied");
  const getRegistration = vi.fn();
  vi.stubGlobal("navigator", { serviceWorker: { getRegistration } });
  await sendReminder("2026-10-19-16:00", () => false);
  expect(getRegistration).not.toHaveBeenCalled();
  expect(notification).not.toHaveBeenCalled();
});
