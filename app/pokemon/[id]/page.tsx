/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import { TypePokemon } from "@/components/TypePokemon/TypePokemon";
import {
  backgroundColorTypes,
  calculateTypeEffectiveness,
  colorTypes,
  getFrenchFirstType,
  getFrenchName,
  getMovesByGeneration,
  typeChart,
} from "@/utils/helpers";
import { CardType } from "@/components/TypePokemon/CardType";
import { PokemonsMoves } from "@/components/Pokemons/PokemonsMoves";
import { Icons } from "@/components/icons";
import { stat } from "fs";

interface Params {
  params: {
    id: number;
  };
  searchParams?: Record<string, string>;
}

async function getPokemonData(id: number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  return data;
}

async function getInformationsForPokemon(id: number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  const data = await res.json();

  return data;
}

async function getAbilitiesForPokemon(data: any) {
  const abilities = await Promise.all(
    data.map(async (ability: any) => {
      const res = await fetch(ability.ability.url);
      const data = await res.json();
      const getFrenchAbility = await getFrenchName(data);
      ability.ability.name = getFrenchAbility.name;
      return ability;
    })
  );

  return abilities;
}

async function getEggsForPokemon(data: any) {
  const eggs = await Promise.all(
    data.map(async (egg: any) => {
      const res = await fetch(egg.url);
      const data = await res.json();
      const getFrenchEgg = await getFrenchName(data);
      egg.name = getFrenchEgg.name;
      return egg;
    })
  );
  return eggs;
}

async function getPokemonGrowthRate(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  return data.levels[data.levels.length - 1].experience;
}

async function getPokemonGender(gender: number) {
  let male;
  let female;

  switch (gender) {
    case 0:
      male = "100";
      female = "0";
      break;
    case 1:
      male = "87.5";
      female = "12.5";
      break;
    case 2:
      male = "75";
      female = "25";
      break;
    case 3:
      male = "62.5";
      female = "37.5";
      break;
    case 4:
      male = "50";
      female = "50";
      break;
    case 5:
      male = "37.5";
      female = "62.5";
      break;
    case 6:
      male = "25";
      female = "75";
      break;
    case 7:
      male = "12.5";
      female = "87.5";
      break;
    case 8:
      male = "0";
      female = "100";
      break;
    default:
      male = "0";
      female = "0";
  }

  return { male, female };
}

async function getEvolutionOfPokemon(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  const evolutionChain = [];

  if (data.id === 67) {
    let currentStage = data.chain;

    const dataEvee = await getPokemonData(currentStage.species.name);
    const dataEveeSpecies = await getInformationsForPokemon(dataEvee.id);

    const dataEveeFrenchName = await getFrenchName(dataEveeSpecies);
    evolutionChain.push({
      ...dataEvee,
      frenchName: dataEveeFrenchName.name,
    });

    for (let i = 0; i < currentStage.evolves_to.length; i++) {
      const pokemon = await getPokemonData(
        currentStage.evolves_to[i].species.name
      );
      const pokemonSpecies = await getInformationsForPokemon(pokemon.id);

      const pokemonFrenchName = await getFrenchName(pokemonSpecies);

      evolutionChain.push({
        ...pokemon,
        frenchName: pokemonFrenchName.name,
        evolves: currentStage.evolves_to[i].evolution_details,
      });
    }
  } else {
    let currentStage = data.chain;

    while (currentStage) {
      const pokemon = await getPokemonData(currentStage.species.name);
      const pokemonSpecies = await getInformationsForPokemon(pokemon.id);

      const pokemonFrenchName = await getFrenchName(pokemonSpecies);

      evolutionChain.push({
        ...pokemon,
        frenchName: pokemonFrenchName.name,
        evolves: currentStage.evolution_details[0],
      });

      currentStage = currentStage.evolves_to[0];
    }
  }

  return evolutionChain;
}

