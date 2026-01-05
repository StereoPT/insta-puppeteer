import { DeletePostAlert } from "@/components/posts/DeletePostAlert";
import type { Post } from "@insta-puppeteer/database";
import { Badge } from "@insta-puppeteer/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@insta-puppeteer/ui/components/card";
import { Skeleton } from "@insta-puppeteer/ui/components/skeleton";
import Image from "next/image";

export const PostCardSkelleton = () => {
  return (
    <Card className="w-[350px] pb-0">
      <CardHeader>
        <Skeleton className="w-50 h-5" />
        <Skeleton className="w-25 h-5" />
      </CardHeader>
      <CardContent className="h-[475px] px-0 bg-muted rounded-b-xl">
        <Skeleton className="rounded-t-none rounded-b-xl w-full h-full" />
      </CardContent>
    </Card>
  );
};

type PostCardProps = {
  post: Post & { session?: { hashtag: string } };
  canDelete?: boolean;
};

export const PostCard = ({ post, canDelete = true }: PostCardProps) => {
  return (
    <Card className="relative w-[350px] pb-0 group" key={post.id}>
      <CardHeader>
        <CardTitle>@{post.username}</CardTitle>
        {post.session && (
          <CardDescription>
            <Badge>#{post.session.hashtag}</Badge>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="h-[475px] px-0 bg-muted rounded-b-xl">
        <a href={post.postLink} target="_blank">
          <Image
            alt={post.postId}
            className="w-full h-full object-cover overflow-hidden rounded-b-xl"
            height={475}
            src={`/images/${post.postId}.png`}
            unoptimized
            width={350}
          />
        </a>
      </CardContent>

      {canDelete && <DeletePostAlert id={post.id} postId={post.postId} />}
    </Card>
  );
};
