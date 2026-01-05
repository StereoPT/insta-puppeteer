const SESSIONS = "sessions";
const POSTS = "posts";

export const KEYS = {
  sessions: [SESSIONS],
  session: (id: string) => [SESSIONS, id],

  posts: [POSTS],
};
