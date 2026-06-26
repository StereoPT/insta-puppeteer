"use server";

import { prisma } from "@insta-puppeteer/database/server";

export const GetAutomatePosts = async (sessionId: string) => {
  return await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      posts: true,
    },
  });
};
