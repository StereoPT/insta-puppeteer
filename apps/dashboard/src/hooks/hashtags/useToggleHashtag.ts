import { ToggleHashtag } from "@/actions/hashtags/toggleHashtag";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { useMutation } from "@tanstack/react-query";

export const useToggleHashtag = (hashtagId: string) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (active: boolean) => {
      return ToggleHashtag({ id: hashtagId, active });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.hashtags });
    },
  });
};
