import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

describe("sitemap", () => {
  it("covers every section page and post", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(site.url);
    expect(urls).toContain(`${site.url}/experience/`);
    expect(urls).toContain(`${site.url}/projects/`);
    expect(urls).toContain(`${site.url}/writing/`);
    for (const post of getAllPosts()) {
      expect(urls).toContain(`${site.url}/writing/${post.slug}/`);
    }
  });
});
