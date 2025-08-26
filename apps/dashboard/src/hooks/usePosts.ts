import { GetPosts } from "@/actions/getPosts";
import { useQuery } from "@tanstack/react-query";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => GetPosts(),
  });
};
