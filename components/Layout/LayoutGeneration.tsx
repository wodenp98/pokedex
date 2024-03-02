"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

export const LayoutGeneration = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <main>
      {/* <div className={center({ my: "4", display: "flex", gap: "4" })}>
        <Link href="/">
          <Button
            {...(pathname === "/"
              ? { variant: "solid" }
              : { variant: "outline" })}
          >
            1<sup>st</sup>gen.
          </Button>
        </Link>
        <Link href="/secondGen">
          <Button
            {...(pathname === "/secondGen"
              ? { variant: "solid" }
              : { variant: "outline" })}
          >
            2<sup>nd</sup>gen.
          </Button>
        </Link>
        <Link href="/thirdGen">
          <Button
            {...(pathname === "/thirdGen"
              ? { variant: "solid" }
              : { variant: "outline" })}
          >
            3<sup>rd</sup>gen.
          </Button>
        </Link>
        <Link href="/fourthGen">
          <Button
            {...(pathname === "/fourthGen"
              ? { variant: "solid" }
              : { variant: "outline" })}
          >
            4<sup>th</sup>gen.
          </Button>
        </Link>
        <Link href="/fifthGen">
          <Button
            {...(pathname === "/fifthGen"
              ? { variant: "solid" }
              : { variant: "outline" })}
          >
            5<sup>th</sup>gen.
          </Button>
        </Link>
        <Link href="/sixthGen">
          <Button
            {...(pathname === "/sixthGen"
              ? { variant: "solid" }
              : { variant: "outline" })}
          >
            6<sup>th</sup>gen.
          </Button>
        </Link>
        <Link href="/seventhGen">
          <Button
            {...(pathname === "/seventhGen"
              ? { variant: "solid" }
              : { variant: "outline" })}
          >
            7<sup>th</sup>gen.
          </Button>
        </Link>
        <Link href="/eighthGen">
          <Button
            {...(pathname === "/eighthGen"
              ? { variant: "solid" }
              : { variant: "outline" })}
          >
            8<sup>th</sup>gen.
          </Button>
        </Link>
        <Link href="/ninethGen">
          <Button
            {...(pathname === "/ninethGen"
              ? { variant: "solid" }
              : { variant: "outline" })}
          >
            9<sup>th</sup>gen.
          </Button>
        </Link>
      </div> */}

      <section>{children}</section>
    </main>
  );
};
