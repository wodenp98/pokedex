import { getPokemons } from "@/utils/helpers";
import { PokemonsDashboard } from "@/components/Pokemons/PokemonsDashboard";

export default async function SeventhGen() {
  const pokemons = await getPokemons({ limit: 88, offset: 721 });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <PokemonsDashboard pokemons={pokemons} />
    </div>
  );
}
