import { expect, test } from "@playwright/test";

type PermissionProbe = {
  requests: number;
  sent: number;
  grant: () => void;
};

for (const scenario of [
  { name: "within the due minute", wait: 15_000, expected: 1 },
  { name: "after the due minute", wait: 90_000, expected: 0 },
]) {
  test(`delayed permission ${scenario.name} sends only a current reminder`, async ({
    page,
  }) => {
    await page.clock.install({ time: new Date(2026, 9, 19, 16, 0, 5) });
    await page.addInitScript(() => {
      const probe: PermissionProbe = { requests: 0, sent: 0, grant: () => {} };
      class MockNotification {
        static permission: NotificationPermission = "default";
        static requestPermission() {
          probe.requests++;
          return new Promise<NotificationPermission>((resolve) => {
            probe.grant = () => {
              MockNotification.permission = "granted";
              resolve("granted");
            };
          });
        }
        constructor() {
          probe.sent++;
        }
      }
      Object.defineProperty(window, "Notification", {
        value: MockNotification,
      });
      Object.defineProperty(window, "permissionProbe", { value: probe });
    });
    await page.goto("/app");
    await page.getByRole("button", { name: "Pengingat", exact: true }).click();
    await page
      .getByRole("checkbox", { name: "Aktifkan pengingat", exact: false })
      .check();
    await page.getByRole("button", { name: "Simpan pengingat" }).click();
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            (window as unknown as { permissionProbe: PermissionProbe })
              .permissionProbe.requests,
        ),
      )
      .toBe(1);
    await page.clock.fastForward(scenario.wait);
    await page.evaluate(() =>
      (
        window as unknown as { permissionProbe: PermissionProbe }
      ).permissionProbe.grant(),
    );
    await expect(page.getByText("Notifikasi: diizinkan.")).toBeVisible();
    await page.clock.fastForward(15_000);
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            (window as unknown as { permissionProbe: PermissionProbe })
              .permissionProbe.sent,
        ),
      )
      .toBe(scenario.expected);
  });
}

test("turning reminders off works with an unfinished time field", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      "nudge.reminder.v1",
      JSON.stringify({ enabled: true, days: [1], time: "16:00" }),
    );
  });
  await page.goto("/app");
  await page.getByRole("button", { name: "Pengingat", exact: true }).click();
  await expect(
    page.getByRole("checkbox", { name: "Aktifkan pengingat", exact: false }),
  ).toBeChecked();
  await page.getByLabel("Waktu lokal perangkat").fill("");
  await page.getByRole("button", { name: "Simpan pengingat" }).click();
  await expect(page.getByRole("main").getByRole("alert")).toContainText(
    "waktu yang valid",
  );
  await page
    .getByRole("checkbox", { name: "Aktifkan pengingat", exact: false })
    .uncheck();
  await page.getByRole("button", { name: "Simpan pengingat" }).click();
  await expect
    .poll(() =>
      page.evaluate(
        () => JSON.parse(localStorage.getItem("nudge.reminder.v1")!).enabled,
      ),
    )
    .toBe(false);
  await expect(
    page.getByText("Pengingat tersimpan: nonaktif.", { exact: false }),
  ).toBeVisible();
});

test("unsupported notifications keep reminder settings and activities usable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Reflect.deleteProperty(window, "Notification");
  });
  await page.goto("/app");
  await page.getByRole("button", { name: "Pengingat", exact: true }).click();
  await expect(
    page.getByText("Browser ini belum mendukung notifikasi.", { exact: false }),
  ).toBeVisible();
  await page
    .getByRole("checkbox", { name: "Aktifkan pengingat", exact: false })
    .check();
  await page.getByRole("button", { name: "Simpan pengingat" }).click();
  await page.getByRole("button", { name: "Kegiatan", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Cari kegiatan kecil" }),
  ).toBeVisible();
});

test("visibility recheck delivers once and reload preserves deduplication", async ({
  page,
}) => {
  await page.clock.install({ time: new Date(2026, 9, 19, 15, 59) });
  await page.addInitScript(() => {
    Object.defineProperty(window, "sentReminders", {
      value: 0,
      writable: true,
    });
    class MockNotification {
      static permission = "granted";
      constructor() {
        (window as unknown as { sentReminders: number }).sentReminders++;
      }
    }
    Object.defineProperty(window, "Notification", { value: MockNotification });
    localStorage.setItem(
      "nudge.reminder.v1",
      JSON.stringify({ enabled: true, days: [1], time: "16:00" }),
    );
  });
  await page.goto("/app");
  await page.getByRole("button", { name: "Pengingat", exact: true }).click();
  await expect(
    page.getByRole("checkbox", { name: "Aktifkan pengingat", exact: false }),
  ).toBeChecked();
  await page.clock.setSystemTime(new Date(2026, 9, 19, 16, 0, 10));
  await page.evaluate(() =>
    document.dispatchEvent(new Event("visibilitychange")),
  );
  await expect
    .poll(() =>
      page.evaluate(
        () => (window as unknown as { sentReminders: number }).sentReminders,
      ),
    )
    .toBe(1);
  await page.reload();
  await page.getByRole("button", { name: "Pengingat", exact: true }).click();
  await expect(
    page.getByRole("checkbox", { name: "Aktifkan pengingat", exact: false }),
  ).toBeChecked();
  await page.clock.fastForward(15_000);
  expect(
    await page.evaluate(
      () => (window as unknown as { sentReminders: number }).sentReminders,
    ),
  ).toBe(0);
  expect(
    await page.evaluate(() => localStorage.getItem("nudge.reminder-sent.v1")),
  ).toBe("2026-10-19-16:00");
});

