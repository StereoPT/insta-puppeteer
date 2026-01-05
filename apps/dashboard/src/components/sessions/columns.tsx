"use client";

import { SessionActions } from "@/components/sessions/SessionActions";
import { ROUTES } from "@/constants/routes";
import type { Prisma } from "@insta-puppeteer/database";
import { Badge } from "@insta-puppeteer/ui/components/badge";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

type SessionWithCount = Prisma.SessionGetPayload<{
  include: {
    _count: {
      select: {
        posts: true;
      };
    };
  };
}>;

export const columns: ColumnDef<SessionWithCount>[] = [
  {
    accessorKey: "hashtag",
    header: "Hashtag",
    size: 320,
    cell: ({ row }) => {
      const { id, hashtag, createdAt } = row.original;

      return (
        <Link href={ROUTES.session(id)}>
          <div className="flex flex-col">
            <div className="font-medium capitalize">{hashtag}</div>
            <div className="text-xs text-muted-foreground">
              {format(createdAt, "PPP")}
            </div>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 150,
    cell: ({ row }) => {
      const { status } = row.original;

      return <Badge variant="outline">{status}</Badge>;
    },
  },
  {
    accessorKey: "_count.posts",
    header: "Posts",
    size: 100,
    cell: ({ row }) => {
      const { posts } = row.original._count;

      return <Badge variant="outline">{posts}</Badge>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    size: 50,
    cell: ({ row }) => {
      const session = row.original;

      return <SessionActions session={session} />;
    },
  },
];
