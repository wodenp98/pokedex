import { colorTypes } from "@/utils/helpers";
import React from "react";

async function getFrenchType(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  const nameFrench = data.names.find(
    (name: any) => name.language.name === "fr"
  );

  return nameFrench;
}

export const TypePokemon = async ({ url }: { url: string }) => {
  const typeFrench = await getFrenchType(url);
  return (
    <div
      className={`${
        colorTypes[typeFrench?.name.toLowerCase() as keyof typeof colorTypes]
      } text-white inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent`}
    >
      {typeFrench?.name}
    </div>
  );
};
