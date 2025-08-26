"use server";

import { prisma } from "@insta-puppeteer/database";

export const GetPosts = async () => {
  return await prisma.post.findMany({
    include: { session: { select: { hashtag: true } } },
    orderBy: { createdAt: "desc" },
  });
};
