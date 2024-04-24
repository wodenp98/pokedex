// import { colorTypes } from "@/utils/helpers";
import { getFrenchName } from "@/utils/helpers";
import Image from "next/image";
import React from "react";

async function getFrenchType(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  const nameFrench = await getFrenchName(data);
  return nameFrench;
}

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
