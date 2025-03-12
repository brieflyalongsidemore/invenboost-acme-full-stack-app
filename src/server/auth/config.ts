import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  CredentialsSignin,
  type DefaultSession,
  type NextAuthConfig,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export class InvalidLoginError extends CredentialsSignin {
  code = "invalid_credentials";
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email Address", type: "email" },
        password: { label: "Password", type: "password" },
      },
      //@ts-expect-error args
      authorize,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],

  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {},
  trustHost: true,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      console.log(user, session);
      if (trigger === "update" && session) {
        token = session;
      }
      if (user) {
        token = { ...user };
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token && session.user) {
        //@ts-expect-error args
        session.user = {
          ...session.user,
          ...token,
        };
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export async function authorize(
  credentials: { email: string; password: string } | undefined,
) {
  if (!credentials) {
    throw new Error("Creds are required");
  }

  const user = await db.user.findFirst({
    where: {
      email: credentials.email.toLowerCase(),
    },
  });

  const isValidPassword = await bcrypt.compare(
    credentials.password,
    //eslint-disable-next-line
    user!.password,
  );
  if (!isValidPassword) throw new InvalidLoginError();

  //  @ts-expect-error fix session type
  const { password, ...userData } = user;

  //Return user object which will be stored in JWT token
  return {
    ...userData,
  };

  //Progresses to SignIn callback. More: https://next-auth.js.org/providers/credentials#example---username--password
}