// async function getStatsForPokemon({
//   pokemonId,
//   pokemonStats,
// }: {
//   pokemonId: number;
//   pokemonStats: any;
// }) {
//   if (pokemonId === 292) {
//     // console.log("pokemonStats", pokemonStats[0]);
//     pokemonStats[0].stat.frenchName = "PV";
//     pokemonStats[0].maxStat = 1;
//     pokemonStats[0].minStat = 1;
//   } else {
//     pokemonStats[0].stat.frenchName = "PV";
//     pokemonStats[0].maxStat = Math.floor(
//       ((2 * pokemonStats[0].base_stat + 31 + 63) * 100) / 100 + 100 + 10
//     );
//     pokemonStats[0].minStat = Math.floor(
//       (2 * pokemonStats[0].base_stat * 100) / 100 + 100 + 10
//     );
//   }

//   for (let i = 1; i < pokemonStats.length; i++) {
//     const statName = await fetch(pokemonStats[i].stat.url);
//     const data = await statName.json();

//     const statNameInFrench = await getFrenchName(data);

//     pokemonStats[i].stat.frenchName = statNameInFrench.name;
//     pokemonStats[i].maxStat = Math.floor(
//       Math.floor(((2 * pokemonStats[i].base_stat + 31 + 63) * 100) / 100 + 5) *
//         1.1
//     );
//     pokemonStats[i].minStat = Math.floor(
//       Math.floor((2 * pokemonStats[i].base_stat * 100) / 100 + 5) * 0.9
//     );
//   }

//   console.log("pokemonStats", pokemonStats);

//   return pokemonStats;
// }

