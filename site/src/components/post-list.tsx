import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/posts";

export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <Link href={`/writing/${post.slug}/`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
