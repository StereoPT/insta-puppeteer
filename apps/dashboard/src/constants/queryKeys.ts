const SESSIONS = "sessions";
const POSTS = "posts";

export const KEYS = {
  dashboard: ["dashboard"],

  sessions: [SESSIONS],
  session: (id: string) => [SESSIONS, id],

  posts: [POSTS],

  hashtags: ["hashtags"],
};
