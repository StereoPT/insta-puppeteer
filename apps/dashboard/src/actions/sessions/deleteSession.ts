"use server";

import { prisma } from "@insta-puppeteer/database";
import { rmSync } from "node:fs";
import path from "node:path";

export const DeleteSession = async (id: string) => {
  const deletedSession = await prisma.session.delete({
    where: { id },
    include: { posts: true },
  });

  if (!deletedSession) {
    throw new Error("Failed to Delete Session");
  }

  for (const post of deletedSession.posts) {
    rmSync(path.join("public", "images", `${post.postId}.png`));
  }
};
