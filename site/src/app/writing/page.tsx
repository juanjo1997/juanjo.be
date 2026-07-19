import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on infrastructure, FinOps, and building things.",
};

export default function Writing() {
  return (
    <>
      <h1>Writing</h1>
      <PostList posts={getAllPosts()} />
    </>
  );
}
