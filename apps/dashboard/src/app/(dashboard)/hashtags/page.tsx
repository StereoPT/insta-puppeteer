import { GetHashtags } from "@/actions/hashtags/getHashtags";
import { AddHashtagDialog } from "@/components/hashtags/AddHashtagDialog";
import { UserHashtags } from "@/components/hashtags/UserHashtags";
import { PageHeader } from "@/components/PageHeader";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const HashtagsPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: KEYS.hashtags,
    queryFn: () => GetHashtags(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex justify-between">
          <PageHeader description="List of your hashtags" title="Hashtags" />
          <AddHashtagDialog />
        </div>
        <div className="h-full py-6">
          <UserHashtags />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default HashtagsPage;
