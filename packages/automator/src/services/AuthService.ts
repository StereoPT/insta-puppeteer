import { delay } from "@/utils/delay";
import type { Page } from "puppeteer";

export class AuthService {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    const loginPage = "https://www.instagram.com/accounts/login";
    console.log(` - Navigating to: ${loginPage}`);

    await this.page.goto(loginPage);
    await delay(5000);

    if (this.page.url().includes("login")) {
      console.log(" - Login User");

      // Type Username
      await this.page.click("[name=username]");
      await this.page.keyboard.type(email, { delay: 100 });
      await delay(5000);

      // Type Password
      await this.page.click("[name=password]");
      await this.page.keyboard.type(password, { delay: 100 });
      await delay(5000);

      // Login
      await this.page.click("[type=submit]");
      await delay(5000);

      return true;
    } else {
      console.log(" - User Already Logged In");
      return false;
    }
  }
}
