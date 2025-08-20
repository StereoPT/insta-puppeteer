import z from "zod";

export const loginSchema = z.object({
  email: z.email().trim(),
  password: z.string().trim(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
