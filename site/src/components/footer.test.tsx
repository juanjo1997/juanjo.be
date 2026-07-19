import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Footer } from "./footer";
import { site } from "@/lib/site";

afterEach(() => {
  vi.unstubAllEnvs();
});

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

  it("links the build to its commit when CI injects a sha", () => {
    vi.stubEnv("NEXT_PUBLIC_GIT_SHA", "abc1234def5678");
    render(<Footer />);
    expect(screen.getByRole("link", { name: "abc1234" })).toHaveAttribute(
      "href",
      `${site.repo}/commit/abc1234def5678`,
    );
  });

  it("labels local builds as dev", () => {
    render(<Footer />);
    expect(screen.getByText(/built from dev/)).toBeInTheDocument();
  });
});
