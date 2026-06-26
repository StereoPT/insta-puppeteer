"use server";

import { prisma } from "@insta-puppeteer/database/server";

export const GetHashtags = async () => {
  const hashtags = await prisma.hashtag.findMany();

  return hashtags;
};
