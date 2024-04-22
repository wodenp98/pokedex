"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full justify-between bg-white shadow-md p-4">
      <Link href={"/"} className="flex items-center">
        <Image
          src="/assets/logo/pokeball.svg"
          alt="logo"
          width={30}
          height={30}
        />
        <p className="uppercase font-bold ml-3">Pokedex</p>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex flex-col gap-3 p-2 w-[90px]">
                <NavigationMenuLink href="/">I gen.</NavigationMenuLink>
                <NavigationMenuLink href="/secondGen">
                  II gen.
                </NavigationMenuLink>
                <NavigationMenuLink href="/thirdGen">
                  III gen.
                </NavigationMenuLink>
                <NavigationMenuLink href="/fourthGen">
                  IV gen.
                </NavigationMenuLink>
                <NavigationMenuLink href="/fifthGen">V gen.</NavigationMenuLink>
                <NavigationMenuLink href="/sixthGen">
                  VI gen.
                </NavigationMenuLink>
                <NavigationMenuLink href="/seventhGen">
                  VII gen.
                </NavigationMenuLink>
                <NavigationMenuLink href="/eighthGen">
                  VIII gen.
                </NavigationMenuLink>
                <NavigationMenuLink href="/ninethGen">
                  IX gen.
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* <div className="flex items-center justify-center gap-2">
        <Link href="/">
          <Button
            size={"sm"}
            variant={pathname === "/" ? "default" : "outline"}
          >
            I gen.
          </Button>
        </Link>
        <Link href="/secondGen">
          <Button
            size={"sm"}
            variant={pathname === "/secondGen" ? "default" : "outline"}
          >
            II gen.
          </Button>
        </Link>
        <Link href="/thirdGen">
          <Button
            size={"sm"}
            variant={pathname === "/thirdGen" ? "default" : "outline"}
          >
            III gen.
          </Button>
        </Link>
        <Link href="/fourthGen">
          <Button
            size={"sm"}
            variant={pathname === "/fourthGen" ? "default" : "outline"}
          >
            IV gen.
          </Button>
        </Link>
        <Link href="/fifthGen">
          <Button
            size={"sm"}
            variant={pathname === "/fifthGen" ? "default" : "outline"}
          >
            V gen.
          </Button>
        </Link>
        <Link href="/sixthGen">
          <Button
            size={"sm"}
            variant={pathname === "/sixthGen" ? "default" : "outline"}
          >
            VI gen.
          </Button>
        </Link>
        <Link href="/seventhGen">
          <Button
            size={"sm"}
            variant={pathname === "/seventhGen" ? "default" : "outline"}
          >
            VII gen.
          </Button>
        </Link>
        <Link href="/eighthGen">
          <Button
            size={"sm"}
            variant={pathname === "/eighthGen" ? "default" : "outline"}
          >
            VIII gen.
          </Button>
        </Link>
        <Link href="/ninethGen">
          <Button
            size={"sm"}
            variant={pathname === "/ninethGen" ? "default" : "outline"}
          >
            IX gen.
          </Button>
        </Link>
      </div> */}
    </div>
  );
};
