import { z } from "zod";

export const addHashtagSchema = z.object({
  tag: z.string().trim().nonempty(),
  active: z.boolean(),
  priority: z.number().int().nonnegative().min(1).max(5),
});

export type addHashtagSchemaType = z.infer<typeof addHashtagSchema>;
