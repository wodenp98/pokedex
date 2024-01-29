import { Button } from "@/components/button";

async function getPokemons() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
  const data = await res.json();
  return data.results;
}

export default async function Home() {
  const pokemons = await getPokemons();

  return (
    <main>
      <Button>Test</Button>
      {pokemons.map((pokemon: any) => (
        <div key={pokemon.name}>
          <h1>{pokemon.name}</h1>
        </div>
      ))}
    </main>
  );
}
