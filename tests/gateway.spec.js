const { test, expect } = require("@playwright/test");

test("gateway review flow works across critical UI states", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "AI Gateway" })).toBeVisible();
  await expect(page.locator("#contextBar")).toBeVisible();

  await page.getByRole("button", { name: "Enter review mode" }).click();
  await expect(page.getByRole("button", { name: "Exit review mode" })).toBeVisible();
  await page.locator('[data-scene-id="bridge-lane"]').click();
  await expect(page.locator("#contextScene")).toHaveText("Scene: Bridge lane");

  await expect(page.getByRole("heading", { name: "Confirm what happens before send" })).toBeVisible();
  await expect(page.getByLabel(/I approve reduced, de-identified external payload use/i)).toBeVisible();

  await page.getByLabel(/I approve reduced, de-identified external payload use/i).check();
  await page.getByRole("button", { name: "Run approved demo request" }).click();

  await expect(page.getByRole("heading", { name: "Lane-specific output" })).toBeVisible();
  await expect(page.getByText("Internal review summary")).toBeVisible();
  await expect(page.getByText("Review checklist")).toBeHidden();

  await page.getByRole("button", { name: /Exit review mode/i }).click();
  await expect(page.getByRole("button", { name: "Presenter tools" })).toBeVisible();

  await page.getByRole("button", { name: /Copy summary/i }).click();
  await expect(page.locator("#actionToast")).toContainText(/Summary copied|Copy summary failed/);

  await expect(page.locator("#contextRecommendedButton")).toBeHidden();
});
