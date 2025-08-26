import { DeletePostAlert } from "@/components/posts/DeletePostAlert";
import type { PostWithSession } from "@/types/posts";
import { Badge } from "@insta-puppeteer/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@insta-puppeteer/ui/components/card";
import Image from "next/image";

type PostCardProps = {
  post: PostWithSession;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="relative w-[350px] pb-0 group" key={post.id}>
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

      <DeletePostAlert id={post.id} postId={post.postId} />
    </Card>
  );
};
