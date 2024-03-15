import React from "react";

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

export const CardType = ({ typeId, typeName, name, id }: any) => {
  return (
    <div className="flex gap-1">
      <div
        className={`rounded-md ${
          colorTypes[typeId as keyof typeof colorTypes]
        }`}
      >
        N°{String(id).padStart(4, "0")}
      </div>
      <div
        className={`rounded-md capitalize ${
          colorTypes[typeName as keyof typeof colorTypes]
        }`}
      >
        {name}
      </div>
    </div>
  );
};
