import z from "zod";

export const automateSchema = z.object({
  hashtag: z.string().trim().nonempty(),
});

export type AutomateSchemaType = z.infer<typeof automateSchema>;
