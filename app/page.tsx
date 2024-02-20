import { Stack } from "~/styled-system/jsx";
import * as Card from "~/components/ui/card";
import { css } from "../styled-system/css";
import { Button } from "~/components/ui/button";
import Image from "next/image";

async function getPokemons() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
  const data = await res.json();

  // Récupérer les détails de chaque Pokémon
  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon: any) => {
      const pokemonRes = await fetch(pokemon.url);
      return await pokemonRes.json();
    })
  );

  // Ajouter les détails aux objets Pokémon
  const pokemonsWithDetails = data.results.map(
    (pokemon: any, index: number) => {
      return {
        ...pokemon,
        details: pokemonDetails[index],
      };
    }
  );

  return pokemonsWithDetails;
}

export default async function Home() {
  const pokemons = await getPokemons();

  return (
    <main>
      {pokemons.map((pokemon: any) => (
        <Card.Root width="sm" key={pokemon.name}>
          <Card.Body>
            <h1>{pokemon.name}</h1>
            <Image
              src={
                pokemon.details.sprites.other?.["official-artwork"]
                  ?.front_default ?? pokemon.details.sprites.front_default
              }
              alt={pokemon.name}
              width={200}
              height={200}
            />
          </Card.Body>
        </Card.Root>
      ))}
    </main>
  );
}
