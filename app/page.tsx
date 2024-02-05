import { css } from "../styled-system/css";
import { Button } from "~/components/ui/button";

async function getPokemons() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
  const data = await res.json();
  return data.results;
}
async function getOnePokemon(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await res.json();
  return data;
}

export default async function Home() {
  const pokemons = await getPokemons();
  const pokemon = await getOnePokemon("bulbasaur");
  console.log(pokemon.sprites.other["official-artwork"].front_default);

  return (
    <main>
      <Button>oui</Button>
      <div className={css({ mt: "4", fontSize: "xl", fontWeight: "semibold" })}>
        John Doe
      </div>
      {/* {pokemons.map((pokemon: any) => (
        <div key={pokemon.name}>
          <h1>{pokemon.name}</h1>
        </div>
      ))} */}
    </main>
  );
}
