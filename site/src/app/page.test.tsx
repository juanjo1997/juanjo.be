import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";
import { site } from "@/lib/site";

describe("Home", () => {
  it("renders name and lede", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(site.name);
    expect(screen.getByText(site.description)).toBeInTheDocument();
  });

  it("lists recent writing", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /Recent writing/ })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "This site is overengineered on purpose" }),
    ).toBeInTheDocument();
  });

  it("shows the portrait", () => {
    render(<Home />);
    const portrait = screen.getByRole("img", { name: site.name });
    expect(portrait).toHaveAttribute("src", expect.stringContaining("portrait"));
  });

  it("links out to email, GitHub, and LinkedIn", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "email" })).toHaveAttribute(
      "href",
      `mailto:${site.email}`,
    );
    expect(screen.getByRole("link", { name: "github" })).toHaveAttribute(
      "href",
      site.github,
    );
    expect(screen.getByRole("link", { name: "linkedin" })).toHaveAttribute(
      "href",
      site.linkedin,
    );
  });

  it("links to every section of the site", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "experience" })).toHaveAttribute(
      "href",
      "/experience",
    );
    expect(screen.getByRole("link", { name: "build on the side" })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.getByRole("link", { name: "things I've written" })).toHaveAttribute(
      "href",
      "/writing",
    );
  });
});
