import { getPokemons } from "@/utils/apiCall";
import { PokemonsDashboard } from "@/components/Pokemon/PokemonsDashboard";

export default async function EighthGen() {
  const pokemons = await getPokemons({ limit: 89, offset: 809 });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <PokemonsDashboard pokemons={pokemons} />
    </div>
  );
}
