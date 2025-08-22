"use server";

import { InstagramAutomator } from "@insta-puppeteer/automator";

export type AutomateArgs = { email: string; password: string; hashtag: string };

export const Automate = async ({ email, password, hashtag }: AutomateArgs) => {
  const config = {
    profileName: "stereopt",
    email,
    password,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
    headless: true,
    viewport: { width: 1280, height: 860 },
  };

  const automator = new InstagramAutomator(config);
  await automator.initialize();

  await automator.login();

  const posts = await automator.processHashtag(hashtag, 3);
  console.log(`Processed ${posts.length} posts`);

  await automator.close();

  return true;
};
