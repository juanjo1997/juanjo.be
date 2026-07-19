import { expect, test } from "@playwright/test";

test.describe("navigation", () => {
  test("home renders and reaches every section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Juan Beltran");

    await page.getByRole("navigation").getByRole("link", { name: "experience" }).click();
    await expect(page).toHaveURL(/\/experience\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Experience");

    await page.getByRole("navigation").getByRole("link", { name: "projects" }).click();
    await expect(page).toHaveURL(/\/projects\/$/);

    await page.getByRole("navigation").getByRole("link", { name: "writing" }).click();
    await expect(page).toHaveURL(/\/writing\/$/);
  });

  test("a post is reachable from the writing index", async ({ page }) => {
    await page.goto("/writing/");
    await page
      .getByRole("link", { name: "This site is overengineered on purpose" })
      .click();
    await expect(page).toHaveURL(/\/writing\/how-this-site-is-built\/$/);
    await expect(page.locator("article .prose p").first()).toBeVisible();
  });

  test("unknown URLs get the 404 page", async ({ page }) => {
    const response = await page.goto("/no-such-page/");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await page.getByRole("link", { name: "cd ~" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Juan Beltran");
  });

  test("internal links on the home page all resolve", async ({ page, request }) => {
    await page.goto("/");
    const hrefs = await page
      .locator("a[href^='/']")
      .evaluateAll((links) => links.map((a) => (a as HTMLAnchorElement).href));
    for (const href of new Set(hrefs)) {
      const response = await request.get(href);
      expect(response.status(), href).toBe(200);
    }
  });
});

test.describe("feeds and metadata", () => {
  test("RSS feed is valid XML listing the posts", async ({ request }) => {
    const response = await request.get("/feed.xml");
    expect(response.status()).toBe(200);
    const xml = await response.text();
    expect(xml).toContain("<rss");
    expect(xml).toContain("This site is overengineered on purpose");
  });

  test("sitemap covers the section pages", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const xml = await response.text();
    for (const path of ["/experience/", "/projects/", "/writing/"]) {
      expect(xml).toContain(`https://juanjo.be${path}`);
    }
  });

  test("pages carry titles and descriptions", async ({ page }) => {
    await page.goto("/experience/");
    await expect(page).toHaveTitle("Experience · Juan Beltran");
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /.+/);
  });
});
