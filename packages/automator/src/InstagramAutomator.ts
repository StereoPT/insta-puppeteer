import { AuthService } from "@/services/AuthService";
import { BrowserService } from "@/services/BrowserService";
import { DatabaseService } from "@/services/DatabaseService";
import { PostService } from "@/services/PostService";
import type { InstagramConfig, ScrapedPost } from "@/types";

export class InstagramAutomator {
  private browserService: BrowserService;
  private databaseService: DatabaseService;
  private authService: AuthService | null = null;
  private postService: PostService | null = null;

  constructor(private config: InstagramConfig) {
    this.browserService = new BrowserService(config);
    this.databaseService = new DatabaseService();
  }

  async initialize() {
    await this.browserService.launch();
    const page = this.browserService.getPage();

    this.authService = new AuthService(page);
    this.postService = new PostService(page);
  }

  async login() {
    if (!this.authService) {
      throw new Error("Automator not initialized. Call initialize() first.");
    }

    await this.authService.login(this.config.email, this.config.password);
  }

  async processHashtag(hashtag: string, maxPosts?: number) {
    if (!this.postService) {
      throw new Error("Automator not initialized. Call initialize() first.");
    }

    console.log(` - Processing hashtag: #${hashtag}`);

    await this.postService.navigateToHashtag(hashtag);
    const postLinks = await this.postService.getPostLinks();

    const processedPosts: ScrapedPost[] = [];
    const postsToProcess = maxPosts ? postLinks.slice(0, maxPosts) : postLinks;

    for (const postLink of postsToProcess) {
      if (!postLink.postId) continue;

      try {
        await this.postService.openPost(postLink.postId);

        const alreadyLiked = await this.postService.alreadyLiked();
        if (alreadyLiked) {
          await this.postService.closePost();
          continue;
        }

        await this.postService.likePost();

        const scrapedData = await this.postService.scrapePostData(
          hashtag,
          postLink.href,
        );
        await this.databaseService.savePost(scrapedData);

        processedPosts.push(scrapedData);
        console.log(` - Processed post by: ${scrapedData.username}`);

        await this.postService.closePost();
      } catch (error) {
        console.error(`Error processing post ${postLink.postId}:`, error);
        await this.postService.closePost();
      }
    }

    return processedPosts;
  }

  async close() {
    await this.browserService.close();
  }
}
