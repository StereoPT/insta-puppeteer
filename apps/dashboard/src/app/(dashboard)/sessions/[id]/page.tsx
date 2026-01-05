import { GetSession } from "@/actions/sessions/getSession";
import { PageHeader } from "@/components/PageHeader";
import { UserSessionDetails } from "@/components/sessions/UserSessionDetails";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type SessionDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const SessionDetailsPage = async ({ params }: SessionDetailsPageProps) => {
  const { id } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: KEYS.session(id),
    queryFn: () => GetSession(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <PageHeader goBack title="Session Details" />
        <div className="h-full py-6">
          <UserSessionDetails sessionId={id} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default SessionDetailsPage;
