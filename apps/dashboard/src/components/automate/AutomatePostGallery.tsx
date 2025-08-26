"use client";

import { PostCard, PostCardSkelleton } from "@/components/posts/PostCard";
import { useAutomatePosts } from "@/hooks/useAutomatePosts";

type AutomatePostGalleryProps = {
  sessionId: string;
};

export const AutomatePostGallery = ({
  sessionId,
}: AutomatePostGalleryProps) => {
  const { data: session } = useAutomatePosts(sessionId);

  return (
    <div className="grid grid-cols-4 gap-4">
      {session?.posts.map((post) => (
        <PostCard
          canDelete={false}
          key={post.id}
          post={{ ...post, session: { hashtag: session.hashtag } }}
        />
      ))}
      {(!session || session.status === "IN_PROGRESS") && <PostCardSkelleton />}
    </div>
  );
};
