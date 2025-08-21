import type { InstagramConfig } from "@insta-puppeteer/automator/types";
import path from "node:path";
import type { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer";

export class BrowserService {
  private browser: Browser | null = null;
  private page: Page | null = null;

  private _width = 1280;
  private _height = 860;

  constructor(private config: InstagramConfig) {}

  async launch() {
    const userDataDir = path.join(
      process.cwd(),
      "profiles",
      this.config.profileName,
    );

    this.browser = await puppeteer.launch({
      headless: this.config.headless ?? false,
      userDataDir,
      defaultViewport: this.config.viewport ?? {
        width: this._width,
        height: this._height,
      },
      args: [
        "--no-first-run",
        "--no-default-browser-check",
        `--window-size=${this.config.viewport?.width ?? this._width},${this.config.viewport?.height ?? this._height}`,
      ],
    });

    this.page = await this.browser.newPage();

    if (this.config.userAgent) {
      await this.page.setUserAgent(this.config.userAgent);
    }
  }

  getPage() {
    if (!this.page) {
      throw new Error("Browser not launched. Call launch() first.");
    }
    return this.page;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }
}
