import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import serverInstance from "./serverInstance";
import { ROUTES } from "@/config/routes";

declare module "next-auth" {
  interface User {
    jwt: string;
    clientRole: string;
    maxPolls: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    clientRole: string;
    maxPolls: number;
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
              clientRole: user.clientRole,
              maxPolls: user.maxPolls,
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
        token.jwt = user.jwt;
        token.name = user.name ?? "";
        token.email = user.email ?? "";
        token.clientRole = user.clientRole;
        token.maxPolls = user.maxPolls;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          clientRole: token.clientRole,
          maxPolls: token.maxPolls,
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
