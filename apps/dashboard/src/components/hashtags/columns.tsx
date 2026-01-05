import { HashtagActions } from "@/components/hashtags/HashtagActions";
import { ToggleHashtag } from "@/components/hashtags/ToggleHashtag";
import type { Hashtag } from "@insta-puppeteer/database";
import { Badge } from "@insta-puppeteer/ui/components/badge";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Hashtag>[] = [
  {
    accessorKey: "active",
    header: "Active",
    size: 50,
    cell: ({ row }) => {
      const hashtag = row.original;

      return <ToggleHashtag hashtag={hashtag} />;
    },
  },
  {
    accessorKey: "tag",
    header: "Hashtag",
    size: 420,
    cell: ({ row }) => {
      const { tag } = row.original;

      return <div className="capitalize">{tag}</div>;
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    size: 100,
    cell: ({ row }) => {
      const { priority } = row.original;

      return <Badge variant="outline">{priority}</Badge>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    size: 50,
    cell: ({ row }) => {
      const hashtag = row.original;

      return <HashtagActions hashtag={hashtag} />;
    },
  },
];
