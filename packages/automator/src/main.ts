import { InstagramAutomator } from "@/InstagramAutomator";
import type { InstagramConfig } from "@/types";
import "dotenv/config";

const config: InstagramConfig = {
  profileName: process.env.PROFILE_NAME ?? "no_profile",
  email: process.env.EMAIL ?? "no_email",
  password: process.env.PASSWORD ?? "no_password",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
  headless: false,
  viewport: { width: 1280, height: 860 },
};

const main = async () => {
  const automator = new InstagramAutomator(config);

  try {
    console.log("[Automator]");
    await automator.initialize();
    await automator.login();

    const posts = await automator.processHashtag("lifestyle", 10);
    console.log(`Processed ${posts.length} posts`);
  } catch (error) {
    console.error("Automation error:", error);
  } finally {
    await automator.close();
  }
};

main();
