import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Writing, { metadata } from "./page";
import { getAllPosts } from "@/lib/posts";

describe("Writing", () => {
  it("lists every published post", () => {
    render(<Writing />);
    for (const post of getAllPosts()) {
      expect(screen.getByRole("link", { name: post.title })).toHaveAttribute(
        "href",
        `/writing/${post.slug}`,
      );
    }
  });

  it("has a page title", () => {
    expect(metadata.title).toBe("Writing");
  });
});
