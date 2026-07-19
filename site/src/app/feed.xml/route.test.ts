import { describe, expect, it } from "vitest";
import { GET, escapeXml } from "./route";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

describe("escapeXml", () => {
  it("escapes XML-special characters", () => {
    expect(escapeXml("a & b < c > d")).toBe("a &amp; b &lt; c &gt; d");
  });
});

describe("GET /feed.xml", () => {
  it("returns a valid RSS envelope with every post", async () => {
    const response = GET();
    expect(response.headers.get("Content-Type")).toContain("application/rss+xml");
    const xml = await response.text();
    expect(xml).toContain('<rss version="2.0">');
    for (const post of getAllPosts()) {
      expect(xml).toContain(`${site.url}/writing/${post.slug}/`);
    }
  });
});
