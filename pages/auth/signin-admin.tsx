import { signIn } from "next-auth/react";

export default function SignInAdmin() {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4">
                            <h1 className="title">Welcome to MyApp</h1>
                            <p>Please sign in to access the Admin Dashboard.</p>
                        </div>
                        <div className="column is-4">
                            <div className="box has-background-white is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered has-text-dark">
                                <h2 className="title is-4 mb-5">Sign In</h2>
                                <button
                                    className="button is-primary is-fullwidth"
                                    onClick={() => signIn("hubspot")}
                                >
                                    Sign in with HubSpot
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
