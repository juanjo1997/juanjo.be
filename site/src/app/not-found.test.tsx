import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "./not-found";

describe("NotFound", () => {
  it("renders a 404 heading and a way home", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("404");
    expect(screen.getByRole("link", { name: "Back home" })).toHaveAttribute("href", "/");
  });
});
