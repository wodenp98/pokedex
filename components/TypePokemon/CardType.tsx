import React from "react";
import { colorTypes } from "../colors";

interface CardTypeProps {
  firstType: string;
  secondType: string;
  name: string;
  id: number;
}

export const CardType = async ({
  firstType,
  secondType,
  name,
  id,
}: CardTypeProps) => {
  return (
    <div className="flex gap-1 h-8">
      <div
        className={`rounded-md w-1/3 font-bold flex justify-center items-center ${
          colorTypes[secondType.toLowerCase() as keyof typeof colorTypes]
        }`}
      >
        N°{String(id).padStart(4, "0")}
      </div>
      <div
        className={`rounded-md capitalize w-2/3 font-bold flex justify-center items-center ${
          colorTypes[firstType.toLowerCase() as keyof typeof colorTypes]
        }`}
      >
        {name}
      </div>
    </div>
  );
};
