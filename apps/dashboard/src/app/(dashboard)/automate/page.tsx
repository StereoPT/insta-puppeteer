import { GetHashtags } from "@/actions/hashtags/getHashtags";
import { Automate } from "@/components/automate/Automate";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const AutomatePage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: KEYS.hashtags,
    queryFn: () => GetHashtags(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full py-6">
        <Automate />
      </div>
    </HydrationBoundary>
  );
};

export default AutomatePage;
