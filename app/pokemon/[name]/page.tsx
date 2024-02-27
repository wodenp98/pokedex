import React from "react";

interface Params {
  params: {
    name: string;
  };
  searchParams?: Record<string, string>;
}

async function getPokemonData(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await res.json();

  console.log("👍", data);
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

  console.log("👍", evolvePokemon);

  return <div>{name}</div>;
}
