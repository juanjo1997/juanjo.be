import { expect, test } from "@playwright/test";

// Regression net for the design: any unintended pixel change fails the PR.
// Intentional design changes update baselines with `npm run test:e2e -- -u`.
const pages: Record<string, string> = {
  home: "/",
  experience: "/experience/",
  projects: "/projects/",
  writing: "/writing/",
  post: "/writing/how-this-site-is-built/",
};

for (const [name, path] of Object.entries(pages)) {
  test(`${name} matches its baseline`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
}

test("home matches its baseline in light mode", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(page).toHaveScreenshot("home-light.png", { fullPage: true });
});
