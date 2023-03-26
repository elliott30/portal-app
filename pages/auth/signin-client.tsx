// pages/auth/signin-user.js
import { signIn } from "next-auth/react";

export default function SignInUser() {
    return (
        <div>
            <h1>User Sign in</h1>
            <button onClick={() => signIn("email")}>Sign in with Email</button>
        </div>
    );
}
