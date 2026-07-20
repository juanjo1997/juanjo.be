import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Load the exact file that CloudFront deploys (see infra/site.yaml).
const source = fs.readFileSync(
  path.resolve(import.meta.dirname, "../../../infra/functions/router.js"),
  "utf8",
);
// CloudFront functions are bare scripts exposing handler(); evaluate the
// same way instead of pretending it's a module.
const handler = new Function(`${source}; return handler;`)() as (event: {
  request: {
    uri: string;
    headers: Record<string, { value: string }>;
  };
}) => {
  uri?: string;
  statusCode?: number;
  headers?: Record<string, { value: string }>;
};

function run(uri: string, host = "juanjo.be") {
  return handler({ request: { uri, headers: { host: { value: host } } } });
}

describe("CloudFront router function", () => {
  it("serves index.html for directory URLs", () => {
    expect(run("/").uri).toBe("/index.html");
    expect(run("/writing/").uri).toBe("/writing/index.html");
    expect(run("/pr-12/experience/").uri).toBe("/pr-12/experience/index.html");
  });

  it("redirects extensionless paths to their trailing-slash form", () => {
    const response = run("/experience");
    expect(response.statusCode).toBe(301);
    expect(response.headers?.location?.value).toBe("/experience/");
  });

  it("passes real files through untouched", () => {
    expect(run("/feed.xml").uri).toBe("/feed.xml");
    expect(run("/_next/static/css/app.css").uri).toBe("/_next/static/css/app.css");
    expect(run("/portrait.jpg").uri).toBe("/portrait.jpg");
  });

  it("redirects www to the bare domain, preserving the path", () => {
    const response = run("/writing/", "www.juanjo.be");
    expect(response.statusCode).toBe(301);
    expect(response.headers?.location?.value).toBe("https://juanjo.be/writing/");
  });

  it("stays within CloudFront's function size limit", () => {
    expect(source.length).toBeLessThan(4096);
  });
});
