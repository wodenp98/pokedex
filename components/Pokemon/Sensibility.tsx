import {
  backgroundColorTypes,
  effectivenessBackgroundColor,
} from "@/utils/colorsBackground";
import React from "react";
import { colorTypes } from "../colors";

import { getPokemonData } from "@/utils/apiCall";
import Image from "next/image";

export const Sensibility = async ({ id }: { id: number }) => {
  const pokemonData = await getPokemonData(id);
  return (
    <div
      className={`rounded-lg w-[350px] md:w-[500px] flex items-center justify-center p-1 flex-col ${
        backgroundColorTypes[
          pokemonData.types[0].name.toLowerCase() as keyof typeof backgroundColorTypes
        ]
      }`}
    >
      <p
        className={`${
          colorTypes[
            pokemonData.types[0].name.toLowerCase() as keyof typeof colorTypes
          ]
        } font-bold rounded text-center w-full p-2`}
      >
        Sensibilités
      </p>
      <div className="grid grid-cols-6 rounded justify-center gap-0.5">
        {pokemonData.resistances.map((resistance) => (
          <div
            key={resistance.name}
            className="flex flex-col justify-center items-center bg-white rounded"
          >
            <div className="py-px">
              <Image
                src={`/assets/pokemonTypes/${resistance.name.toLowerCase()}.png`}
                alt={resistance.name}
                width={100}
                height={100}
                quality={100}
              />
            </div>
            <p
              className={`${
                effectivenessBackgroundColor[resistance.multiplier]
              } w-full text-center rounded font-bold h-full`}
            >
              {resistance.multiplier === 1 ? "x" : resistance.multiplier + "x"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
