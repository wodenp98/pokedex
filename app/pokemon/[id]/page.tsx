import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { TypePokemon } from "@/components/TypePokemon/TypePokemon";
import {
  calculateTypeEffectiveness,
  getFrenchFirstType,
  getFrenchName,
  getMovesByGeneration,
  typeChart,
} from "@/utils/helpers";
import { CardType } from "@/components/TypePokemon/CardType";
import { PokemonsMoves } from "@/components/Pokemons/PokemonsMoves";

interface Params {
  params: {
    id: number;
  };
  searchParams?: Record<string, string>;
}

const backgroundColorTypes = {
  feu: "bg-[#FDDCD5]",
  eau: "bg-[#D7EBFF]",
  plante: "bg-[#E4F5DC]",
  électrik: "bg-[#FFF3D5]",
  sol: "bg-[#F6F0DE]",
  roche: "bg-[#F1EDDE]",
  fée: "bg-[#F8EAF9]",
  poison: "bg-[#F0DEED]",
  insecte: "bg-[#EEF1D2]",
  dragon: "bg-[#E7DDFD]",
  psy: "bg-[#FFE3ED]",
  vol: "bg-[#EBEEFD]",
  combat: "bg-[#FFEDDD]",
  normal: "bg-[#EEEDE9]",
  spectre: "bg-[#F7E1F7]",
  glace: "bg-[#DEF5FA]",
  ténèbres: "bg-[#E3DEDA]",
  acier: "bg-[#EEEEF3]",
};

const colorTypes = {
  feu: "bg-[#E72324]",
  eau: "bg-[#2481EF]",
  plante: "bg-[#3da224]",
  électrik: "bg-[#FAC100]",
  sol: "bg-[#92501B]",
  roche: "bg-[#b0aa82]",
  fée: "bg-[#EF70EF]",
  poison: "bg-[#923FCC]",
  insecte: "bg-[#92A212]",
  dragon: "bg-[#4F60E2]",
  psy: "bg-[#ef3f7a]",
  vol: "bg-[#82BAEF]",
  combat: "bg-[#FF8100]",
  normal: "bg-[#A0A2A0]",
  spectre: "bg-[#703F70]",
  glace: "bg-[#3DD9FF]",
  ténèbres: "bg-[#4F3F3D]",
  acier: "bg-[#60A2B9]",
};

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

async function getLocationForPokemon(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  for (const location of data) {
    const res = await fetch(location.location_area.url);
    const data = await res.json();

    const resLocation = await fetch(data.location.url);
    const dataLocation = await resLocation.json();

    const getLocationInFrench = await getFrenchName(dataLocation);

    location.location_area.name = getLocationInFrench.name;

    const versions = await Promise.all(
      location.version_details.map(async (version: any) => {
        const res = await fetch(version.version.url);
        const data = await res.json();
        const getFrenchVersion = await getFrenchName(data);
        version.version.name = getFrenchVersion.name;
        return version;
      })
    );

    // Replace version_details with resolved versions
    location.version_details = versions;
  }

  return data;
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

export default async function Page({ params: { id }, searchParams }: Params) {
  const pokemonData = await getPokemonData(id);
  const informationsPokemon = await getInformationsForPokemon(pokemonData.id);

  const typeFrench = await getFrenchFirstType(pokemonData.types[0].type.url);

  const evolvePokemon = await getEvolutionOfPokemon(
    informationsPokemon.evolution_chain.url
  );
  const locationsPokemon = await getLocationForPokemon(
    pokemonData.location_area_encounters
  );

  const pokemonMoves = await getMovesByGeneration(
    pokemonData.moves,
    searchParams?.generation || "1"
  );

  const pokemonFrenchName = await getFrenchName(informationsPokemon);
  const sensibility = await calculateTypeEffectiveness(pokemonData.types);

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
          <div className="p-1">
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
              } font-bold rounded w-2/5 p-4`}
            >
              Nom anglais
            </p>
            <p className="capitalize  bg-white rounded w-3/5 p-4">
              {pokemonData.name}
            </p>
          </div>
          <div className="flex flex-col gap-1 w-full items-center p-1">
            <p
              className={`${
                colorTypes[
                  typeFrench.name.toLowerCase() as keyof typeof colorTypes
                ]
              } font-bold rounded w-full p-4`}
            >
              Numéros de Pokédex
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1 w-full">
              {informationsPokemon.pokedex_numbers.map((pokedexNumber: any) => (
                <div key={pokedexNumber.pokedex.name} className="h-20 w-20">
                  <div className="bg-white rounded flex flex-col items-center justify-center p-1 w-full h-full">
                    <p className="capitalize text-blue-600 text-sm text-center">
                      {pokedexNumber.pokedex.name.replace(/-/g, " ")}
                    </p>
                    <p>{pokedexNumber.entry_number}</p>
                  </div>
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
              } font-bold rounded w-2/5 p-4`}
            >
              Types
            </p>
            <div className="bg-white rounded w-3/5 flex items-center justify-center p-4">
              {pokemonData.types.map((type: any) => (
                <div key={type.type.name}>
                  <TypePokemon url={type.type.url} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* 
            <div>
              <p>Base Experience:</p>
              <p>{pokemonData.base_experience}</p>
            </div>
            <div>
              <p>Height:</p>
              <p>{pokemonData.height}</p>
            </div>
            <div>
              <p>Weight:</p>
              <p>{pokemonData.weight}</p>
            </div>
            <div>
              <p>Abilities:</p>
              {pokemonData.abilities.map((ability: any) => (
                <div key={ability.ability.name}>
                  <p>{ability.ability.name}</p>
                </div>
              ))}
            </div>
            <div>
              <p>Capture rate:</p>
              <p>{informationsPokemon.capture_rate}</p>
            </div>
            <div>
              <p>Color</p>
              <p>{informationsPokemon.color.name}</p>
            </div>
            <div>
              <p>Egg groups</p>
              {informationsPokemon.egg_groups.map((eggGroup: any) => (
                <div key={eggGroup.name}>
                  <p>{eggGroup.name}</p>
                </div>
              ))}
            </div>
            <div>
              <p>Growth rate</p>
              <p>{informationsPokemon.growth_rate.name}</p>
            </div>
            <div>
              <p>Hatch counter</p>
              <p>{informationsPokemon.hatch_counter}</p>
            </div>
            <div>
              <p>Shape</p>
              <p>{informationsPokemon.shape.name}</p>
            </div>
 */}

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
        <p>Locations</p>
        {locationsPokemon.map((location: any) => (
          <div key={location.location_area.name}>
            <p>{location.location_area.name}</p>
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
