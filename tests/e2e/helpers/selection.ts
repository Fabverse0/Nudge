import type { Page } from "@playwright/test";

export async function skipOptionalEnergy(page: Page) {
  if (await page.locator('.selection-step[data-step="energy"]').count()) {
    await page.getByRole("button", { name: "Lewati", exact: true }).click();
  }
}
