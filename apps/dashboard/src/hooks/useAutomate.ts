import { Automate, type AutomateArgs } from "@/actions/automate";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAutomate = () => {
  const toastId = "automate";

  return useMutation({
    mutationFn: (data: AutomateArgs) => {
      toast.loading("Automating...", { id: toastId });
      return Automate(data);
    },
    onSuccess: () => {
      toast.success("Automation started", { id: toastId });
    },
    onError: () => {
      toast.error("Failed to start automation", { id: toastId });
    },
  });
};