test("a due reminder is sent once and missed times are skipped", async ({
  page,
}) => {
  await page.clock.install({ time: new Date(2026, 9, 19, 15, 59, 50) });
  await page.addInitScript(() => {
    Object.defineProperty(window, "sentReminders", {
      value: 0,
      writable: true,
    });
    class MockNotification {
      static permission = "granted";
      constructor() {
        (window as unknown as { sentReminders: number }).sentReminders++;
      }
    }
    Object.defineProperty(window, "Notification", { value: MockNotification });
    localStorage.setItem(
      "nudge.reminder.v1",
      JSON.stringify({ enabled: true, days: [1], time: "16:00" }),
    );
  });
  await page.goto("/app");
  await page.getByRole("button", { name: "Pengingat", exact: true }).click();
  await expect(
    page.getByRole("checkbox", { name: "Aktifkan pengingat", exact: false }),
  ).toBeChecked();
  await page.clock.fastForward(20_000);
  await expect
    .poll(() =>
      page.evaluate(
        () => (window as unknown as { sentReminders: number }).sentReminders,
      ),
    )
    .toBe(1);
  await page.clock.fastForward(30_000);
  expect(
    await page.evaluate(
      () => (window as unknown as { sentReminders: number }).sentReminders,
    ),
  ).toBe(1);
  await page.clock.fastForward(90_000);
  expect(
    await page.evaluate(
      () => (window as unknown as { sentReminders: number }).sentReminders,
    ),
  ).toBe(1);
});

test("permission is requested after explicit opt-in, denial remains usable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "notificationRequests", {
      value: 0,
      writable: true,
    });
    class MockNotification {
      static permission = "default";
      static async requestPermission() {
        (window as unknown as { notificationRequests: number })
          .notificationRequests++;
        return "denied";
      }
    }
    Object.defineProperty(window, "Notification", { value: MockNotification });
  });
  await page.goto("/app");
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { notificationRequests: number })
          .notificationRequests,
    ),
  ).toBe(0);
  await page.getByRole("button", { name: "Pengingat", exact: true }).click();
  await page
    .getByRole("checkbox", { name: "Aktifkan pengingat", exact: false })
    .check();
  await page.getByRole("button", { name: "Simpan pengingat" }).click();
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { notificationRequests: number })
          .notificationRequests,
    ),
  ).toBe(1);
  await expect(
    page.getByText("Notifikasi belum diizinkan.", { exact: false }),
  ).toBeVisible();
  await page
    .getByRole("checkbox", { name: "Aktifkan pengingat", exact: false })
    .uncheck();
  await page.getByRole("button", { name: "Simpan pengingat" }).click();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("nudge.reminder.v1")!).enabled,
    ),
  ).toBe(false);
  await page.getByRole("button", { name: "Kegiatan", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Cari kegiatan kecil" }),
  ).toBeVisible();
});

test("editing or disabling schedule prevents old notifications", async ({
  page,
}) => {
  await page.clock.install({ time: new Date(2026, 9, 19, 15, 59, 0) });
  await page.addInitScript(() => {
    Object.defineProperty(window, "sentReminders", {
      value: 0,
      writable: true,
    });
    class MockNotification {
      static permission = "granted";
      static async requestPermission() {
        return "granted";
      }
      constructor() {
        (window as unknown as { sentReminders: number }).sentReminders++;
      }
    }
    Object.defineProperty(window, "Notification", { value: MockNotification });
    localStorage.setItem(
      "nudge.reminder.v1",
      JSON.stringify({ enabled: true, days: [1], time: "16:00" }),
    );
  });
  await page.goto("/app");
  await page.getByRole("button", { name: "Pengingat", exact: true }).click();
  await page.getByLabel("Waktu lokal perangkat").fill("17:00");
  await page.getByRole("button", { name: "Simpan pengingat" }).click();
  await page.clock.fastForward(61_000);
  expect(
    await page.evaluate(
      () => (window as unknown as { sentReminders: number }).sentReminders,
    ),
  ).toBe(0);
  await page
    .getByRole("checkbox", { name: "Aktifkan pengingat", exact: false })
    .uncheck();
  await page.getByRole("button", { name: "Simpan pengingat" }).click();
  await page.clock.fastForward(3_600_000);
  expect(
    await page.evaluate(
      () => (window as unknown as { sentReminders: number }).sentReminders,
    ),
  ).toBe(0);
});
