// pages/_app.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import '../css/mystyles.css';

type MyAppProps = AppProps & {
  Component: NextPage;
};

function MyApp({ Component, pageProps }: MyAppProps) {
  const router = useRouter();

  useEffect(() => {
    const isSignInPage = router.pathname.startsWith("/auth/signin");
    const subdomain = window.location.hostname.split(".")[0];

    if (isSignInPage && subdomain !== "www" && subdomain !== "accountid") {
      router.replace("/auth/signin-client");
    }
  }, [router]);

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
