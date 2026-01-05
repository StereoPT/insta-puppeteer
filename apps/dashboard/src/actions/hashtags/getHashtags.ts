"use server";

import { prisma } from "@insta-puppeteer/database";

export const GetHashtags = async () => {
  const hashtags = await prisma.hashtag.findMany();

  return hashtags;
};
