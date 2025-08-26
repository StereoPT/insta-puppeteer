"use server";

import { prisma } from "@insta-puppeteer/database";
import { rmSync } from "node:fs";
import path from "node:path";

export const DeletePost = async (id: string, postId: string) => {
  const deletedPost = await prisma.post.delete({ where: { id } });

  if (deletedPost) {
    rmSync(path.join("public", "images", `${postId}.png`));
  }
};
