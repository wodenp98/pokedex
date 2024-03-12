export async function getPokemons({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await res.json();

  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon: any) => {
      const pokemonRes = await fetch(pokemon.url);
      return await pokemonRes.json();
    })
  );

  const pokemonsWithDetails = data.results.map(
    (pokemon: any, index: number) => {
      return {
        ...pokemon,
        details: pokemonDetails[index],
      };
    }
  );

  return pokemonsWithDetails;
}

export const colorTypes = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-500",
  ground: "bg-yellow-950",
  rock: "bg-gray-500",
  fairy: "bg-pink-500",
  poison: "bg-purple-500",
  bug: "bg-green-500",
  dragon: "bg-purple-500",
  psychic: "bg-pink-500",
  flying: "bg-blue-500",
  fighting: "bg-red-500",
  normal: "bg-gray-500",
  ghost: "bg-purple-500",
  ice: "bg-blue-500",
  dark: "bg-slate-950",
  steel: "bg-gray-500",
};
