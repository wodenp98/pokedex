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

  const pokemonFrenchNames = await Promise.all(
    pokemonDetails.map(async (pokemon: any) => {
      const pokemonRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`
      );
      const data = await pokemonRes.json();

      const name = data.names.find((name: any) => name.language.name === "fr");

      return name;
    })
  );

  const pokemonsWithDetails = data.results.map(
    (pokemon: any, index: number) => {
      return {
        ...pokemon,
        name: pokemonFrenchNames[index].name,
        details: pokemonDetails[index],
      };
    }
  );

  return pokemonsWithDetails;
}

export const colorTypes = {
  feu: "bg-red-500",
  eau: "bg-blue-500",
  plante: "bg-green-500",
  électrik: "bg-yellow-500",
  sol: "bg-yellow-950",
  roche: "bg-gray-500",
  fée: "bg-pink-500",
  poison: "bg-purple-500",
  insecte: "bg-green-500",
  dragon: "bg-purple-500",
  psy: "bg-pink-500",
  vol: "bg-blue-500",
  combat: "bg-red-500",
  normal: "bg-gray-500",
  spectre: "bg-purple-500",
  glace: "bg-blue-500",
  ténèbres: "bg-slate-950",
  acier: "bg-gray-500",
};

export const typeChart = [
  {
    name: "normal",
    immunes: ["ghost"],
    weaknesses: ["rock", "steel"],
    strengths: [],
  },
  {
    name: "fire",
    immunes: [],
    weaknesses: ["fire", "water", "rock", "dragon"],
    strengths: ["grass", "ice", "bug", "steel"],
  },
  {
    name: "water",
    immunes: [],
    weaknesses: ["water", "grass", "dragon"],
    strengths: ["fire", "ground", "rock"],
  },
  {
    name: "electric",
    immunes: ["ground"],
    weaknesses: ["electric", "grass", "dragon"],
    strengths: ["water", "flying"],
  },
  {
    name: "grass",
    immunes: [],
    weaknesses: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"],
    strengths: ["water", "ground", "rock"],
  },
  {
    name: "ice",
    immunes: [],
    weaknesses: ["fire", "water", "ice", "steel"],
    strengths: ["grass", "ground", "flying", "dragon"],
  },
  {
    name: "fighting",
    immunes: ["ghost"],
    weaknesses: ["poison", "flying", "psychic", "bug", "fairy"],
    strengths: ["normal", "ice", "rock", "dark", "steel"],
  },
  {
    name: "poison",
    immunes: ["steel"],
    weaknesses: ["poison", "ground", "rock", "ghost"],
    strengths: ["grass", "fairy"],
  },
  {
    name: "ground",
    immunes: ["flying"],
    weaknesses: ["grass", "bug"],
    strengths: ["fire", "electric", "poison", "rock", "steel"],
  },
  {
    name: "flying",
    immunes: [],
    weaknesses: ["electric", "rock", "steel"],
    strengths: ["grass", "fighting", "bug"],
  },
  {
    name: "psychic",
    immunes: ["dark"],
    weaknesses: ["psychic", "steel"],
    strengths: ["fighting", "poison"],
  },
  {
    name: "bug",
    immunes: [],
    weaknesses: [
      "fire",
      "fighting",
      "poison",
      "flying",
      "ghost",
      "steel",
      "fairy",
    ],
    strengths: ["grass", "psychic", "dark"],
  },
  {
    name: "rock",
    immunes: [],
    weaknesses: ["fighting", "ground", "steel"],
    strengths: ["fire", "ice", "flying", "bug"],
  },
  {
    name: "ghost",
    immunes: ["normal"],
    weaknesses: ["dark"],
    strengths: ["psychic", "ghost"],
  },
  {
    name: "dragon",
    immunes: ["fairy"],
    weaknesses: ["steel"],
    strengths: ["dragon"],
  },
  {
    name: "dark",
    immunes: [],
    weaknesses: ["fighting", "dark", "fairy"],
    strengths: ["psychic", "ghost"],
  },
  {
    name: "steel",
    immunes: [],
    weaknesses: ["fire", "water", "electric", "steel"],
    strengths: ["ice", "rock", "fairy"],
  },
  {
    name: "fairy",
    immunes: [],
    weaknesses: ["fire", "poison", "steel"],
    strengths: ["fighting", "dragon", "dark"],
  },
];

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface TypeDefences {
  "4x": string[];
  "2x": string[];
  "1x": string[];
  "0.5x": string[];
  "0.25x": string[];
  "0x": string[];
}

export const calculateTypeEffectiveness = (
  pokemonTypes: PokemonType[]
): TypeDefences => {
  let typeDefences: TypeDefences = {
    "4x": [],
    "2x": [],
    "1x": [],
    "0.5x": [],
    "0.25x": [],
    "0x": [],
  };

  let type1 = pokemonTypes[0].type.name;
  let type2 = pokemonTypes[1]?.type.name || "";

  for (const type of typeChart) {
    if (type["immunes"].includes(type1) || type["immunes"].includes(type2)) {
      typeDefences["0x"].push(type["name"]);
    } else if (
      type["weaknesses"].includes(type1) &&
      type["weaknesses"].includes(type2)
    ) {
      typeDefences["0.25x"].push(type["name"]);
    } else if (
      type["strengths"].includes(type1) &&
      type["strengths"].includes(type2)
    ) {
      typeDefences["4x"].push(type["name"]);
    } else if (
      (type["strengths"].includes(type1) &&
        type["weaknesses"].includes(type2)) ||
      (type["strengths"].includes(type2) && type["weaknesses"].includes(type1))
    ) {
      typeDefences["1x"].push(type["name"]);
    } else if (
      (!type["strengths"].includes(type1) &&
        type["weaknesses"].includes(type2)) ||
      (!type["strengths"].includes(type2) && type["weaknesses"].includes(type1))
    ) {
      typeDefences["0.5x"].push(type["name"]);
    } else if (
      (type["strengths"].includes(type1) &&
        !type["weaknesses"].includes(type2)) ||
      (type["strengths"].includes(type2) && !type["weaknesses"].includes(type1))
    ) {
      typeDefences["2x"].push(type["name"]);
    } else {
      typeDefences["1x"].push(type["name"]);
    }
  }

  return typeDefences;
};
