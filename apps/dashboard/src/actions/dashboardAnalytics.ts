"use server";

import { prisma } from "@insta-puppeteer/database";

export const DashboardAnalytics = async () => {
  const sessions = await prisma.session.count();
  const posts = await prisma.post.count();
  const hashtags = await prisma.hashtag.count();

  return { sessions, posts, hashtags };
};
