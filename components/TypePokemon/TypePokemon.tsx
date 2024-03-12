import React from "react";
import { colorTypes } from "@/utils/helpers";

// https://pokeapi.co/api/v2/type/{id or name}/
// console.log("evolvePokemon", evolvePokemon[0].types[0].type.url);

export const TypePokemon = ({ type }: { type: string }) => {
  return (
    <div
      className={`${
        colorTypes[type as keyof typeof colorTypes]
      } text-white inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent`}
    >
      {type}
    </div>
  );
};
