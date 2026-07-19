import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PostList } from "./post-list";

describe("PostList", () => {
  it("renders a dated link per post", () => {
    render(
      <PostList
        posts={[
          { slug: "a-post", title: "A post", date: "2026-01-02", description: "d" },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "A post" })).toHaveAttribute(
      "href",
      "/writing/a-post",
    );
    expect(screen.getByText("Jan 2, 2026")).toBeInTheDocument();
  });
});
