import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInAdmin() {
    const [isWWWorNoSubdomain, setIsWWWorNoSubdomain] = useState(false);

    useEffect(() => {
        const hostname = window.location.hostname;
        const subdomain = hostname.split('.')[0];

        setIsWWWorNoSubdomain(subdomain === 'www' || subdomain === 'localhost' || subdomain === '');
    }, []);

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
                                    onClick={() =>
                                        signIn(isWWWorNoSubdomain ? 'hubspot' : 'magic-link')
                                    }
                                >
                                    {isWWWorNoSubdomain
                                        ? 'Sign in with HubSpot'
                                        : 'Sign in with Magic Link'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
