import { PokemonsDashboard } from "@/components/Pokemons/PokemonsDashboard";
import { getPokemons } from "@/utils/helpers";

export default async function Home() {
  const pokemons = await getPokemons({ limit: 151, offset: 0 });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-10">
      <PokemonsDashboard pokemons={pokemons} />
    </div>
  );
}
