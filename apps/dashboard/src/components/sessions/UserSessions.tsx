"use client";

import { ErrorAlert } from "@/components/ErrorAlert";
import { ROUTES } from "@/constants/routes";
import { useGetSessions } from "@/hooks/sessions/useGetSessions";
import { Button } from "@insta-puppeteer/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@insta-puppeteer/ui/components/empty";
import { ClockFadingIcon } from "lucide-react";
import Link from "next/link";

const EmptyUserSessions = () => {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ClockFadingIcon />
        </EmptyMedia>
        <EmptyTitle>No Sessions created yet</EmptyTitle>
        <EmptyDescription>
          Click the button below to start your first session
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild size="sm" variant="outline">
          <Link href={ROUTES.automate}>Create Session</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export const UserSessions = () => {
  const { data: sessions } = useGetSessions();

  if (!sessions) {
    return <ErrorAlert />;
  }

  if (sessions.length <= 0) {
    return <EmptyUserSessions />;
  }

  return (
    <div>
      <pre>{JSON.stringify(sessions, null, 2)}</pre>
    </div>
  );
};
