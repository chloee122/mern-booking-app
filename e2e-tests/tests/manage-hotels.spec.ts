import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign in" }).click();

  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.getByLabel("Password").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in successful!")).toBeVisible();
});

test("user can add hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await expect(page.getByRole("heading", { name: "Add Hotel" })).toBeVisible();

  await page.getByLabel("Name").fill("Test hotel");
  await page.getByLabel("City").fill("Test city");
  await page.getByLabel("Country").fill("Test country");
  await page.getByLabel("Description").fill("Test description");
  await page.getByLabel("Price Per Night").fill("100");
  await page.getByLabel("Star Rating").selectOption("3");

  await page.getByText("Budget").click();

  await page.getByLabel("Free WiFi").check();
  await page.getByLabel("Parking").check();

  await page.getByLabel("Adult").fill("2");
  await page.getByLabel("Children").fill("1");

  await page
    .getByLabel("upload image files")
    .setInputFiles([
      path.join(__dirname, "../files/hotel1.jpg"),
      path.join(__dirname, "../files/hotel2.jpg"),
    ]);

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel is successfully created.")).toBeVisible({
    timeout: 15_000,
  });
});
