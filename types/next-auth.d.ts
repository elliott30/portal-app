import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        sessionAccessToken: string
    }

    interface Account {
        access_token: string
    }

    interface Profile {
        hub_id: string
    }
    interface User {
        hub_id: string
    }
}

declare module "next-auth/jwt" {

    interface JWT {

        accessToken: string

    }
}