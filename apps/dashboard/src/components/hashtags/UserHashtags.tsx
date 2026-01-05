"use client";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@insta-puppeteer/ui/components/empty";

import { DataTable } from "@/components/dataTable/DataTable";
import { ErrorAlert } from "@/components/ErrorAlert";
import { AddHashtagDialog } from "@/components/hashtags/AddHashtagDialog";
import { columns } from "@/components/hashtags/columns";
import { useGetHashtags } from "@/hooks/hashtags/useGetHashtags";
import { fuzzyFilterFn } from "@/lib/dataTable";
import { HashIcon } from "lucide-react";

const EmptyUserHashtags = () => {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HashIcon />
        </EmptyMedia>
        <EmptyTitle>No Hashtags created yet</EmptyTitle>
        <EmptyDescription>
          Click the button below to create your first hashtag
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <AddHashtagDialog />
      </EmptyContent>
    </Empty>
  );
};

export const UserHashtags = () => {
  const { data: hashtags } = useGetHashtags();

  if (!hashtags) {
    return <ErrorAlert />;
  }

  if (hashtags.length <= 0) {
    return <EmptyUserHashtags />;
  }

  return (
    <DataTable
      columns={columns}
      config={{
        filters: {
          search: {
            filterFn: fuzzyFilterFn(["tag"]),
            placeholder: "Search hashtag...",
          },
        },
      }}
      data={hashtags}
    />
  );
};
