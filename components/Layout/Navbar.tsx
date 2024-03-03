import Image from "next/image";
import React from "react";

export const Navbar = () => {
  return (
    <div className="flex items-center shadow-md p-3">
      <Image
        src="/assets/logo/pokeball.svg"
        alt="logo"
        width={30}
        height={30}
      />
      <p className="uppercase font-bold ml-3">Pokedex</p>
    </div>
  );
};
