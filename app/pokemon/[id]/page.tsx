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
import Image from "next/image";
import { backgroundColorTypes, colorTypes } from "@/utils/colorsBackground";
import Link from "next/link";

interface Params {
  params: {
    id: number;
  };
  searchParams?: Record<string, string>;
}

const EvolutionDetails = async ({ evolutions }: any) => {
  const pokemons = await Promise.all(
    evolutions.map(async (evolution: any) => {
      const data = await getPokemonData(evolution.pokedex_id);

      return {
        ...data,
        evolution: evolution,
      };
    })
  );

  return (
    <div className="flex gap-1">
      {pokemons.map((pokemon: any) => (
        <Link href={`/pokemon/${pokemon.pokedex_id}`} key={pokemon.name.fr}>
          <div className="w-full rounded-b-lg overflow-hidden bg-white flex items-center justify-center flex-col">
            <Image
              src={pokemon.sprites.regular}
              alt={pokemon.name.fr}
              width={200}
              height={200}
            />
            <h1 className="text-lg font-bold text-center">{pokemon.name.fr}</h1>
            <p>{pokemon.evolution.condition}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

const EvolutionComponent = ({ evolutionData }: any) => {
  return (
    <div className="flex w-[350px] md:w-[500px] gap-1">
      {evolutionData.pre && evolutionData.pre.length > 0 && (
        <div>
          <EvolutionDetails evolutions={evolutionData.pre} />
        </div>
      )}

      {evolutionData.next && evolutionData.next.length > 0 && (
        <div>
          <EvolutionDetails evolutions={evolutionData.next} />
        </div>
      )}
    </div>
  );
};

export default async function Page({ params: { id }, searchParams }: Params) {
  const pokemonData = await getPokemonData(id);
  const pokemonMoves = await getPokemonMoves(id);

  const moves = await getMovesByGeneration(
    pokemonMoves.moves,
    searchParams?.generation || String(pokemonData.generation)
  );

  const pokemonStats = await getStatsForPokemon({
    pokemonId: pokemonData.id,
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
          <EvolutionComponent
            evolutionData={pokemonData.evolution}
            initialPokemon={pokemonData}
          />
        </div>
      </div>
    </div>
  );
}
