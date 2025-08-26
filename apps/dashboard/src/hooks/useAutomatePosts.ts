import { GetAutomatePosts } from "@/actions/getAutomatePosts";
import { useQuery } from "@tanstack/react-query";

export const useAutomatePosts = (sessionId: string) => {
  return useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => GetAutomatePosts(sessionId),
    refetchInterval: (q) =>
      q.state.data?.status === "IN_PROGRESS" ? 1000 : false,
  });
};
