import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./footer";
import { site } from "@/lib/site";

describe("Footer", () => {
  it("shows the current copyright year", () => {
    render(<Footer />);
    const year = String(new Date().getFullYear());
    expect(screen.getByText(`© ${year} ${site.name}`)).toBeInTheDocument();
  });

  it("links to the source repo and the RSS feed", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "source" })).toHaveAttribute(
      "href",
      site.repo,
    );
    expect(screen.getByRole("link", { name: "rss" })).toHaveAttribute(
      "href",
      "/feed.xml",
    );
  });
});
