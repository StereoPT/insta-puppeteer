"use server";

import { prisma } from "@insta-puppeteer/database";

export const DeleteSession = async (id: string) => {
  const result = await prisma.session.delete({ where: { id } });
  if (!result) {
    throw new Error("Failed to Delete Session");
  }
};
