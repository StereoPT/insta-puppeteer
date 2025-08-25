"use server";

import { prisma } from "@insta-puppeteer/database";

export const GetAutomatePosts = async (sessionId: string) => {
  return await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      posts: true,
    },
  });
};
