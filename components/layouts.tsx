import Header from "./header"
import Footer from "./footer"
import { useEffect } from "react";
import type { ReactChildren } from "react"

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export function LayoutFullPage({ children }: Props) {
  //Adds the bulma class for fixed navbar to body of pages with this layout only
  useEffect(() => {
    document.body.classList.add("has-navbar-fixed-bottom");
  });

  return (
    <>
      <main>{children}</main>
    </>
  );
}

export function LayoutIFrame({ children }: Props) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}