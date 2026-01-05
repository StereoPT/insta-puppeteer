"use server";

import {
  addHashtagSchema,
  type addHashtagSchemaType,
} from "@/schemas/hashtags";
import { prisma } from "@insta-puppeteer/database";

export const AddHastag = async (formValues: addHashtagSchemaType) => {
  const { success, data } = await addHashtagSchema.safeParseAsync(formValues);
  if (!success) {
    throw new Error("Invalid Form Data");
  }

  const result = await prisma.hashtag.create({ data });
  if (!result) {
    throw new Error("Failed to Add Hashtag");
  }
};
