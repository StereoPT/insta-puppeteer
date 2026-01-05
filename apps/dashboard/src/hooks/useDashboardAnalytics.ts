import { DashboardAnalytics } from "@/actions/dashboardAnalytics";
import { KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useDashboardAnalytics = () => {
  return useQuery({
    queryKey: KEYS.dashboard,
    queryFn: DashboardAnalytics,
  });
};
