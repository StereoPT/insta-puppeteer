"use server";

import { prisma } from "@insta-puppeteer/database";

type ToggleHashtagArgs = {
  id: string;
  active: boolean;
};

export const ToggleHashtag = async ({ id, active }: ToggleHashtagArgs) => {
  return await prisma.hashtag.update({
    where: { id },
    data: {
      active,
    },
  });
};
