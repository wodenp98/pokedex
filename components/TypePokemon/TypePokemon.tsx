import React from "react";

// https://pokeapi.co/api/v2/type/{id or name}/
// console.log("evolvePokemon", evolvePokemon[0].types[0].type.url);

export const TypePokemon = ({ type }: { type: string }) => {
  const colorTypes = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    ground: "bg-yellow-950",
    rock: "bg-gray-500",
    fairy: "bg-pink-500",
    poison: "bg-purple-500",
    bug: "bg-green-500",
    dragon: "bg-purple-500",
    psychic: "bg-pink-500",
    flying: "bg-blue-500",
    fighting: "bg-red-500",
    normal: "bg-gray-500",
    ghost: "bg-purple-500",
    ice: "bg-blue-500",
    dark: "bg-slate-950",
    steel: "bg-gray-500",
  };

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
