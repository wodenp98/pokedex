import * as Card from "~/components/ui/card";
import Image from "next/image";
import { center, grid } from "~/styled-system/patterns";
import { Button } from "~/components/ui/button";
import Link from "next/link";

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
      <div className={center({ h: "full", my: "4" })}>
        <div className={grid({ gap: 4, columns: 3 })}>
          {pokemons.map((pokemon: any) => (
            <Card.Root
              width="sm"
              key={pokemon.name}
              className={center({ h: "full" })}
            >
              <Link href={`/pokemon/${pokemon.name}`}>
                <Card.Body>
                  <Image
                    src={
                      pokemon.details.sprites.other?.["official-artwork"]
                        ?.front_default ?? pokemon.details.sprites.front_default
                    }
                    alt={pokemon.name}
                    width={200}
                    height={200}
                  />
                  <h1
                    className={center({
                      my: "2",
                      fontWeight: "bold",
                      textStyle: "md",
                      textTransform: "uppercase",
                    })}
                  >
                    {pokemon.name}
                  </h1>
                </Card.Body>
              </Link>
            </Card.Root>
          ))}
        </div>
      </div>
    </main>
  );
}
