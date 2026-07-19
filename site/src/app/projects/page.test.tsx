import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Projects, { metadata } from "./page";
import { projects } from "@/lib/projects";

describe("Projects", () => {
  it("renders every project", () => {
    render(<Projects />);
    for (const project of projects) {
      expect(screen.getByRole("heading", { name: project.name })).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
    }
  });

  it("links projects with public repos and not the private ones", () => {
    render(<Projects />);
    expect(screen.getByRole("link", { name: "db-cost-allocator" })).toHaveAttribute(
      "href",
      "https://github.com/juanjo1997/db-cost-allocator",
    );
    expect(
      screen.queryByRole("link", { name: "trading-engine" }),
    ).not.toBeInTheDocument();
  });

  it("has a page title", () => {
    expect(metadata.title).toBe("Projects");
  });
});
