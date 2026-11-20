import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Plan your renovation/i })).toBeVisible();
});

test("concrete slab calculator computes", async ({ page }) => {
  await page.goto("/calculators/concrete-slab/");
  await page.getByLabel(/Length/i).first().fill("10");
  await page.getByLabel(/Width/i).first().fill("10");
  await page.getByLabel(/Thickness/i).fill("4");
  await page.getByRole("button", { name: /Calculate/i }).click();
  await expect(page.getByText(/Estimated concrete required/i)).toBeVisible();
});

test("no horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});

test("keyboard navigation can submit form", async ({ page }) => {
  await page.goto("/calculators/concrete-slab/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: /Calculate/i })).toBeVisible();
});

const CALC_PAGES = [
  "/calculators/square-footage/",
  "/calculators/flooring/",
  "/calculators/paint/",
  "/calculators/fence-material/",
  "/calculators/deck-material/",
  "/calculators/roof-area-pitch/",
  "/calculators/renovation-budget/",
];

for (const path of CALC_PAGES) {
  test(`calculator page loads: ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}
