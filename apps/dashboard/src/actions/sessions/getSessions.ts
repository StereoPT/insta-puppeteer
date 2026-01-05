"use server";

import { prisma } from "@insta-puppeteer/database";

export const GetSessions = async () => {
  const sessions = await prisma.session.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });

  return sessions;
};
