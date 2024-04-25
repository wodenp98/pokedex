/* eslint-disable react/no-unescaped-entities */
import { EvolutionsProps, EvolutionsType } from "@/utils/type";
import Link from "next/link";
import Image from "next/image";
import { getPokemonData } from "@/utils/apiCall";

const EvolutionDetails = async ({
  evolutions,
}: {
  evolutions: EvolutionsProps[];
}) => {
  const pokemons = await Promise.all(
    evolutions.map(async (evolution) => {
      const data = await getPokemonData(evolution.pokedex_id);

      return {
        ...data,
        evolution: evolution,
      };
    })
  );

  return (
    <>
      {pokemons.length > 5 ? (
        <div className="flex flex-col w-[350px] items-stretch gap-1">
          {pokemons.map((pokemon) => (
            <Link href={`/pokemon/${pokemon.pokedex_id}`} key={pokemon.name.fr}>
              <div className="w-full h-full rounded-b-lg overflow-hidden bg-white flex items-center justify-center flex-col">
                <Image
                  src={pokemon.sprites.regular}
                  alt={pokemon.name.fr}
                  width={200}
                  height={200}
                />
                <h1 className="text-lg font-bold text-center">
                  {pokemon.name.fr}
                </h1>
                <p className="text-center p-2 w-11/12 text-sm">
                  {pokemon.evolution.condition}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex items-stretch gap-1">
          {pokemons.map((pokemon) => (
            <Link href={`/pokemon/${pokemon.pokedex_id}`} key={pokemon.name.fr}>
              <div className="w-full h-full rounded-b-lg overflow-hidden bg-white flex items-center justify-center flex-col">
                <Image
                  src={pokemon.sprites.regular}
                  alt={pokemon.name.fr}
                  width={200}
                  height={200}
                />
                <h1 className="text-lg font-bold text-center">
                  {pokemon.name.fr}
                </h1>
                <p className="text-center p-2 w-11/12 text-sm">
                  {pokemon.evolution.condition}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export const EvolutionComponent = ({
  evolutionData,
}: {
  evolutionData: EvolutionsType;
}) => {
  return (
    <div className="flex gap-1">
      {evolutionData?.pre && evolutionData?.pre.length > 0 && (
        <div>
          <EvolutionDetails evolutions={evolutionData.pre} />
        </div>
      )}

      {evolutionData?.next && evolutionData?.next.length > 0 && (
        <div>
          <EvolutionDetails evolutions={evolutionData.next} />
        </div>
      )}
      {evolutionData === null && (
        <div className="w-full h-full rounded-b-lg overflow-hidden bg-white flex items-center justify-center flex-col">
          <h1 className="text-lg font-bold text-center p-4">Pas d'évolution</h1>
        </div>
      )}
    </div>
  );
};
