import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export type Post = PostMeta & { html: string };

const defaultDir = path.join(process.cwd(), "content", "writing");

// Everything here is synchronous on purpose: it runs at build time only,
// and sync code keeps the page components sync and directly testable.
const processor = remark().use(remarkGfm).use(remarkRehype).use(rehypeStringify);

function parse(dir: string, file: string): Post {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const { data, content } = matter(raw);
  const meta = data as Omit<PostMeta, "slug">;
  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title,
    date: meta.date,
    description: meta.description,
    html: String(processor.processSync(content)),
  };
}

export function getAllPosts(dir: string = defaultDir): Post[] {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => parse(dir, file))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string, dir: string = defaultDir): Post {
  return parse(dir, `${slug}.md`);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
