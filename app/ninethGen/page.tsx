import { getPokemons } from "@/utils/helpers";
import { PokemonsDashboard } from "@/components/Pokemons/PokemonsDashboard";

export default async function NinethGen() {
  const pokemons = await getPokemons({ limit: 120, offset: 905 });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <PokemonsDashboard pokemons={pokemons} />
    </div>
  );
}
