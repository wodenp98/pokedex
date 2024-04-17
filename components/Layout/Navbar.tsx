"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full justify-between bg-white shadow-md p-3">
      <Link href={"/"} className="flex items-center">
        <Image
          src="/assets/logo/pokeball.svg"
          alt="logo"
          width={30}
          height={30}
        />
        <p className="uppercase font-bold ml-3">Pokedex</p>
      </Link>
      <div className="flex items-center justify-center gap-2 ">
        <Link href="/">
          <Button variant={pathname === "/" ? "default" : "outline"}>
            I gen.
          </Button>
        </Link>
        <Link href="/secondGen">
          <Button variant={pathname === "/secondGen" ? "default" : "outline"}>
            II gen.
          </Button>
        </Link>
        <Link href="/thirdGen">
          <Button variant={pathname === "/thirdGen" ? "default" : "outline"}>
            III gen.
          </Button>
        </Link>
        <Link href="/fourthGen">
          <Button variant={pathname === "/fourthGen" ? "default" : "outline"}>
            IV gen.
          </Button>
        </Link>
        <Link href="/fifthGen">
          <Button variant={pathname === "/fifthGen" ? "default" : "outline"}>
            V gen.
          </Button>
        </Link>
        <Link href="/sixthGen">
          <Button variant={pathname === "/sixthGen" ? "default" : "outline"}>
            VI gen.
          </Button>
        </Link>
        <Link href="/seventhGen">
          <Button variant={pathname === "/seventhGen" ? "default" : "outline"}>
            VII gen.
          </Button>
        </Link>
        <Link href="/eighthGen">
          <Button variant={pathname === "/eighthGen" ? "default" : "outline"}>
            VIII gen.
          </Button>
        </Link>
        <Link href="/ninethGen">
          <Button variant={pathname === "/ninethGen" ? "default" : "outline"}>
            IX gen.
          </Button>
        </Link>
      </div>
    </div>
  );
};
