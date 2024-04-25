import Image from "next/image";
import React from "react";

export const TypePokemon = async ({ name }: { name: string }) => {
  return (
    <div className="w-24 h-6 p-0.5">
      <Image
        src={`/assets/pokemonTypes/${name.toLowerCase()}.png`}
        alt={name}
        width={100}
        height={100}
        quality={100}
      />
    </div>
  );
};
