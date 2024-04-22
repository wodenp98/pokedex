import { getPokemons } from "@/utils/helpers";
import { PokemonsDashboard } from "@/components/Pokemon/PokemonsDashboard";

export default async function SecondGen() {
  const pokemons = await getPokemons({ limit: 100, offset: 151 });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <PokemonsDashboard pokemons={pokemons} />
    </div>
  );
}
