import type { Metadata } from "next";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return { title: post.title, description: post.description };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  return (
    <article>
      <header className="post-header">
        <h1>{post.title}</h1>
        <p className="muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
