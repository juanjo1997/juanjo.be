import path from "node:path";
import { describe, expect, it } from "vitest";
import { formatDate, getAllPosts, getPost } from "./posts";

const fixtures = path.join(import.meta.dirname, "__fixtures__", "writing");

describe("getAllPosts", () => {
  it("returns posts sorted newest first", () => {
    const posts = getAllPosts(fixtures);
    expect(posts.map((p) => p.slug)).toEqual(["newer-post", "older-post"]);
  });

  it("reads the real content directory by default", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.title).toBeTruthy();
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.description).toBeTruthy();
    }
  });
});

describe("getPost", () => {
  it("parses frontmatter and renders markdown to HTML", () => {
    const post = getPost("older-post", fixtures);
    expect(post.title).toBe("Older post");
    expect(post.html).toContain("<strong>markdown</strong>");
  });

  it("renders GFM tables", () => {
    const post = getPost("newer-post", fixtures);
    expect(post.html).toContain("<table>");
  });
});

describe("formatDate", () => {
  it("formats ISO dates for display without timezone drift", () => {
    expect(formatDate("2026-07-19")).toBe("Jul 19, 2026");
    expect(formatDate("2024-01-01")).toBe("Jan 1, 2024");
  });
});
