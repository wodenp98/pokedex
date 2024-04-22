/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { generationNumbers, getMovesByGeneration } from "@/utils/helpers";
import { PokemonCs } from "@/components/Pokemon/PokemonCs";
import { PokemonCt } from "@/components/Pokemon/PokemonCt";
import { GenerationsNumber } from "@/components/Pokemon/GenerationsNumber";
import {
  getPokemonData,
  getInformationsForPokemon,
  getEvolutionOfPokemon,
  getStatsForPokemon,
  getFrenchFirstType,
} from "@/utils/apiCall";
import { backgroundColorTypes, colorTypes } from "@/utils/colorsBackground";
import {
  EvolutionEeveeEntry,
  EvolutionEntry,
} from "@/components/Pokemon/Evolution";
import { InformationsPokemon } from "@/components/Pokemon/InformationsPokemon";
import { Sensibility } from "@/components/Pokemon/Sensibility";
import { Statistiques } from "@/components/Pokemon/Statistiques";

interface Params {
  params: {
    id: number;
  };
  searchParams?: Record<string, string>;
}

export default async function Page({ params: { id }, searchParams }: Params) {
  const pokemonData = await getPokemonData(id);
  const informationsPokemon = await getInformationsForPokemon(pokemonData.id);

  const typeFrench = await getFrenchFirstType(pokemonData.types[0].type.url);

  const evolvePokemon = await getEvolutionOfPokemon(
    informationsPokemon.evolution_chain.url
  );

  const pokemonMoves = await getMovesByGeneration(
    pokemonData.moves,
    searchParams?.generation ||
      generationNumbers[informationsPokemon.generation.name as string]
  );

  const pokemonStats = await getStatsForPokemon({
    pokemonId: pokemonData.id,
    pokemonStats: pokemonData.stats,
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-2">
        <InformationsPokemon id={id} />
        <div>
          <Statistiques stats={pokemonStats} type={typeFrench.name} />
        </div>
        <GenerationsNumber />
        <div>
          <PokemonCs
            moves={pokemonMoves}
            generation={
              searchParams?.generation ||
              generationNumbers[informationsPokemon.generation.name]
            }
            type={typeFrench.name}
          />
        </div>
        <div>
          <PokemonCt moves={pokemonMoves} type={typeFrench.name} />
        </div>
        <Sensibility id={id} />
        <div
          className={`rounded-lg  flex items-center p-1 justify-center flex-col ${
            backgroundColorTypes[
              typeFrench.name.toLowerCase() as keyof typeof backgroundColorTypes
            ]
          }`}
        >
          {informationsPokemon.evolution_chain.url ===
          "https://pokeapi.co/api/v2/evolution-chain/67/" ? (
            <EvolutionEeveeEntry evolution={evolvePokemon.chain} />
          ) : (
            <EvolutionEntry evolution={evolvePokemon.chain} />
          )}
        </div>
      </div>
    </div>
  );
}
