import { getPokemons } from "@/utils/apiCall";
import { PokemonsDashboard } from "@/components/Pokemon/PokemonsDashboard";

export default async function FifthGen() {
  const pokemons = await getPokemons({ limit: 156, offset: 493 });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <PokemonsDashboard pokemons={pokemons} />
    </div>
  );
}
