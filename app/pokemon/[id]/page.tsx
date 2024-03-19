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
  colorTypes,
  typeChart,
} from "@/utils/helpers";
import { CardType } from "@/components/TypePokemon/CardType";

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

async function getLocationForPokemon(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function getEvolutionOfPokemon(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  const evolutionChain = [];

  if (data.id === 67) {
    let currentStage = data.chain;
    const pokemonId = currentStage.species.url.split("/");
    const id = pokemonId[pokemonId.length - 2];

    const dataEvee = await getPokemonData(id);

    evolutionChain.push(dataEvee);

    for (let i = 0; i < currentStage.evolves_to.length; i++) {
      const pokemon = await getPokemonData(
        currentStage.evolves_to[i].species.name
      );

      evolutionChain.push({
        ...pokemon,
        evolves: currentStage.evolves_to[i].evolution_details,
      });
    }
  } else {
    let currentStage = data.chain;
    const pokemonId = currentStage.species.url.split("/");
    const id = pokemonId[pokemonId.length - 2];

    while (currentStage) {
      const pokemon = await getPokemonData(id);

      evolutionChain.push({
        ...pokemon,
        evolves: currentStage.evolution_details[0],
      });

      currentStage = currentStage.evolves_to[0];
    }
  }

  return evolutionChain;
}

// CT/CS

export default async function Page({ params: { id } }: Params) {
  const pokemonData = await getPokemonData(id);
  const informationsPokemon = await getInformationsForPokemon(pokemonData.id);
  const evolvePokemon = await getEvolutionOfPokemon(
    informationsPokemon.evolution_chain.url
  );
  const locationsPokemon = await getLocationForPokemon(
    pokemonData.location_area_encounters
  );

  const pokemonFrenchName = informationsPokemon.names.find(
    (name: any) => name.language.name === "fr"
  );

  const sensibility = calculateTypeEffectiveness(pokemonData.types);

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Card>
        <CardHeader>
          <CardTitle>
            {pokemonData.types.length > 1 ? (
              <CardType
                firstTypeUrl={pokemonData.types[0].type.url}
                secondTypeUrl={pokemonData.types[1].type.url}
                name={pokemonFrenchName.name}
                id={pokemonData.id}
              />
            ) : (
              <CardType
                typeUrl={pokemonData.types[0].type.url}
                secondTypeUrl={pokemonData.types[0].type.url}
                name={pokemonFrenchName.name}
                id={pokemonData.id}
              />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={pokemonData.sprites.other?.["official-artwork"]?.front_default}
            alt={pokemonData.name}
            width={200}
            height={200}
          />
          <div className="flex">
            <p>Type:</p>
            {pokemonData.types.map((type: any) => (
              <div key={type.type.name}>
                <TypePokemon url={type.type.url} />
              </div>
            ))}
          </div>
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
          <div>
            <p>Pokedex number</p>
            {informationsPokemon.pokedex_numbers.map((pokedexNumber: any) => (
              <div key={pokedexNumber.entry_number}>
                <p>{pokedexNumber.entry_number}</p>
                <p>{pokedexNumber.pokedex.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <p>Stats</p>
        {pokemonData.stats.map((stat: any) => (
          <div key={stat.stat.name}>
            <p>{stat.stat.name}</p>
            <p>{stat.base_stat}</p>
          </div>
        ))}
      </div>
      <div>
        <p>Moves</p>
        {pokemonData.moves.map((move: any) => (
          <div key={move.move.name}>
            <p>{move.move.name}</p>
          </div>
        ))}
      </div>

      <div>
        <p>Locations</p>
        {locationsPokemon.map((location: any) => (
          <div key={location.location_area.name}>
            <p>{location.location_area.name}</p>
          </div>
        ))}
      </div>

      <div>
        <p>Sensibility</p>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        {evolvePokemon.map((pokemon) => (
          <Card key={pokemon.name} className="w-44 flex justify-center">
            <CardContent>
              <Link href={`/pokemon/${pokemon.name}`}>
                <div className="w-full rounded-lg overflow-hidden">
                  <Image
                    src={
                      pokemon.sprites.other?.["official-artwork"]?.front_default
                    }
                    alt={pokemon.name}
                    width={200}
                    height={200}
                  />
                </div>
                <h1 className="text-lg  font-bold text-center">
                  {pokemon.name}
                </h1>
                <p>{pokemon.evolves?.min_level ?? ""}</p>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
