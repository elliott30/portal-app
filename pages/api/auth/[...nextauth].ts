import NextAuth, { NextAuthOptions } from "next-auth"
import HubspotProvider from "next-auth/providers/hubspot"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"

export const authOptions: NextAuthOptions = {
  debug: true,
  session: {
    strategy: "jwt"
  },
  adapter: FirestoreAdapter({
    apiKey: process.env.FIREBASE_API_KEY,
    appId: process.env.FIREBASE_APP_ID,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  }),
  providers: [
    HubspotProvider({
      clientId: process.env.HUBSPOT_CLIENT_ID!,
      clientSecret: process.env.HUBSPOT_CLIENT_SECRET!,
      authorization: { params: { scope: "oauth content crm.objects.contacts.read" } },
      
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      // if (user && user.email && user.email.endsWith('@hubspot.com')) {
        //if (user && user.email && user.email === 'echapman@hubspot.com') {
        if (user) {

        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    }
  },
  pages: {
    signIn: "/auth/signin-admin",
  },
}

export default NextAuth(authOptions);