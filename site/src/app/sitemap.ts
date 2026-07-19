import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/experience/", "/projects/", "/writing/"].map((path) => ({
    url: `${site.url}${path}`,
  }));
  const posts = getAllPosts().map((post) => ({
    url: `${site.url}/writing/${post.slug}/`,
    lastModified: post.date,
  }));
  return [...pages, ...posts];
}
