"use client";

import { PostCard } from "@/components/posts/PostCard";
import { usePosts } from "@/hooks/usePosts";

export const PostGallery = () => {
  const { data: posts } = usePosts();

  return (
    <div className="grid grid-cols-4 gap-4">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
