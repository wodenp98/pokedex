/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import { TypePokemon } from "@/components/TypePokemon/TypePokemon";
import {
  backgroundColorTypes,
  calculateTypeEffectiveness,
  colorTypes,
  getEnglishName,
  getFrenchFirstType,
  getFrenchName,
  getMovesByGeneration,
  typeChart,
} from "@/utils/helpers";
import { CardType } from "@/components/TypePokemon/CardType";
import { Icons } from "@/components/icons";
import { Statistiques } from "@/components/ui/Statistiques";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { PokemonCs } from "@/components/Pokemons/PokemonCs";
import { PokemonCt } from "@/components/Pokemons/PokemonCt";
import { GenerationsNumber } from "@/components/Pokemons/GenerationsNumber";
import { info } from "console";

interface Params {
  params: {
    id: number;
  };
  searchParams?: Record<string, string>;
}

export async function getPokemonData(id: number | string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  const data = await res.json();

  return data;
}

export async function getInformationsForPokemon(id: number) {
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

const generationNumbers: { [key: string]: string } = {
  "generation-i": "1",
  "generation-ii": "2",
  "generation-iii": "3",
  "generation-iv": "4",
  "generation-v": "5",
  "generation-vi": "6",
  "generation-vii": "7",
  "generation-viii": "8",
  "generation-ix": "9",
};

const effectivenessBackgroundColor: { [key: string]: string } = {
  "0x": "bg-[#CCCCCC]",
  "0.25x": "bg-[#3AF24B]",
  "0.5x": "bg-[#AAFFAA]",
  "1x": "bg-[#FFFFAA]",
  "2x": "bg-[#FFAAAA]",
  "4x": "bg-[#FF5555]",
};

async function getEvolutionOfPokemon(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function evolveMethodForPokemon(evolution: any) {
  if (evolution.trigger.name === "recoil-damage") {
    return "perdre 294 PV ou plus par contrecoup sans être mis K.O.";
  } else if (evolution.trigger.name === "strong-style-move") {
    return `Utiliser 20 fois ou plus la capacité Multitoxik sous Style Puissant.`;
  } else if (evolution.trigger.name === "agile-style-move") {
    return `Utiliser 20 fois ou plus la capacité Sprint Bouclier sous Style Rapide `;
  } else if (evolution.trigger.name === "other") {
    // a check
    return "Autre";
  } else if (evolution.trigger.name === "take-damage") {
    return `Perdre 49 PV ou plus + marcher sous la grande arche de pierres de la Fosse des Sables`;
  } else if (evolution.trigger.name === "three-critical-hits") {
    return `Attaque critique 3 fois`;
  } else if (evolution.trigger.name === "tower-of-waters") {
    return "Gravir la Tour de l'Eau";
  } else if (evolution.trigger.name === "tower-of-darkness") {
    return "Gravir la Tour des Ténèbres";
  } else if (evolution.trigger.name === "spin") {
    return "Objet en Sucre + tourner sur soi-même";
  } else if (evolution.trigger.name === "shed") {
    return "Niveau 20, emplacement libre et Poké Ball dans l'inventaire";
  } else if (evolution.trigger.name === "use-item") {
    const url = evolution.item.url;
    const res = await fetch(url);
    const data = await res.json();
    const itemNameInFrench = await getFrenchName(data);
    return `Avec une ${itemNameInFrench.name}`;
  } else if (
    evolution.trigger.name === "trade" &&
    evolution.held_item !== null
  ) {
    const url = evolution.held_item.url;
    const res = await fetch(url);
    const data = await res.json();
    const itemNameInFrench = await getFrenchName(data);
    return `Echange en tenant ${itemNameInFrench.name}`;
  } else if (
    evolution.trigger.name === "level-up" &&
    evolution.held_item !== null
  ) {
    const url = evolution.held_item.url;
    const res = await fetch(url);
    const data = await res.json();
    const itemNameInFrench = await getFrenchName(data);
    return `Gain de niveau avec ${itemNameInFrench.name}`;
  } else if (
    evolution.trigger.name === "level-up" &&
    evolution.min_happiness !== null &&
    evolution.time_of_day === "day"
  ) {
    return "Bonheur, Jour";
  } else if (
    evolution.trigger.name === "level-up" &&
    evolution.min_happiness !== null &&
    evolution.time_of_day === "night"
  ) {
    return "Bonheur, Nuit";
  } else if (
    evolution.trigger.name === "level-up" &&
    evolution.min_happiness !== null
  ) {
    return "Bonheur";
  } else if (
    evolution.trigger.name === "level-up" &&
    evolution.min_level !== null
  ) {
    return `Niveau ${evolution.min_level}`;
  } else if (
    evolution.trigger.name === "level-up" &&
    evolution.location !== null
  ) {
    const url = evolution.location.url;
    const res = await fetch(url);
    const data = await res.json();

    const locationName =
      (await getFrenchName(data)) ?? (await getEnglishName(data));

    return `Près de ${locationName.name}`;
  } else if (
    evolution.trigger.name === "level-up" &&
    evolution.known_move_type !== null
  ) {
    const url = evolution.known_move_type.url;
    const res = await fetch(url);
    const data = await res.json();
    const typeName = await getFrenchName(data);

    return `Gagner un niveau en ayant une capacité ${typeName.name}`;
  } else {
    return "";
  }
}

const EvolutionEntry = async ({ evolution }: { evolution: any }) => {
  const url = evolution.species.url;
  const splitUrl = url.split("/")[6];

  const pokemonData = await getPokemonData(splitUrl);
  const informationPokemon = await getInformationsForPokemon(splitUrl);
  const pokemonFrenchName = await getFrenchName(informationPokemon);

  const evolveMethods = await Promise.all(
    evolution.evolution_details.map(async (detail: any) => {
      const method = await evolveMethodForPokemon(detail);
      return (
        <div className="py-1 rounded-md bg-white" key={method}>
          <p className="bg-white text-xs text-center p-1">{method}</p>
        </div>
      );
    })
  );

  return (
    <div className="flex flex-col gap-1">
      <>{evolveMethods}</>
      <Link href={`/pokemon/${informationPokemon.id}`}>
        <div className="w-full rounded-lg overflow-hidden bg-white flex items-center justify-center flex-col">
          <Image
            src={pokemonData.sprites.other?.["official-artwork"]?.front_default}
            alt={pokemonFrenchName.name}
            width={200}
            height={200}
          />
          <h1 className="text-lg font-bold text-center">
            {pokemonFrenchName.name}
          </h1>
        </div>
      </Link>
      {evolution.evolves_to.length > 1 ? (
        <div key={evolution.species.name} className="flex gap-1">
          {evolution.evolves_to.map((nextEvolution: any, index: number) => (
            <EvolutionEntry key={index} evolution={nextEvolution} />
          ))}
        </div>
      ) : (
        <div key={evolution.species.name}>
          {evolution.evolves_to.map((nextEvolution: any, index: number) => (
            <EvolutionEntry key={index} evolution={nextEvolution} />
          ))}
        </div>
      )}
    </div>
  );
};

// Création de petits composants et de nouveaux fichiers

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

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-2">
        <div
          className={`rounded-lg w-[350px] border-0 ${
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

            <div className="bg-white w-full p-4 rounded">
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
                  (gen: any) =>
                    gen.language.name === "fr" || gen.language.name === "en"
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
          <div className="flex gap-0.5 w-full items-stretch p-1">
            <p
              className={`${
                colorTypes[
                  typeFrench.name.toLowerCase() as keyof typeof colorTypes
                ]
              } font-bold rounded w-2/5 py-4 pl-2`}
            >
              Talents
            </p>

            <div className="capitalize bg-white rounded l w-3/5 py-1 pl-2 flex flex-col justify-center">
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
        <div
          className={`rounded-lg flex items-center justify-center p-1 flex-col ${
            backgroundColorTypes[
              typeFrench.name.toLowerCase() as keyof typeof backgroundColorTypes
            ]
          }`}
        >
          <p
            className={`${
              colorTypes[
                typeFrench.name.toLowerCase() as keyof typeof colorTypes
              ]
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
                <div className="w-24 h-6 py-px">
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
        <div
          className={`rounded-lg flex items-center p-1 justify-center flex-col ${
            backgroundColorTypes[
              typeFrench.name.toLowerCase() as keyof typeof backgroundColorTypes
            ]
          }`}
        >
          <EvolutionEntry evolution={evolvePokemon.chain} />
        </div>
      </div>
    </div>
  );
}
