import { getPokemons } from "@/utils/helpers";
import { PokemonsDashboard } from "@/components/Pokemon/PokemonsDashboard";

export default async function FourthGen() {
  const pokemons = await getPokemons({ limit: 107, offset: 386 });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <PokemonsDashboard pokemons={pokemons} />
    </div>
  );
}
