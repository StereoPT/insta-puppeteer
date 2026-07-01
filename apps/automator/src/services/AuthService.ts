import { delay } from "@insta-puppeteer/automator/services/DelayService";
import type { Page } from "puppeteer";

export class AuthService {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    const loginPage = "https://www.instagram.com/accounts/login";
    console.log(` - Navigating to: ${loginPage}`);

    await this.page.goto(loginPage, { waitUntil: "networkidle0" });
    await delay.wait("navigate");

    try {
      await this.page.waitForSelector("::-p-text(Allow all cookies)", {
        timeout: 5000,
      });
      await this.page.click("::-p-text(Allow all cookies)");
      await delay.wait("click");
    } catch {
      // Cookie dialog didn't appear, continue
    }

    if (this.page.url().includes("login")) {
      console.log(" - Login User");

      // Type Username
      await this.page.click("[name=email]");
      await this.page.keyboard.type(email, { delay: 100 });
      await delay.wait("type");

      // Type Password
      await this.page.click("[name=pass]");
      await this.page.keyboard.type(password, { delay: 100 });
      await delay.wait("type");

      // Login
      await this.page.click('[aria-label="Log In"][role="button"]');
      await delay.wait("click");
    } else {
      console.log(" - User Already Logged In");
    }
  }
}
