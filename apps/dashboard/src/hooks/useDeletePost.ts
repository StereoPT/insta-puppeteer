import { DeletePost } from "@/actions/deletePost";
import { getQueryClient } from "@/lib/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeletePost = (id: string, postId: string) => {
  const queryClient = getQueryClient();
  const toastId = `delete-post-${id}`;

  return useMutation({
    mutationFn: () => {
      toast.success("Deleting post...", { id: toastId });
      return DeletePost(id, postId);
    },
    onSuccess: () => {
      toast.success("Post deleted", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Failed to delete post", { id: toastId });
    },
  });
};
