"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { ErrorAlert } from "@/components/ErrorAlert";
import { useDashboardAnalytics } from "@/hooks/useDashboardAnalytics";
import { ClockFadingIcon, HashIcon, ImagesIcon } from "lucide-react";

export const DashboardCards = () => {
  const { data: dashboardAnalytics } = useDashboardAnalytics();

  if (!dashboardAnalytics) {
    return <ErrorAlert />;
  }

  return (
    <div className="grid grid-cols-6 gap-4 w-full">
      <StatCard
        amount={dashboardAnalytics.sessions}
        icon={ClockFadingIcon}
        title="Sessions"
      />
      <StatCard
        amount={dashboardAnalytics.posts}
        icon={ImagesIcon}
        title="Posts"
      />
      <StatCard
        amount={dashboardAnalytics.hashtags}
        icon={HashIcon}
        title="Hashtags"
      />
    </div>
  );
};
