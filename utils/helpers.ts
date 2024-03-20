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

      const name = await getFrenchName(data);

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

export async function getFrenchFirstType(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  const nameFrench = await getFrenchName(data);

  return nameFrench;
}

export async function getFrenchSecondType(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  const nameFrench = await getFrenchName(data);

  return nameFrench;
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
    immunes: ["spectre"],
    weaknesses: ["roche", "acier"],
    strengths: [],
  },
  {
    name: "feu",
    immunes: [],
    weaknesses: ["feu", "eau", "roche", "dragon"],
    strengths: ["plante", "glace", "insecte", "acier"],
  },
  {
    name: "eau",
    immunes: [],
    weaknesses: ["eau", "plante", "dragon"],
    strengths: ["feu", "sol", "roche"],
  },
  {
    name: "électrik",
    immunes: ["sol"],
    weaknesses: ["électrik", "plante", "dragon"],
    strengths: ["eau", "vol"],
  },
  {
    name: "plante",
    immunes: [],
    weaknesses: [
      "feu",
      "plante",
      "poison",
      "vol",
      "insecte",
      "dragon",
      "acier",
    ],
    strengths: ["eau", "sol", "roche"],
  },
  {
    name: "glace",
    immunes: [],
    weaknesses: ["feu", "eau", "glace", "acier"],
    strengths: ["plante", "sol", "vol", "dragon"],
  },
  {
    name: "combat",
    immunes: ["spectre"],
    weaknesses: ["poison", "vol", "psy", "insecte", "fée"],
    strengths: ["normal", "glace", "roche", "ténèbres", "acier"],
  },
  {
    name: "poison",
    immunes: ["acier"],
    weaknesses: ["poison", "sol", "roche", "spectre"],
    strengths: ["plante", "fée"],
  },
  {
    name: "sol",
    immunes: ["vol"],
    weaknesses: ["plante", "insecte"],
    strengths: ["feu", "électrik", "poison", "roche", "acier"],
  },
  {
    name: "vol",
    immunes: [],
    weaknesses: ["électrik", "roche", "acier"],
    strengths: ["plante", "combat", "insecte"],
  },
  {
    name: "psy",
    immunes: ["ténèbres"],
    weaknesses: ["psy", "acier"],
    strengths: ["combat", "poison"],
  },
  {
    name: "insecte",
    immunes: [],
    weaknesses: ["feu", "combat", "poison", "vol", "spectre", "acier", "fée"],
    strengths: ["plante", "psy", "ténèbres"],
  },
  {
    name: "roche",
    immunes: [],
    weaknesses: ["combat", "sol", "acier"],
    strengths: ["feu", "glace", "vol", "insecte"],
  },
  {
    name: "spectre",
    immunes: ["normal"],
    weaknesses: ["ténèbres"],
    strengths: ["psy", "spectre"],
  },
  {
    name: "dragon",
    immunes: ["fée"],
    weaknesses: ["acier"],
    strengths: ["dragon"],
  },
  {
    name: "ténèbres",
    immunes: [],
    weaknesses: ["combat", "ténèbres", "fée"],
    strengths: ["psy", "spectre"],
  },
  {
    name: "acier",
    immunes: [],
    weaknesses: ["feu", "eau", "électrik", "acier"],
    strengths: ["glace", "roche", "fée"],
  },
  {
    name: "fée",
    immunes: [],
    weaknesses: ["feu", "poison", "acier"],
    strengths: ["combat", "dragon", "ténèbres"],
  },
];

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export const calculateTypeEffectiveness = async (
  pokemonTypes: PokemonType[]
) => {
  let typeDefences: Array<{ type: string; effectiveness: string }> = [];

  const getFirstType = await getFrenchFirstType(pokemonTypes[0].type.url);
  const getSecondType = await getFrenchFirstType(pokemonTypes[1].type.url);

  let type1 = getFirstType.name.toLowerCase();
  let type2 = getSecondType.name.toLowerCase() || "";

  for (const type of typeChart) {
    let effectiveness = "";

    if (type["immunes"].includes(type1) || type["immunes"].includes(type2)) {
      effectiveness = "0x";
    } else if (
      type["weaknesses"].includes(type1) &&
      type["weaknesses"].includes(type2)
    ) {
      effectiveness = "0.25x";
    } else if (
      type["strengths"].includes(type1) &&
      type["strengths"].includes(type2)
    ) {
      effectiveness = "4x";
    } else if (
      (type["strengths"].includes(type1) &&
        type["weaknesses"].includes(type2)) ||
      (type["strengths"].includes(type2) && type["weaknesses"].includes(type1))
    ) {
      effectiveness = "1x";
    } else if (
      (!type["strengths"].includes(type1) &&
        type["weaknesses"].includes(type2)) ||
      (!type["strengths"].includes(type2) && type["weaknesses"].includes(type1))
    ) {
      effectiveness = "0.5x";
    } else if (
      (type["strengths"].includes(type1) &&
        !type["weaknesses"].includes(type2)) ||
      (type["strengths"].includes(type2) && !type["weaknesses"].includes(type1))
    ) {
      effectiveness = "2x";
    } else {
      effectiveness = "1x";
    }

    typeDefences.push({ type: type["name"], effectiveness });
  }

  return typeDefences;
};

export const getFrenchName = async (data: any) => {
  const name = data.names.find((name: any) => name.language.name === "fr");
  return name;
};
