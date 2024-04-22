import { PokemonsDashboard } from "@/components/Pokemon/PokemonsDashboard";
import { getPokemons } from "@/utils/apiCall";

export default async function Home() {
  const pokemons = await getPokemons({ limit: 151, offset: 0 });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-10">
      <PokemonsDashboard pokemons={pokemons} />
    </div>
  );
}
