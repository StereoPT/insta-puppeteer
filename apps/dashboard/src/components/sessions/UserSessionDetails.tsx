"use client";

import { ErrorAlert } from "@/components/ErrorAlert";
import { PostGallery } from "@/components/posts/PostGallery";
import { useGetSession } from "@/hooks/sessions/useGetSession";
import { Badge } from "@insta-puppeteer/ui/components/badge";
import { Card, CardContent } from "@insta-puppeteer/ui/components/card";

type UserSessionDetailsProps = {
  sessionId: string;
};

export const UserSessionDetails = ({ sessionId }: UserSessionDetailsProps) => {
  const { data: session } = useGetSession(sessionId);

  if (!session) {
    return <ErrorAlert />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardContent>
            <div className="text-sm text-muted-foreground">Automation</div>
            <div className="mt-2 text-2xl font-semibold">
              {session.hashtag ? `#${session.hashtag}` : "For You"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="text-sm text-muted-foreground">Status</div>
            <div className="mt-2">
              <Badge variant="outline">{session.status}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="text-sm text-muted-foreground">Total Posts</div>
            <div className="mt-2 text-2xl font-semibold">
              {session.posts.length}
            </div>
          </CardContent>
        </Card>
      </div>
      <PostGallery posts={session.posts} />
    </div>
  );
};
