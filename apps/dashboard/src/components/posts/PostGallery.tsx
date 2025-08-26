"use client";

import { GetPosts } from "@/actions/getPosts";
import { Badge } from "@insta-puppeteer/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@insta-puppeteer/ui/components/card";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export const PostGallery = () => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => GetPosts(),
  });

  return (
    <div className="grid grid-cols-4 gap-4">
      {posts?.map((post) => (
        <Card className="w-[350px] pb-0" key={post.id}>
          <CardHeader>
            <CardTitle>@{post.username}</CardTitle>
            <CardDescription>
              <Badge>#{post.session.hashtag}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[475px] px-0 bg-muted rounded-b-xl">
            <Image
              alt={post.postId}
              className="w-full h-full object-cover overflow-hidden rounded-b-xl"
              height={475}
              src={`images/${post.postId}.png`}
              unoptimized
              width={350}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
