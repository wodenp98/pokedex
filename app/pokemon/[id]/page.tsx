/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { getMovesByGeneration } from "@/utils/helpers";
import { PokemonCs } from "@/components/Pokemon/PokemonCs";
import { PokemonCt } from "@/components/Pokemon/PokemonCt";
import { GenerationsNumber } from "@/components/Pokemon/GenerationsNumber";
import {
  getStatsForPokemon,
  getPokemonData,
  getPokemonMoves,
} from "@/utils/apiCall";
import { InformationsPokemon } from "@/components/Pokemon/InformationsPokemon";
import { Sensibility } from "@/components/Pokemon/Sensibility";
import { Statistiques } from "@/components/Pokemon/Statistiques";
import { backgroundColorTypes, colorTypes } from "@/utils/colorsBackground";
import { EvolutionComponent } from "@/components/Pokemon/Evolutions";
import { Move, Moves, VersionGroupDetail } from "@/utils/type";

interface Params {
  params: {
    id: number;
  };
  searchParams?: Record<string, string>;
}

export default async function Page({ params: { id }, searchParams }: Params) {
  const pokemonData = await getPokemonData(id);
  const pokemonMoves = await getPokemonMoves(id);

  const moves = await getMovesByGeneration(
    (pokemonMoves as Moves).moves,
    searchParams?.generation || String(pokemonData.generation)
  );

  const pokemonStats = await getStatsForPokemon({
    pokemonId: pokemonData.pokedex_id,
    pokemonStats: pokemonData.stats,
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 py-2">
        <InformationsPokemon id={id} />

        <Sensibility id={id} />

        <div>
          <Statistiques stats={pokemonStats} type={pokemonData.types[0].name} />
        </div>

        <GenerationsNumber />
        <div>
          <PokemonCs
            moves={moves}
            generation={
              searchParams?.generation || String(pokemonData.generation)
            }
            type={pokemonData.types[0].name}
          />
        </div>

        <div>
          <PokemonCt moves={moves} type={pokemonData.types[0].name} />
        </div>

        <div
          className={`rounded-lg  flex items-center p-1 justify-center flex-col ${
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
            }  font-bold text-center rounded-t-lg w-full p-2`}
          >
            Evolutions
          </p>
          <EvolutionComponent evolutionData={pokemonData.evolution} />
        </div>
      </div>
    </div>
  );
}
