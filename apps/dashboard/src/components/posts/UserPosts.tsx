"use client";

import { ErrorAlert } from "@/components/ErrorAlert";
import { PostGallery } from "@/components/posts/PostGallery";
import { usePosts } from "@/hooks/posts/usePosts";

export const UserPosts = () => {
  const { data: posts } = usePosts();

  if (!posts) {
    return <ErrorAlert />;
  }

  return <PostGallery posts={posts} />;
};
