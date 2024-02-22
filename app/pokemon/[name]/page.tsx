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
  return data;
}

export default async function Page({ params: { name } }: Params) {
  console.log("params", name);
  const pokemonData = await getPokemonData(name);
  return <div>{name}</div>;
}
