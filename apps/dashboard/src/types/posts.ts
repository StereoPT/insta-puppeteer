import type { Prisma } from "@insta-puppeteer/database";

export type PostWithSession = Prisma.PostGetPayload<{
  include: { session: { select: { hashtag: true } } };
}>;
