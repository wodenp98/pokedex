import { getFrenchName } from "./helpers";
import {
  PokemonType,
  PokemonStats,
  StatsArray,
  DataLanguage,
  Moves,
} from "./type";

export async function getAllPokemons(): Promise<PokemonType[]> {
  const res = await fetch("https://tyradex.vercel.app/api/v1/pokemon", {
    cache: "no-store",
  });
  const data: PokemonType[] = await res.json();

  const allPokemonsExceptFirst = data.slice(1);

  return allPokemonsExceptFirst;
}

export async function getPokemonsByGeneration(
  id: number
): Promise<PokemonType[]> {
  const res = await fetch(`https://tyradex.vercel.app/api/v1/gen/${id}`);

  const data: PokemonType[] = await res.json();

  return data;
}

export async function getPokemonData(id: number): Promise<PokemonType> {
  const res = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${id}`);
  const data: PokemonType = await res.json();
  return data;
}

export async function getPokemonMoves(id: number): Promise<Moves> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data: Moves = await res.json();
  return data;
}

export async function getInformationsForPokemon(id: number): Promise<any> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  const data = await res.json();

  return data;
}

export async function getStatsForPokemon({
  pokemonId,
  pokemonStats,
}: {
  pokemonId: number;
  pokemonStats: PokemonStats;
}): Promise<StatsArray[]> {
  const statMap = {
    hp: "Hp",
    atk: "Attaque",
    def: "Défense",
    spe_atk: "Attaque Spéciale",
    spe_def: "Défense Spéciale",
    vit: "vitesse",
  };
  let statsArray: StatsArray[] = [];

  for (let key in pokemonStats) {
    if (pokemonStats.hasOwnProperty(key)) {
      statsArray.push({
        base_stat: pokemonStats[key as keyof PokemonStats],
        name: statMap[key as keyof typeof statMap],
      });
    }
  }

  for (let i = 0; i < statsArray.length; i++) {
    const isHP = i === 0;

    if (pokemonId === 292 && isHP) {
      statsArray[i].maxStat = 1;
      statsArray[i].minStat = 1;
    } else {
      const base = 2 * statsArray[i].base_stat;
      const addedValue = isHP ? 100 + 10 : 5;
      const multiplier = isHP ? 1 : 0.9;

      statsArray[i].maxStat = Math.floor(
        Math.floor(((base + 31 + 63) * 100) / 100 + addedValue) *
          (isHP ? 1 : 1.1)
      );
      statsArray[i].minStat = Math.floor(
        Math.floor((base * 100) / 100 + addedValue) * multiplier
      );
    }
  }

  return statsArray;
}

export async function getFrenchFirstType(
  url: string
): Promise<DataLanguage | null> {
  const res = await fetch(url);
  const data = await res.json();

  const nameFrench = await getFrenchName(data.names);

  return nameFrench;
}
