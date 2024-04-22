import { getPokemons } from "@/utils/apiCall";
import { PokemonsDashboard } from "@/components/Pokemon/PokemonsDashboard";

export default async function ThirdGen() {
  const pokemons = await getPokemons({ limit: 135, offset: 251 });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <PokemonsDashboard pokemons={pokemons} />
    </div>
  );
}
