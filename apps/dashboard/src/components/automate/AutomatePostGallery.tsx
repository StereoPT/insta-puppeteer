"use client";

import { useAutomatePosts } from "@/hooks/useAutomatePosts";
import { Skeleton } from "@insta-puppeteer/ui/components/skeleton";
import Image from "next/image";

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
        <div className="w-[350px] h-[475px] rounded-2xl bg-muted" key={post.id}>
          <Image
            alt={post.postId}
            className="w-full h-full rounded-2xl object-cover"
            height={475}
            src={`images/${post.postId}.png`}
            unoptimized
            width={350}
          />
        </div>
      ))}
      {(!session || session.status === "IN_PROGRESS") && (
        <Skeleton className="w-[350px] h-[475px] rounded-2xl" />
      )}
    </div>
  );
};
