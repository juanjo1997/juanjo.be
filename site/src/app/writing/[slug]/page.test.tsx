import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PostPage, { generateMetadata, generateStaticParams } from "./page";
import { getAllPosts } from "@/lib/posts";

const first = getAllPosts()[0]!;
const params = Promise.resolve({ slug: first.slug });

describe("PostPage", () => {
  it("pre-renders a static param per post", () => {
    expect(generateStaticParams()).toContainEqual({ slug: first.slug });
  });

  it("builds metadata from the post frontmatter", async () => {
    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe(first.title);
    expect(metadata.description).toBe(first.description);
  });

  it("renders the post title, date, and body", async () => {
    render(await PostPage({ params }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(first.title);
    expect(document.querySelector("article .prose")?.innerHTML).toContain("<p>");
  });
});
