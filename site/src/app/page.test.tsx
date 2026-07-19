import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";
import { site } from "@/lib/site";

describe("Home", () => {
  it("renders name and description", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(site.name);
    expect(screen.getByText(site.description)).toBeInTheDocument();
  });

  it("links to the public repository", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: site.github })).toHaveAttribute(
      "href",
      site.github,
    );
  });
});
