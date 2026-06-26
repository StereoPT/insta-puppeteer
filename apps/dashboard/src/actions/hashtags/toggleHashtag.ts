"use server";

import { prisma } from "@insta-puppeteer/database/server";

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
