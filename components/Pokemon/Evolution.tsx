import {
  getPokemonData,
  getInformationsForPokemon,
  evolveMethodForPokemon,
  getGenerationForPokemon,
} from "@/utils/apiCall";
import { getFrenchName } from "@/utils/helpers";
import Link from "next/link";
import Image from "next/image";

export const EvolutionEntry = async ({ evolution }: { evolution: any }) => {
  const url = evolution.species.url;
  const splitUrl = url.split("/")[6];

  const pokemonData = await getPokemonData(splitUrl);
  const informationPokemon = await getInformationsForPokemon(splitUrl);
  const pokemonFrenchName = await getFrenchName(informationPokemon);

  const evolveMethods = await Promise.all(
    evolution.evolution_details.map(async (detail: any) => {
      const method = await evolveMethodForPokemon(detail);
      return (
        <div className="py-1 rounded-md bg-white" key={method}>
          <p className="bg-white text-xs text-center p-1">{method}</p>
        </div>
      );
    })
  );

  return (
    <div className="flex flex-col gap-1">
      <>{evolveMethods}</>
      <Link href={`/pokemon/${informationPokemon.id}`}>
        <div className="w-full rounded-lg overflow-hidden bg-white flex items-center justify-center flex-col">
          <Image
            src={pokemonData.sprites.other?.["official-artwork"]?.front_default}
            alt={pokemonFrenchName.name}
            width={200}
            height={200}
          />
          <h1 className="text-lg font-bold text-center">
            {pokemonFrenchName.name}
          </h1>
        </div>
      </Link>
      {evolution.evolves_to.length > 1 ? (
        <div key={evolution.species.name} className="flex gap-1">
          {evolution.evolves_to.map((nextEvolution: any, index: number) => (
            <EvolutionEntry key={index} evolution={nextEvolution} />
          ))}
        </div>
      ) : (
        <div key={evolution.species.name}>
          {evolution.evolves_to.map((nextEvolution: any, index: number) => (
            <EvolutionEntry key={index} evolution={nextEvolution} />
          ))}
        </div>
      )}
    </div>
  );
};

export const EvolutionEeveeEntry = async ({
  evolution,
}: {
  evolution: any;
}) => {
  const url = evolution.species.url;
  const splitUrl = url.split("/")[6];

  const pokemonData = await getPokemonData(splitUrl);
  const informationPokemon = await getInformationsForPokemon(splitUrl);
  const pokemonFrenchName = await getFrenchName(informationPokemon);

  const evolveMethods = await Promise.all(
    evolution.evolution_details.map(async (detail: any) => {
      const method = await evolveMethodForPokemon(detail);
      return (
        <div
          className="py-1 w-1/3 flex items-center justify-center rounded-md bg-white"
          key={method}
        >
          <p className="bg-white text-xs text-center p-1">{method}</p>
        </div>
      );
    })
  );

  return (
    <div className="flex gap-1">
      <>{evolveMethods}</>
      <Link href={`/pokemon/${informationPokemon.id}`} className="w-full">
        <div className="w-full h-full rounded-lg overflow-hidden bg-white flex items-center justify-center flex-col">
          <Image
            src={pokemonData.sprites.other?.["official-artwork"]?.front_default}
            alt={pokemonFrenchName.name}
            width={100}
            height={100}
          />
          <h1 className="text-lg font-bold text-center">
            {pokemonFrenchName.name}
          </h1>
        </div>
      </Link>

      <div key={evolution.species.name} className="flex flex-col gap-1">
        {evolution.evolves_to.map((nextEvolution: any, index: number) => (
          <EvolutionEeveeEntry key={index} evolution={nextEvolution} />
        ))}
      </div>
    </div>
  );
};
