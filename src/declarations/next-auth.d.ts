import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    jwt?: string; // Добавляем jwt в Session
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    jwt?: string; // Добавляем jwt в JWT
    id: string;
  }

  interface User {
    jwt: string;
  }
}
