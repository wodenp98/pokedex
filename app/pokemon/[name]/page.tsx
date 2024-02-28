import React from "react";
import Image from "next/image";

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

async function getEvolutionOfPokemon(url: string) {
  const res = await fetch(`${url}`);
  const data = await res.json(); // Create a function to fetch the pokemon details (including image)

  const evolutionChain = [];
  let currentStage = data.chain;

  while (currentStage) {
    const pokemon = await getPokemonData(currentStage.species.name);

    evolutionChain.push({
      name: pokemon.name,
      image: pokemon.sprites.other["official-artwork"].front_default,
      evolves: currentStage.evolves_to[0]?.evolution_details[0],
    });
    currentStage = currentStage.evolves_to[0];
  }

  return evolutionChain;
}

export default async function Page({ params: { name } }: Params) {
  const pokemonData = await getPokemonData(name);
  const informationsPokemon = await getInformationsForPokemon(pokemonData.id);
  const evolvePokemon = await getEvolutionOfPokemon(
    informationsPokemon.evolution_chain.url
  );

  return (
    <div>
      <p>{name}</p>
      <div>
        {evolvePokemon.map((pokemon) => (
          <div key={pokemon.name}>
            <p>{pokemon.name}</p>
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={200}
              height={200}
            />
            <p>{pokemon.evolves?.min_level ?? ""}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
