import { delay } from "@/utils/delay.js";
import "dotenv/config";
import path from "node:path";
import puppeteer from "puppeteer";

const profileName = process.env.PROFILE_NAME ?? "no_profile";
const email = process.env.EMAIL ?? "no_email";
const password = process.env.PASSWORD ?? "no_password";

const userDataDir = path.join(process.cwd(), "profiles", profileName);

console.log("[Automator]");

// Launch Browser
const browser = await puppeteer.launch({
  headless: false,
  userDataDir,
  args: ["--no-first-run", "--no-default-browser-check"],
});

// Create New Page
const page = await browser.newPage();

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

await browser.close();
