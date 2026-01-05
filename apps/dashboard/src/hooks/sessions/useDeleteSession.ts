import { DeleteSession } from "@/actions/sessions/deleteSession";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteSession = (id: string) => {
  const queryClient = getQueryClient();
  const toastID = `delete-session-${id}`;

  return useMutation({
    mutationFn: () => {
      toast.loading("Deleting session...", { id: toastID });
      return DeleteSession(id);
    },
    onSuccess: () => {
      toast.success("Session deleted", { id: toastID });
      queryClient.invalidateQueries({ queryKey: KEYS.sessions });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Failed to delete session", { id: toastID });
    },
  });
};
