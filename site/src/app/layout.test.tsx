import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RootLayout, { metadata } from "./layout";
import { site } from "@/lib/site";

describe("RootLayout", () => {
  it("wraps children in a main landmark", () => {
    // Rendering <html> inside jsdom's container triggers a React DOM-nesting
    // warning; harmless here, we only assert on structure.
    const { container } = render(
      <RootLayout>
        <p>content</p>
      </RootLayout>,
    );
    const main = container.querySelector("main");
    expect(main).not.toBeNull();
    expect(main).toHaveTextContent("content");
  });

  it("declares site-wide metadata", () => {
    expect(metadata.description).toBe(site.description);
    expect(metadata.metadataBase).toEqual(new URL(site.url));
  });
});
