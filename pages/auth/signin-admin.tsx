// pages/auth/signin-admin.js
import { signIn } from "next-auth/react";

export default function SignInAdmin() {
    return (
        <div>
            <h1>Admin Sign in</h1>
            <button onClick={() => signIn("github")}>Sign in to Admin Dashboard</button>
        </div>
    );
}
