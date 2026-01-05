import { GetSessions } from "@/actions/sessions/getSessions";
import { KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetSessions = () => {
  return useQuery({
    queryKey: KEYS.sessions,
    queryFn: () => GetSessions(),
  });
};
