import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173"

test('should allow user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign in" }).click();

  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com")
  await page.getByLabel("Password").fill("123456")
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});


test("should allow user to sign up", async ({ page }) => {
  const testEmail = `test_user_${Math.floor((Math.random() * 90000) + 10000)}@test.com`
  await page.goto(UI_URL)

  await page.getByRole("link", { name: "Sign in" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();
  await expect(page.getByRole("heading", { name: "Create an Account" })).toBeVisible();

  await page.getByLabel("First name").fill("test_firstName")
  await page.getByLabel("Last name").fill("test_lastName")
  await page.getByLabel("Email").fill(testEmail)
  await page.getByLabel("Password", { exact: true }).fill("123456")
  await page.getByLabel("Confirm Password").fill("123456")
  await page.getByRole("button", { name: "Create Account" }).click()

  await expect(page.getByText("Registration successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
})