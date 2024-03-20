// import { colorTypes } from "@/utils/helpers";
import { getFrenchName } from "@/utils/helpers";
import React from "react";

async function getFrenchType(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  const nameFrench = await getFrenchName(data);
  return nameFrench;
}

const colorTypes = {
  feu: "bg-red-500",
  eau: "bg-blue-500",
  plante: "bg-green-500",
  électrik: "bg-yellow-500",
  sol: "bg-yellow-950",
  roche: "bg-gray-500",
  fée: "bg-pink-500",
  poison: "bg-purple-500",
  insecte: "bg-green-500",
  dragon: "bg-purple-500",
  psy: "bg-pink-500",
  vol: "bg-blue-500",
  combat: "bg-red-500",
  normal: "bg-gray-500",
  spectre: "bg-purple-500",
  glace: "bg-blue-500",
  ténèbres: "bg-slate-950",
  acier: "bg-gray-500",
};

export const TypePokemon = async ({ url }: { url: string }) => {
  const typeFrench = await getFrenchType(url);
  return (
    <div
      className={`${
        colorTypes[typeFrench.name.toLowerCase() as keyof typeof colorTypes]
      } text-white inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent`}
    >
      {typeFrench?.name}
    </div>
  );
};
