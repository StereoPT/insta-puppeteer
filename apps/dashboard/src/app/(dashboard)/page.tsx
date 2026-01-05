import { DashboardAnalytics } from "@/actions/dashboardAnalytics";
import { DashboardCards } from "@/components/dashboard/DashboardCards";
import { PageHeader } from "@/components/PageHeader";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const HomePage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: KEYS.dashboard,
    queryFn: DashboardAnalytics,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <PageHeader
          description="This is your Instagram report"
          title="Welcome, Guido"
        />
        <div className="h-full py-6">
          <DashboardCards />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default HomePage;
