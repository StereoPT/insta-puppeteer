import { Automate } from "@/actions/automate";
import type { LoginSchemaType } from "@/schemas/login";
import { useMutation } from "@tanstack/react-query";

export const useAutomate = () => {
  return useMutation({
    mutationFn: (data: LoginSchemaType) => {
      return Automate(data);
    },
  });
};
