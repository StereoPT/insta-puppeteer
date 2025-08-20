import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      password: string;
    } & DefaultSession["user"];
  }

  interface User {
    password: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    password: string;
  }
}
