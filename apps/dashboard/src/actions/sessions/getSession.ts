"use server";

import { prisma } from "@insta-puppeteer/database";

export const GetSession = async (id: string) => {
  const session = await prisma.session.findUnique({
    where: { id },
    include: { posts: { orderBy: { date: "asc" } } },
  });

  return session;
};