async function getStatsForPokemon({
  pokemonId,
  pokemonStats,
}: {
  pokemonId: number;
  pokemonStats: any;
}) {
  for (let i = 0; i < pokemonStats.length; i++) {
    const isHP = i === 0;
    const statName = await fetch(pokemonStats[i].stat.url);
    const data = await statName.json();
    const statNameInFrench = await getFrenchName(data);

    pokemonStats[i].stat.frenchName = statNameInFrench.name;

    if (pokemonId === 292 && isHP) {
      pokemonStats[i].maxStat = 1;
      pokemonStats[i].minStat = 1;
    } else {
      const base = 2 * pokemonStats[i].base_stat;
      const addedValue = isHP ? 100 + 10 : 5;
      const multiplier = isHP ? 1 : 0.9;

      pokemonStats[i].maxStat = Math.floor(
        Math.floor(((base + 31 + 63) * 100) / 100 + addedValue) *
          (isHP ? 1 : 1.1)
      );
      pokemonStats[i].minStat = Math.floor(
        Math.floor((base * 100) / 100 + addedValue) * multiplier
      );
    }
  }

  return pokemonStats;
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
    searchParams?.generation || "1"
  );

  const pokemonFrenchName = await getFrenchName(informationsPokemon);
  const sensibility = await calculateTypeEffectiveness(pokemonData.types);

  const pokemonAbilities = await getAbilitiesForPokemon(pokemonData.abilities);
  const pokemonEggs = await getEggsForPokemon(informationsPokemon.egg_groups);

  const pokemonGrowthRate = await getPokemonGrowthRate(
    informationsPokemon.growth_rate.url
  );

  const pokemonGender = await getPokemonGender(informationsPokemon.gender_rate);

  const pokemonStats = await getStatsForPokemon({
    pokemonId: pokemonData.id,
    pokemonStats: pokemonData.stats,
  });

  console.log("pokemonStats", pokemonStats);

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-2">
        <div
          className={`rounded-lg w-[350px]  border text-card-foreground shadow-sm ${
            backgroundColorTypes[
              typeFrench.name.toLowerCase() as keyof typeof backgroundColorTypes
            ]
          }`}
        >
          <div className="pt-1 px-1">
            {pokemonData.types.length > 1 ? (
              <CardType
                firstTypeUrl={pokemonData.types[0].type.url}
                secondTypeUrl={pokemonData.types[1].type.url}
                name={pokemonFrenchName.name}
                id={pokemonData.id}
              />
            ) : (
              <CardType
                firstTypeUrl={pokemonData.types[0].type.url}
                secondTypeUrl={pokemonData.types[0].type.url}
                name={pokemonFrenchName.name}
                id={pokemonData.id}
              />
            )}
          </div>
          <div className="flex items-center justify-center p-1">
            <div className="w-full flex items-center justify-center bg-white rounded">
              <Image
                src={
                  pokemonData.sprites.other?.["official-artwork"]?.front_default
                }
                alt={pokemonData.name}
                width={280}
                height={250}
                quality={100}
              />
            </div>
          </div>
          <div className="flex gap-0.5 w-full items-center p-1">
            <p
              className={`${
                colorTypes[
                  typeFrench.name.toLowerCase() as keyof typeof colorTypes
                ]
              } font-bold rounded w-2/5 p-2`}
            >
              Nom anglais
            </p>
            <p className="capitalize  bg-white rounded w-3/5 p-2">
              {pokemonData.name}
            </p>
          </div>
          <div className="flex flex-col gap-1 w-full items-center p-1">
            <p
              className={`${
                colorTypes[
                  typeFrench.name.toLowerCase() as keyof typeof colorTypes
                ]
              } font-bold rounded w-full p-2`}
            >
              Numéros de Pokédex
            </p>

            <div className="bg-white p-4 rounded">
              <div className="grid grid-cols-3 gap-2 text-center">
                {informationsPokemon.pokedex_numbers.map(
                  (pokedexNumber: any) => (
                    <div key={pokedexNumber.pokedex.name}>
                      <div>
                        <h3 className="font-bold capitalize text-sm">
                          {pokedexNumber.pokedex.name.replace(/-/g, " ")}
                        </h3>
                        <p className="text-sm">{pokedexNumber.entry_number}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-0.5 w-full items-center p-1">
            <p
              className={`${
                colorTypes[
                  typeFrench.name.toLowerCase() as keyof typeof colorTypes
                ]
              } font-bold rounded w-2/5 p-2`}
            >
              Types
            </p>
            <div className="bg-white rounded w-3/5 flex items-center justify-center p-2">
              {pokemonData.types.map((type: any) => (
                <div key={type.type.name}>
                  <TypePokemon url={type.type.url} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-0.5 w-full items-center p-1">
            <p
              className={`${
                colorTypes[
                  typeFrench.name.toLowerCase() as keyof typeof colorTypes
                ]
              } font-bold rounded w-2/5 p-2`}
            >
              Catégorie
            </p>
            <p className="capitalize  bg-white rounded w-3/5 p-2">
              {
                informationsPokemon.genera.find(
                  (gen: any) => gen.language.name === "fr"
                ).genus
              }
            </p>
          </div>
          <div className="flex gap-0.5 w-full items-center p-1">
            <p
              className={`${
                colorTypes[
                  typeFrench.name.toLowerCase() as keyof typeof colorTypes
                ]
              } font-bold rounded w-2/5 p-2`}
            >
              Taille
            </p>
            <p className=" bg-white rounded w-3/5 p-2">
              {pokemonData.height / 10} m
            </p>
          </div>
          <div className="flex gap-0.5 w-full items-center p-1">
            <p
              className={`${
                colorTypes[
                  typeFrench.name.toLowerCase() as keyof typeof colorTypes
                ]
              } font-bold rounded w-2/5 p-2`}
            >
              Poids
            </p>
            <p className=" bg-white rounded w-3/5 p-2">
              {pokemonData.weight / 10} kg
            </p>
          </div>
          <div className="flex gap-0.5 w-full items-center p-1">
            <p
              className={`${
                colorTypes[
                  typeFrench.name.toLowerCase() as keyof typeof colorTypes
                ]
              } font-bold rounded w-2/5 py-4 pl-2`}
            >
              Talents
            </p>

            <div className="capitalize bg-white rounded w-3/5 py-1 pl-2 flex flex-col">
              {pokemonAbilities.map((ability: any) => (
                <div key={ability.ability.name}>
                  <p>{ability.ability.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-0.5 w-full items-stretch p-1">
            <p
              className={`${
                colorTypes[
                  typeFrench.name.toLowerCase() as keyof typeof colorTypes
                ]
              } font-bold rounded w-2/5 p-2`}
            >
              Groupes d'Oeuf
            </p>
            <div className="capitalize bg-white rounded w-3/5 p-2 flex flex-col justify-center">
              {pokemonEggs.map((egg: any) => (
                <div key={egg.name}>
                  <p>{egg.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-0.5 w-full items-center p-1">
            <p
              className={`${
                colorTypes[
                  typeFrench.name.toLowerCase() as keyof typeof colorTypes
                ]
              } font-bold rounded w-2/5 p-2`}
            >
              Eclosion
            </p>
            <p className="capitalize  bg-white rounded w-3/5 p-2">
              {informationsPokemon.hatch_counter} cycles
            </p>
          </div>
          <div className="flex gap-0.5 w-full items-center p-1">
            <p
              className={`${
                colorTypes[
                  typeFrench.name.toLowerCase() as keyof typeof colorTypes
                ]
              } font-bold rounded w-2/5 p-2`}
            >
              Base Exp.
            </p>
            <p className="capitalize  bg-white rounded w-3/5 p-2">
              {pokemonData.base_experience} exp.
            </p>
          </div>
          <div className="flex gap-0.5 w-full items-center p-1">
            <p
              className={`${
                colorTypes[
                  typeFrench.name.toLowerCase() as keyof typeof colorTypes
                ]
              } font-bold rounded w-2/5 p-2`}
            >
              Taux de capture
            </p>
            <p className="capitalize  bg-white rounded w-3/5 py-5 pl-2">
              {informationsPokemon.capture_rate}
            </p>
          </div>
          <div className="flex gap-0.5 w-full items-center p-1">
            <p
              className={`${
                colorTypes[
                  typeFrench.name.toLowerCase() as keyof typeof colorTypes
                ]
              } font-bold rounded w-2/5 p-2`}
            >
              Bonheur
            </p>
            <p className="capitalize  bg-white rounded w-3/5 p-2">
              {informationsPokemon.base_happiness}
            </p>
          </div>
          <div className="flex gap-0.5 w-full items-center p-1">
            <p
              className={`${
                colorTypes[
                  typeFrench.name.toLowerCase() as keyof typeof colorTypes
                ]
              } font-bold rounded w-2/5 p-2`}
            >
              Exp. niv.100
            </p>
            <p className="capitalize  bg-white rounded w-3/5 p-2">
              {pokemonGrowthRate} exp.
            </p>
          </div>
          <div className="flex gap-0.5 w-full items-center p-1">
            <p
              className={`${
                colorTypes[
                  typeFrench.name.toLowerCase() as keyof typeof colorTypes
                ]
              } font-bold rounded w-2/5 py-4 pl-2`}
            >
              Sexe
            </p>
            <div className="capitalize  bg-white rounded w-3/5 py-1 pl-2 flex flex-col">
              <p className="text-pink-500 flex items-center">
                {pokemonGender.female}%{" "}
                <Icons.femaleGender className="h-4 w-4" />
              </p>
              <p className="text-blue-500 flex items-center">
                {pokemonGender.male}% <Icons.maleGender className="h-4 w-4" />
              </p>
            </div>
          </div>
        </div>

        {/* <PokemonsMoves /> */}

        {/* <div>
          <p>Stats</p>
          {pokemonData.stats.map((stat: any) => (
            <div key={stat.stat.name}>
              <p>{stat.stat.name}</p>
              <p>{stat.base_stat}</p>
            </div>
          ))}
        </div> */}
        {/* <div>
        <p>Moves</p>
        {pokemonData.moves.map((move: any) => (
          <div key={move.move.name}>
            <p>{move.move.name}</p>
          </div>
        ))}
      </div> */}
        {/* <div>
          <p>Sensibility</p>
          <div className="flex">
            {sensibility.map((type: any) => (
              <div key={type.type} className="">
                <p>{type.type}</p>
                <p>{type.effectiveness}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* <div className="flex gap-4 flex-wrap justify-center">
          {evolvePokemon.map((pokemon) => (
            <Card key={pokemon.frenchName} className="w-44 flex justify-center">
              <CardContent>
                <Link href={`/pokemon/${pokemon.id}`}>
                  <div className="w-full rounded-lg overflow-hidden">
                    <Image
                      src={
                        pokemon.sprites.other?.["official-artwork"]
                          ?.front_default
                      }
                      alt={pokemon.frenchName}
                      width={200}
                      height={200}
                    />
                  </div>
                  <h1 className="text-lg  font-bold text-center">
                    {pokemon.frenchName}
                  </h1>
                  <p>{pokemon.evolves?.min_level ?? ""}</p>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div> */}
      </div>
    </div>
  );
}
