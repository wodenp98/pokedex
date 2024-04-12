import { getPokemons } from "@/utils/helpers";
import { PokemonsDashboard } from "@/components/Pokemons/PokemonsDashboard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function Home() {
  const pokemons = await getPokemons({ limit: 151, offset: 0 });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
        </form>
      </div>
      <PokemonsDashboard pokemons={pokemons} />
    </div>
  );
}
