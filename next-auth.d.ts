import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    /** The user's role. */
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    role?: string;
  }
}
