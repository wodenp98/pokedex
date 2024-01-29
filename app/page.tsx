import Image from "next/image";
import { css } from "../styled-system/css";

async function getPokemons() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
  const data = await res.json();
  return data.results;
}

export default async function Home() {
  const pokemons = await getPokemons();

  return (
    <main>
      <div
        className={css({
          fontSize: "2xl",
          fontWeight: "bold",
          bgGradient: "to-r",
          gradientFrom: "red.200",
          gradientTo: "blue.200",
        })}
      >
        Hello 🐼!
      </div>
      {pokemons.map((pokemon: any) => (
        <div key={pokemon.name}>
          <h1>{pokemon.name}</h1>
        </div>
      ))}
    </main>
  );
}
