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
import { colorTypes } from "@/utils/helpers";
import { CardType } from "@/components/TypePokemon/CardType";

interface Params {
  params: {
    name: string;
  };
  searchParams?: Record<string, string>;
}

async function getPokemonData(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
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

    const dataEvee = await getPokemonData(currentStage.species.name);

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

    while (currentStage) {
      const pokemon = await getPokemonData(currentStage.species.name);

      evolutionChain.push({
        ...pokemon,
        evolves: currentStage.evolution_details[0],
      });

      currentStage = currentStage.evolves_to[0];
    }
  }

  return evolutionChain;
}

async function getSensibilityType(types: any) {
  const urls = types.map((type: any) => type.type.url);

  const damageRelations = [];

  for (const url of urls) {
    const res = await fetch(url);
    const data = await res.json();

    damageRelations.push(data.damage_relations);
  }

  {
    /* si un élément se répète = fois 2
si no damage from ca fait direct 0
et est ce possible de faire un objet avec unity 0

*/
  }

  for (const damageRelation of damageRelations) {
    console.log("❤️", damageRelation);
  }

  return damageRelations;
}

// type sensibilité, stats, CT/CS, evolution details, loc?

export default async function Page({ params: { name } }: Params) {
  const pokemonData = await getPokemonData(name);
  const informationsPokemon = await getInformationsForPokemon(pokemonData.id);
  const evolvePokemon = await getEvolutionOfPokemon(
    informationsPokemon.evolution_chain.url
  );
  const locationsPokemon = await getLocationForPokemon(
    pokemonData.location_area_encounters
  );
  const sensibilityType = await getSensibilityType(pokemonData.types);

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Card>
        <CardHeader>
          <CardTitle>
            {pokemonData.types.length > 1 ? (
              <CardType
                typeId={pokemonData.types[0].type.name}
                typeName={pokemonData.types[1].type.name}
                name={name}
                id={pokemonData.id}
              />
            ) : (
              <CardType
                typeId={pokemonData.types[0].type.name}
                typeName={pokemonData.types[0].type.name}
                name={name}
                id={pokemonData.id}
              />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={pokemonData.sprites.other?.["official-artwork"]?.front_default}
            alt={name}
            width={200}
            height={200}
          />
          <div className="flex">
            <p>Type:</p>
            {pokemonData.types.map((type: any) => (
              <div key={type.type.name}>
                <TypePokemon type={type.type.name} />
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
