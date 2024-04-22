import {
  backgroundColorTypes,
  effectivenessBackgroundColor,
} from "@/utils/colorsBackground";
import React from "react";
import { colorTypes } from "../colors";
import { calculateTypeEffectiveness } from "@/utils/helpers";
import { getPokemonData, getFrenchFirstType } from "@/utils/apiCall";
import Image from "next/image";

export const Sensibility = async ({ id }: { id: number }) => {
  const pokemonData = await getPokemonData(id);
  const typeFrench = await getFrenchFirstType(pokemonData.types[0].type.url);
  const sensibility = await calculateTypeEffectiveness(pokemonData.types);

  return (
    <div
      className={`rounded-lg w-[350px] md:w-[500px] flex items-center justify-center p-1 flex-col ${
        backgroundColorTypes[
          typeFrench.name.toLowerCase() as keyof typeof backgroundColorTypes
        ]
      }`}
    >
      <p
        className={`${
          colorTypes[typeFrench.name.toLowerCase() as keyof typeof colorTypes]
        } font-bold rounded text-center w-full p-2`}
      >
        Sensibilités
      </p>
      <div className="grid grid-cols-6 rounded justify-center gap-0.5">
        {sensibility.map((type: any) => (
          <div
            key={type.type}
            className="flex flex-col justify-center items-center bg-white rounded"
          >
            <div className="py-px">
              <Image
                src={`/assets/pokemonTypes/${type?.type.toLowerCase()}.png`}
                alt={type?.type}
                width={100}
                height={100}
                quality={100}
              />
            </div>
            <p
              className={`${
                effectivenessBackgroundColor[type.effectiveness]
              } w-full text-center rounded font-bold h-full`}
            >
              {type.effectiveness}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
