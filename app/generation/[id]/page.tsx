import { SearchBar } from "@/components/Layout/SearchBar";
import { PokemonsDashboard } from "@/components/Pokemon/PokemonsDashboard";
import { getPokemonsByGeneration } from "@/utils/apiCall";
import { Suspense } from "react";

interface Params {
  params: {
    id: number;
  };
  searchParams?: {
    query?: string;
  };
}

export default async function Home({ params: { id }, searchParams }: Params) {
  const query = searchParams?.query || "";
  const pokemons = await getPokemonsByGeneration(id);

  const filteredPokemons = pokemons.filter((pokemon) =>
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
