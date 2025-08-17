import { delay } from "@/utils/delay.js";
import { prisma } from "@insta-puppeteer/database";
import "dotenv/config";
import path from "node:path";
import puppeteer from "puppeteer";

const profileName = process.env.PROFILE_NAME ?? "no_profile";
const email = process.env.EMAIL ?? "no_email";
const password = process.env.PASSWORD ?? "no_password";

const userDataDir = path.join(process.cwd(), "profiles", profileName);
const hashtag = "travel";
const maxLikes = 9;

console.log("[Automator]");

const main = async () => {
  // Launch Browser
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir,
    args: ["--no-first-run", "--no-default-browser-check"],
  });

  // Create New Page
  const page = await browser.newPage();

  // ***** ***** ***** ***** ***** AUTH ***** ***** ***** ***** ***** //

  // Navigate to Login Page
  const loginPage = "https://www.instagram.com/accounts/login";
  console.log(` - Navigating to: ${loginPage}`);
  await page.goto(loginPage);
  await delay(5000);

  if (page.url().includes("login")) {
    console.log(" - Login User");

    // Type Username
    await page.click("[name=username]");
    await page.keyboard.type(email, { delay: 100 });
    await delay(5000);

    //Type Password
    await page.click("[name=password]");
    await page.keyboard.type(password, { delay: 100 });
    await delay(5000);

    // Login
    await page.click("[type=submit]");
  } else {
    console.log(" - User Already Logged In");
  }

  // ***** ***** ***** ***** ***** POSTS ***** ***** ***** ***** ***** //

  console.log(` - Current Hashtag: #${hashtag}`);

  const tagsPage = `https://www.instagram.com/explore/search/keyword/?q=%23${hashtag}`;
  await page.goto(tagsPage);
  await delay(5000);

  const postLinks = await page.$$eval("main div a", (links) =>
    links.map((link) => ({
      href: link.href,
      postId: link.href.match(/\/p\/([^/?]+)/)?.[1] || null,
    })),
  );

  console.log(` - Found ${postLinks.length} Posts`);

  for (const postLink of postLinks) {
    await page.click(`a[href*="${postLink.postId}"]`);

    await delay(5000);

    // Like Post
    // XXX: count: 2 is not really a good way of doing this.
    await page.click('div[role="button"]:has(svg[aria-label="Like"])', {
      count: 2,
    });
    await delay(5000);

    const username = await page.$eval(
      "header div:nth-child(2) div a",
      (username) => username.textContent,
    );

    const imageLink = await page.$eval(
      "article img",
      (image) => image.getAttribute("src") ?? "",
    );

    // Save to DB
    await prisma.post.create({
      data: {
        postLink: postLink.href,
        date: new Date(),
        hashtag,
        username,
        imageLink: imageLink,
      },
    });

    await page.keyboard.press("Escape");
    await delay(5000);
  }

  await browser.close();
};

main();
