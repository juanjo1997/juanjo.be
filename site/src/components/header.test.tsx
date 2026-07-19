import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./header";

describe("Header", () => {
  it("brands the site and links home", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "~/juanjo.be" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("links to every section", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "experience" })).toHaveAttribute(
      "href",
      "/experience",
    );
    expect(screen.getByRole("link", { name: "projects" })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.getByRole("link", { name: "writing" })).toHaveAttribute(
      "href",
      "/writing",
    );
  });
});
