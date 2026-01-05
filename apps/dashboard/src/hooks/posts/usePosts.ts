import { GetPosts } from "@/actions/getPosts";
import { KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const usePosts = () => {
  return useQuery({
    queryKey: KEYS.posts,
    queryFn: () => GetPosts(),
  });
};
