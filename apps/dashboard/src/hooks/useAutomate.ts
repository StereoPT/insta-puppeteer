import { Automate, type AutomateArgs } from "@/actions/automate";
import { useMutation } from "@tanstack/react-query";

export const useAutomate = () => {
  return useMutation({
    mutationFn: (data: AutomateArgs) => {
      return Automate(data);
    },
  });
};
