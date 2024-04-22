import Link from "next/link";
import Image from "next/image";
import React from "react";
import { TypePokemon } from "../TypePokemon/TypePokemon";
import { Card, CardContent } from "../ui/card";

export const PokemonsDashboard = ({ pokemons }: { pokemons: any }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pokemons.map((pokemon: any) => (
        <Card key={pokemon.name} className="w-80 flex justify-center">
          <CardContent>
            <Link href={`/pokemon/${pokemon.details.id}`}>
              <div className="w-full rounded-lg overflow-hidden">
                <Image
                  src={
                    pokemon.details.sprites.other?.["official-artwork"]
                      ?.front_default ?? pokemon.details.sprites.front_default
                  }
                  alt={pokemon.name}
                  width={200}
                  height={200}
                />
              </div>
              <h1 className="text-xl font-bold text-center">{pokemon.name}</h1>
              <div className="flex justify-center gap-2">
                {pokemon.details.types.map((type: any) => (
                  <div key={type.type.name}>
                    <TypePokemon url={type.type.url} />
                  </div>
                ))}
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
