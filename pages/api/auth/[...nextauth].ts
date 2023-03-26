import NextAuth, { NextAuthOptions } from "next-auth"
import HubspotProvider from "next-auth/providers/hubspot"
import EmailProvider from "next-auth/providers/email";
import { Session, Account, Profile, User } from "next-auth";
import { JWT } from "next-auth/jwt";

import { FirestoreAdapter } from "@next-auth/firebase-adapter"

export const authOptions: NextAuthOptions = {
  debug: true,
  session: {
    strategy: "jwt"
  },
  providers: [
    HubspotProvider({
      clientId: process.env.HUBSPOT_ID!,
      clientSecret: process.env.HUBSPOT_SECRET!,
      authorization: { params: { scope: "oauth crm.lists.read crm.objects.contacts.read" } },
    }),
    /*
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: parseInt(process.env.EMAIL_SERVER_PORT!, 10),
        auth: {
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.EMAIL_SERVER_PASSWORD!,
        },
      },
      from: process.env.EMAIL_FROM!,
    }),
    */
  ],  
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: { token: JWT; user?: User; account?: Account | null; profile?: Profile; isNewUser?: boolean }) {
      if (user) {
        // If the user logs in via Hubspot, assign the "admin" role
        if (account?.provider === "hubspot") {
          token.role = "admin";
        }
        // If the user logs in via Email, assign the "user" role
        else if (account?.provider === "email") {
          token.role = "user";
        }
      }
      return token;
    },
  
    async session({ session, user, token }: { session: Session; user: User; token: JWT }) {
      // Add the role to the session object
      session.role = token.role;
      return session;
    },
  
    async signIn({ user, account, profile, email, credentials }:
      { user: User | User; account: Account | null; profile?: Profile; email?: { verificationRequest?: boolean }; credentials?: Record<string, unknown>; }) {
      if (account?.provider === "hubspot") {
        // Check if the email domain is allowed
        // You can replace this with your own condition, e.g., user.email === 'allowed@example.com'
        if (user.email && user.email.endsWith('@hubspot.com')) {
          return true;
        }
      } else if (account?.provider === "email") {
        // Allow all users who sign in with email
        return true;
      }
  
      // If the conditions above are not met, disallow the sign-in
      return false;
    },
  },
  
  pages: {
    signIn: "/auth/signin",
  }
  
}

export default NextAuth(authOptions);