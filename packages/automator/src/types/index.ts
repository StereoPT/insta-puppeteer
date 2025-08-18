export type InstagramConfig = {
  profileName: string;
  email: string;
  password: string;
  userAgent?: string;
  headless?: boolean;
  viewport?: { width: number; height: number };
};

export type ScrapedPost = {
  postLink: string;
  date: Date;
  hashtag: string;
  username: string;
  imageLink: string;
};

export interface PostData {
  href: string;
  postId: string | null;
}
