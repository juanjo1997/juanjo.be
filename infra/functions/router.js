// CloudFront viewer-request function (cloudfront-js-2.0).
// Single source of truth: this file is injected into site.yaml as the
// RouterFunctionCode parameter at deploy time, and unit-tested from the
// site's Vitest suite. Keep it dependency-free and under 4KB.
function handler(event) {
  var request = event.request;
  var host = request.headers.host && request.headers.host.value;
  var uri = request.uri;

  // www.juanjo.be -> juanjo.be (one canonical hostname).
  if (host && host.startsWith("www.")) {
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: { location: { value: "https://" + host.slice(4) + uri } },
    };
  }

  // Directory URL: serve its index document (S3 has no default docs via REST).
  if (uri.endsWith("/")) {
    request.uri = uri + "index.html";
    return request;
  }

  // Extensionless path: redirect to the canonical trailing-slash URL.
  if (!uri.split("/").pop().includes(".")) {
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: { location: { value: uri + "/" } },
    };
  }

  return request;
}
