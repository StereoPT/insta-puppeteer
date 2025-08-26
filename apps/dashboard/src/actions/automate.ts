"use server";

import { InstagramAutomator } from "@insta-puppeteer/automator";
import { prisma } from "@insta-puppeteer/database";

export type AutomateArgs = { email: string; password: string; hashtag: string };
export type ExecuteAutomationArgs = AutomateArgs & { sessionId: string };

const ExecuteAutomation = async ({
  email,
  password,
  hashtag,
  sessionId,
}: ExecuteAutomationArgs) => {
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

  try {
    await automator.initialize();

    await automator.login();

    await automator.processHashtag(hashtag, sessionId, 8);
    await prisma.session.update({
      where: { id: sessionId },
      data: { status: "COMPLETED" },
    });
  } catch (error) {
    console.error("Automation error:", error);
  } finally {
    await automator.close();
  }
};

export const Automate = async ({ email, password, hashtag }: AutomateArgs) => {
  const session = await prisma.session.create({
    data: { status: "IN_PROGRESS", hashtag },
  });

  ExecuteAutomation({ email, password, hashtag, sessionId: session.id });

  return session.id;
};
