import { DeleteHashtag } from "@/actions/hashtags/deleteHashtag";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteHashtag = (id: string) => {
  const queryClient = getQueryClient();
  const toastID = `delete-hashtag-${id}`;

  return useMutation({
    mutationFn: () => {
      toast.loading("Deleting hashtag...", { id: toastID });
      return DeleteHashtag(id);
    },
    onSuccess: () => {
      toast.success("Hashtag deleted", { id: toastID });
      queryClient.invalidateQueries({ queryKey: KEYS.hashtags });
    },
    onError: () => {
      toast.error("Failed to delete hashtag", { id: toastID });
    },
  });
};
