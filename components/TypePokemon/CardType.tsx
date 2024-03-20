// import { colorTypes } from "@/utils/helpers";
import { getFrenchName } from "@/utils/helpers";
import React from "react";

async function getFrenchFirstType(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  const nameFrench = await getFrenchName(data);

  return nameFrench;
}

async function getFrenchSecondType(url: string) {
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

export const CardType = async ({
  firstTypeUrl,
  secondTypeUrl,
  name,
  id,
}: any) => {
  const firstTypeFrench = await getFrenchFirstType(firstTypeUrl);
  const secondTypeFrench = await getFrenchSecondType(secondTypeUrl);

  return (
    <div className="flex gap-1">
      <div
        className={`rounded-md ${
          colorTypes[
            secondTypeFrench.name.toLowerCase() as keyof typeof colorTypes
          ]
        }`}
      >
        N°{String(id).padStart(4, "0")}
      </div>
      <div
        className={`rounded-md capitalize ${
          colorTypes[
            firstTypeFrench.name.toLowerCase() as keyof typeof colorTypes
          ]
        }`}
      >
        {name}
      </div>
    </div>
  );
};
