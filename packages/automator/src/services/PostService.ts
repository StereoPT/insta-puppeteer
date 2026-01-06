import { delay } from "@insta-puppeteer/automator/services/DelayService";
import type { PostData, ScrapedPost } from "@insta-puppeteer/automator/types";
import { writeFileSync } from "node:fs";
import type { Browser, Page } from "puppeteer";

export class PostService {
  constructor(
    private browser: Browser,
    private page: Page,
  ) {}

  async navigateToHashtag(hashtag: string): Promise<void> {
    const tagsPage = `https://www.instagram.com/explore/search/keyword/?q=%23${hashtag}`;
    console.log(` - Navigating to hashtag: #${hashtag}`);

    await this.page.goto(tagsPage, { waitUntil: "networkidle0" });
    await delay.wait("navigate");
  }

  async navigateToForYou(): Promise<void> {
    const forYouPage = "https://www.instagram.com/explore/";
    console.log(" - Navigating to For You Page");

    await this.page.goto(forYouPage, { waitUntil: "networkidle0" });
    await delay.wait("navigate");
  }

  async getPostLinks(): Promise<PostData[]> {
    const postLinks = await this.page.$$eval("main div a", (links) =>
      links.map((link) => ({
        href: link.href,
        postId: link.href.match(/\/p\/([^/?]+)/)?.[1] || null,
      })),
    );

    console.log(` - Found ${postLinks.length} Posts`);
    return postLinks;
  }

  async openPost(postId: string) {
    await this.page.click(`a[href*="${postId}"]`);
    await delay.quick();
  }

  async alreadyLiked() {
    try {
      return await this.page.$eval(
        'div[role="button"] svg[aria-label="Unlike"]',
        (el) => !!el,
      );
    } catch {
      return false;
    }
  }

  async likePost() {
    try {
      await this.page.click('div[role="button"] svg[aria-label="Like"]', {
        count: 2,
      });
      await delay.wait("like");
    } catch (error) {
      console.warn("Could not like post:", error);
    }
  }

  async scrapePostData(
    sessionId: string,
    postData: PostData,
  ): Promise<ScrapedPost> {
    const username = await this.page.$eval(
      "header div:nth-child(2) div a",
      (el) => el.textContent || "",
    );

    const imageLink = await this.page.$eval(
      "article img",
      (img) => img.getAttribute("src") || "",
    );

    const imagePage = await this.browser.newPage();
    const viewSource = await imagePage.goto(imageLink);
    await delay.wait("navigate");

    if (viewSource) {
      writeFileSync(
        `public/images/${postData.postId}.png`,
        await viewSource.buffer(),
      );
    }

    await imagePage.close();

    return {
      sessionId,
      postLink: postData.href,
      postId: postData.postId ?? "",
      date: new Date(),
      username,
    };
  }

  async closePost() {
    await this.page.keyboard.press("Escape");
    await delay.quick();
  }
}
