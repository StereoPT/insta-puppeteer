import { GetHashtags } from "@/actions/hashtags/getHashtags";
import { KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetHashtags = () => {
  return useQuery({
    queryKey: KEYS.hashtags,
    queryFn: () => GetHashtags(),
  });
};
