import { useEffect } from "react";
// import type { NextPage } from 'next';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
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
