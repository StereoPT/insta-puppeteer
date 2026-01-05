import { GetSession } from "@/actions/sessions/getSession";
import { KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetSession = (id: string) => {
  return useQuery({
    queryKey: KEYS.session(id),
    queryFn: () => GetSession(id),
  });
};
