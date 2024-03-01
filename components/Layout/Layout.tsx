import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Link href="/">
        <Button>Home</Button>
      </Link>
      <Link href="/about">
        <Button>About</Button>
      </Link>
      <Link href="/contact">
        <Button>Contact</Button>
      </Link>
      <div>{children}</div>
    </div>
  );
};
