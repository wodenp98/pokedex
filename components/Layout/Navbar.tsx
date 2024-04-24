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

const generateNavigationLinks = () => {
  const links = [];
  const generations = 9; // Nombre total de générations

  for (let i = 1; i <= generations; i++) {
    const romanNumeral = getRomanNumeral(i);
    links.push(
      <NavigationMenuLink key={i} href={`/generation/${i}`}>
        {romanNumeral} gen.
      </NavigationMenuLink>
    );
  }

  return links;
};

const getRomanNumeral = (num: number) => {
  const romanNumerals = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
  ];
  return romanNumerals[num - 1];
};

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
                {generateNavigationLinks()}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
