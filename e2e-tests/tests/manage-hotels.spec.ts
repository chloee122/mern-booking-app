import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page, request }) => {
  await request.post(`http://localhost:3009/api/users/register`, {
    data: {
      email: "test@mail.com",
      password: "123456",
      firstName: "test",
      lastName: "user",
    },
  });
  
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign in" }).click();

  await page.locator("[name=email]").fill("test@mail.com");
  await page.getByLabel("Password").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in successful!")).toBeVisible();
});

test.afterAll(async ({ request }) => {
  await request.post(`http://localhost:3009/api/testing/reset`);
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await expect(page.getByRole("heading", { name: "Add Hotel" })).toBeVisible();

  await page.getByLabel("Name").fill("Test Hotel");
  await page.getByLabel("City").fill("Test City");
  await page.getByLabel("Country").fill("Test Country");
  await page.getByLabel("Description").fill("Test Description");
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
    timeout: 20_000,
  });
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.getByLabel("Name").fill("Hotel Aurora");
  await page.getByLabel("City").fill("Barcelona");
  await page.getByLabel("Country").fill("Spain");
  await page
    .getByLabel("Description")
    .fill("Nestled in the heart of Barcelona");
  await page.getByLabel("Price Per Night").fill("117");
  await page.getByLabel("Star Rating").selectOption("5");

  await page.getByText("Romantic").click();

  await page.getByLabel("Spa").check();
  await page.getByLabel("Fitness Center").check();

  await page.getByLabel("Adult").fill("1");
  await page.getByLabel("Children").fill("1");

  await page
    .getByLabel("upload image files")
    .setInputFiles([
      path.join(__dirname, "../files/hotel1.jpg"),
      path.join(__dirname, "../files/hotel2.jpg"),
    ]);

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel is successfully created.")).toBeVisible({
    timeout: 20_000,
  });

  await page.goto(`${UI_URL}/my-hotels`);

  await expect(page.getByRole("heading", { name: "My Hotels" })).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Hotel Aurora" })
  ).toBeVisible();
  await expect(
    page.getByText("Nestled in the heart of Barcelona")
  ).toBeVisible();
  await expect(page.getByText("Barcelona, Spain")).toBeVisible();
  await expect(page.getByText("Romantic")).toBeVisible();
  await expect(page.getByText("€117/night")).toBeVisible();
  await expect(page.getByText("1 adults, 1 children")).toBeVisible();
  await expect(page.getByText("5 Star Rating")).toBeVisible();

  await expect(
    page
      .locator("data-testid=hotel-card")
      .filter({ has: page.getByRole("heading", { name: "Hotel Aurora" }) })
      .getByRole("link", { name: "View details" })
  ).toBeVisible();
});
