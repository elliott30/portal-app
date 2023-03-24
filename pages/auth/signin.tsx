import { getProviders, signIn, getCsrfToken, useSession } from "next-auth/react"
// import styles from '../../styles/Auth.module.scss'
import { InferGetServerSidePropsType } from 'next'
// import { FaGithub, FaTwitter, FaGoogle } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CtxOrReq } from "next-auth/client/_utils";
import Layout from "../../components/layouts";



const SignIn = ({ providers, csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { data: session } = useSession()
    const router = useRouter()
    console.log(providers);

    /*
    useEffect(() => {
        if (session) {
            router.push('/')
        }
    }, [session])
    */
    return (
        <>
            <section className="hero is-primary">
                <div className="hero-body">
                    <p className="title">Sign in to continue</p>
                    <p className="subtitle">
                        Use your demo HubSpot account only.
                    </p>
                </div>
            </section><>
                <section className="section content">
                    <h1>SignIn to Continue</h1>

                    <div className="">

                        {providers ? (Object.values(providers).map((provider, i) => {
                            if (provider.id !== 'email') {
                                return (
                                    <div key={provider.name} className="">
                                        <a
                                            href={`/api/auth/signin`}
                                            className="button is-primary"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                signIn("hubspot");
                                            }}
                                        >
                                            Login with HubSpot
                                        </a>
                                    </div>
                                );
                            }
                        }
                        )) : ('')}



                    </div>

                </section>

            </>
        </>

    )
}


export const getServerSideProps = async (context: CtxOrReq | undefined) => {
    const providers = await getProviders()
    const csrfToken = await getCsrfToken(context)
    return {
        props: { providers, csrfToken },
    }
}

export default SignIn