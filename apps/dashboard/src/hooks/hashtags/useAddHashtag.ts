import { AddHastag } from "@/actions/hashtags/addHashtag";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import type { addHashtagSchemaType } from "@/schemas/hashtags";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddHashtag = () => {
  const queryClient = getQueryClient();
  const toastId = "add-hashtag";

  return useMutation({
    mutationFn: (data: addHashtagSchemaType) => {
      toast.loading("Creating hashtag...", { id: toastId });
      return AddHastag(data);
    },
    onSuccess: () => {
      toast.success("Hashtag added", { id: toastId });
      queryClient.invalidateQueries({ queryKey: KEYS.hashtags });
    },
    onError: () => {
      toast.error("Failed to add hastag", { id: toastId });
    },
  });
};
