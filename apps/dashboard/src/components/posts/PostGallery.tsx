"use client";

import { PostCard } from "@/components/posts/PostCard";
import type { Post } from "@insta-puppeteer/database";

type PostGalleryProps = {
  posts: Post[];
};

export const PostGallery = ({ posts }: PostGalleryProps) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
