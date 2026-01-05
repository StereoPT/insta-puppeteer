"use server";

import { prisma } from "@insta-puppeteer/database";

export const DeleteHashtag = async (id: string) => {
  const result = await prisma.hashtag.delete({ where: { id } });
  if (!result) {
    throw new Error("Failed to Delete Hashtag");
  }
};
