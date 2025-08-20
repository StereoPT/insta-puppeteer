"use server";

// import { InstagramAutomator } from "@insta-puppeteer/automator";

type AutomateArgs = { email: string; password: string };

export const Automate = async ({ email, password }: AutomateArgs) => {
  console.log({ email, password });
  // const config = {
  //   profileName: "Something Here",
  //   email,
  //   password,
  //   userAgent:
  //     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
  //   headless: false,
  //   viewport: { width: 1280, height: 860 },
  // };

  // const automator = new InstagramAutomator(config);
  // await automator.initialize();

  // await automator.login();

  // const posts = await automator.processHashtag("lifestyle", 10);
  // console.log(`Processed ${posts.length} posts`);

  return true;
};
