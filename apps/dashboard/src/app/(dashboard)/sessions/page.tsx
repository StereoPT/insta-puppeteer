import { GetSessions } from "@/actions/sessions/getSessions";
import { PageHeader } from "@/components/PageHeader";
import { UserSessions } from "@/components/sessions/UserSessions";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const SessionsPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: KEYS.sessions,
    queryFn: () => GetSessions(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <PageHeader description="List of your sessions" title="Sessions" />
        <div className="h-full py-6">
          <UserSessions />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default SessionsPage;
