import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from 'next/image'
// import styles from "./header.module.css"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <header>

      <nav className="navbar is-light is-spaced	" role="navigation" aria-label="main navigation">
        <a role="button" className="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
        <div className="navbar-menu">
          <div className="navbar-brand">

            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className="navbar-start">
            <Link href="/" className="navbar-item">
              Home
            </Link>
            <Link href="/create-page" className="navbar-item">
              Create portal
            </Link>
            <Link href="/dashboard" className="navbar-item">
              Manage Portal
            </Link>


          </div>


          <div className="navbar-end">


            {!session && (

              <><div className="navbar-item">
                <span>
                  You are not signed in
                </span>
              </div><div className="navbar-item">
                  <a
                    href={`/api/auth/signin`}
                    className="button is-primary"
                    onClick={(e) => {
                      e.preventDefault()
                      signIn("hubspot")
                    }}
                  >
                    Login with HubSpot
                  </a>
                </div></>
            )}

            {session?.user && (

              <><div className="navbar-item">

                <span>
                  <small>Signed in as</small>
                  <br />
                  <strong>{session.user.email ?? session.user.name}</strong>
                </span>

              </div><div className="navbar-item">

                  <a
                    href={`/api/auth/signin`}
                    className="button is-primary"
                    onClick={(e) => {
                      e.preventDefault()
                      signOut()
                    }}
                  >
                    Sign out
                  </a>

                </div></>

            )}

          </div>




        </div>
      </nav>







    </header>
  );
}
