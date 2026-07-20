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

  it("links every project to its public repo", () => {
    render(<Projects />);
    for (const project of projects) {
      expect(screen.getByRole("link", { name: project.name })).toHaveAttribute(
        "href",
        project.url,
      );
    }
  });

  it("has a page title", () => {
    expect(metadata.title).toBe("Projects");
  });
});
