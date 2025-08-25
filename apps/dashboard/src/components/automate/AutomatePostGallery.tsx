"use client";

import { GetAutomatePosts } from "@/actions/getAutomatePosts";
import { Skeleton } from "@insta-puppeteer/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type AutomatePostGalleryProps = {
  sessionId: string;
};

export const AutomatePostGallery = ({
  sessionId,
}: AutomatePostGalleryProps) => {
  const { data: session } = useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => GetAutomatePosts(sessionId),
    refetchInterval: (q) =>
      q.state.data?.status === "IN_PROGRESS" ? 1000 : false,
  });

  return (
    <div className="grid grid-cols-4 gap-4">
      {session?.posts.map((post) => (
        <div key={post.id}>
          <Image
            alt={post.postId}
            className="w-[350px] h-[475px] rounded-2xl object-contain"
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
