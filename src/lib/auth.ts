import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import serverInstance from "./serverInstance";
import { ROUTES } from "@/config/routes";

declare module "next-auth" {
  interface User {
    jwt: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            throw new Error("Empty credentials");
          }

          const response = await serverInstance.post("auth/local", {
            identifier: credentials.email,
            password: credentials.password,
          });

          const user = response.data.user;

          if (user) {
            return {
              id: String(user.id),
              name: user.username,
              email: user.email,
              jwt: response.data.jwt,
            };
          }

          return null;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Auth error:", error);
          throw new Error("Wrong credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.jwt = user.jwt; // ✅ Сохраняем Strapi JWT в token
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
        jwt: token.jwt,
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: ROUTES.signIn,
    error: ROUTES.signIn,
  },
};
