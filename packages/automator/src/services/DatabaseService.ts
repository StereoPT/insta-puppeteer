import type { ScrapedPost } from "@/types";
import { prisma } from "@insta-puppeteer/database";

export class DatabaseService {
  async savePost(postData: ScrapedPost) {
    await prisma.post.create({
      data: postData,
    });
  }
}
