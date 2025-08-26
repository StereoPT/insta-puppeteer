import { DeletePost } from "@/actions/deletePost";
import { getQueryClient } from "@/lib/getQueryClient";
import { useMutation } from "@tanstack/react-query";

export const useDeletePost = (id: string, postId: string) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: () => {
      return DeletePost(id, postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
