import { InstagramAutomator } from "@insta-puppeteer/automator/InstagramAutomator";
import { prisma } from "@insta-puppeteer/database";
import "dotenv/config";

const config = {
  profileName: "stereopt",
  email: process.env.EMAIL ?? "",
  password: process.env.PASSWORD ?? "",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
  headless: false,
  viewport: { width: 1280, height: 860 },
};

const main = async () => {
  const session = await prisma.session.create({
    data: { status: "IN_PROGRESS" },
  });

  const automator = new InstagramAutomator(config);

  try {
    await automator.initialize();

    await automator.login();

    await automator.processForYou(session.id, 8);

    await prisma.session.update({
      where: { id: session.id },
      data: { status: "COMPLETED" },
    });
  } catch (error) {
    console.error("Automation error:", error);
    await prisma.session.update({
      where: { id: session.id },
      data: { status: "FAILED" },
    });
  } finally {
    await automator.close();
  }
};

main();
