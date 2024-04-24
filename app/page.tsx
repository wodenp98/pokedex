import { SearchBar } from "@/components/Layout/SearchBar";
import { PokemonsDashboard } from "@/components/Pokemon/PokemonsDashboard";
import { getAllPokemons } from "@/utils/apiCall";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";
  const pokemons = await getAllPokemons();

  const filteredPokemons = pokemons.filter((pokemon: any) =>
    pokemon.name.fr.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center pb-10">
      <SearchBar />
      <Suspense fallback={<div>Loading...</div>}>
        <PokemonsDashboard pokemons={filteredPokemons} />
      </Suspense>
    </div>
  );
}
