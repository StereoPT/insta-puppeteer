import type { PostData, ScrapedPost } from "@/types";
import { delay } from "@/utils/delay";
import type { Page } from "puppeteer";

export class PostService {
  constructor(private page: Page) {}

  async navigateToHashtag(hashtag: string): Promise<void> {
    const tagsPage = `https://www.instagram.com/explore/search/keyword/?q=%23${hashtag}`;
    console.log(` - Navigating to hashtag: #${hashtag}`);

    await this.page.goto(tagsPage);
    await delay(5000);
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
    await delay(5000);
  }

  async likePost(): Promise<void> {
    try {
      await this.page.click('div[role="button"] svg[aria-label="Like"]', {
        count: 2,
      });
      await delay(5000);
    } catch (error) {
      console.warn("Could not like post:", error);
    }
  }

  async scrapePostData(
    hashtag: string,
    postLink: string,
  ): Promise<ScrapedPost> {
    const username = await this.page.$eval(
      "header div:nth-child(2) div a",
      (el) => el.textContent || "",
    );

    const imageLink = await this.page.$eval(
      "article img",
      (img) => img.getAttribute("src") || "",
    );

    return {
      postLink,
      date: new Date(),
      hashtag,
      username,
      imageLink,
    };
  }

  async closePost() {
    await this.page.keyboard.press("Escape");
    await delay(5000);
  }
}
