export const ROUTES = {
  home: "/",
  automate: "/automate",
  session: (id: string) => `/sessions/${id}` as const,
  sessions: "/sessions",
  posts: "/posts",
  hashtags: "/hashtags",
} as const;
