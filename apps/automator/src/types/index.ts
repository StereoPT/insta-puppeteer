export type InstagramConfig = {
  profileName: string;
  email: string;
  password: string;
  userAgent?: string;
  headless?: boolean;
  viewport?: { width: number; height: number };
};

export type ScrapedPost = {
  sessionId: string;
  postLink: string;
  postId: string;
  date: Date;
  username: string;
};

export interface PostData {
  href: string;
  postId: string | null;
}
