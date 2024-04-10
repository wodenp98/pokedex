import { machine } from "os";

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
  const getSecondType =
    pokemonTypes.length > 1
      ? await getFrenchSecondType(pokemonTypes[1].type.url)
      : "";

  let type1 = getFirstType.name.toLowerCase();
  let type2 = getSecondType ? getSecondType.name.toLowerCase() : "";

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

export const getEnglishName = async (data: any) => {
  const name = data.names.find((name: any) => name.language.name === "en");

  return name;
};

const versionToGeneration = {
  "red-blue": "1",
  yellow: "1",
  "gold-silver": "2",
  crystal: "2",
  "ruby-sapphire": "3",
  emerald: "3",
  "firered-leafgreen": "3",
  "diamond-pearl": "4",
  platinum: "4",
  "heartgold-soulsilver": "4",
  "black-white": "5",
  "black-2-white-2": "5",
  "x-y": "6",
  "omega-ruby-alpha-sapphire": "6",
  "sun-moon": "7",
  "ultra-sun-ultra-moon": "7",
  "sword-shield": "8",
  "brilliant-diamond-and-shining-pearl": "8",
  "legend-arceus": "8",
  "scarlet-violet": "9",
};

interface VersionGroupDetail {
  version_group: {
    name: string;
    url: string;
  };
  move_learn_method: {
    name: string;
    url: string;
  };
  level_learned_at: number;
}

interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: VersionGroupDetail[];
  data: any;
}

export async function getMovesByGeneration(moves: Move[], generation: string) {
  const versionsCorrespondantes = [] as string[];

  Object.keys(versionToGeneration).forEach((version) => {
    if (
      versionToGeneration[version as keyof typeof versionToGeneration] ===
      generation
    ) {
      versionsCorrespondantes.push(version);
    }
  });

  const selectedMoves = moves.map((move) => {
    const selectedDetails = move.version_group_details.filter((detail) => {
      return versionsCorrespondantes.includes(detail.version_group.name);
    });
    return { ...move, version_group_details: selectedDetails };
  });
  const filteredMoves = selectedMoves.filter(
    (move) => move.version_group_details.length > 0
  );

  for (let move of filteredMoves) {
    const moveRes = await fetch(move.move.url);
    const data = await moveRes.json();
    const nameFrench = await getFrenchName(data);

    const filteredMachines = data.machines.filter((machine: any) => {
      return versionsCorrespondantes.includes(machine.version_group.name);
    });

    const moveLevelLearnedAt: VersionGroupDetail[] = move.version_group_details
      .filter(
        (item: VersionGroupDetail, index: number, self: VersionGroupDetail[]) =>
          index ===
          self.findIndex(
            (t: VersionGroupDetail) =>
              t.level_learned_at === item.level_learned_at
          )
      )
      .filter((detail) => detail.level_learned_at > 0);

    const nameInEnglish = await getEnglishName(data);

    move.version_group_details = moveLevelLearnedAt;

    move.move.name =
      nameFrench === undefined ? nameInEnglish.name : nameFrench.name;
    move.data = {
      ...data,
      machines: filteredMachines,
    };

    if (move.data.machines.length > 0) {
      await Promise.all(
        move.data.machines.map(async (machine: any) => {
          const machineRes = await fetch(machine.machine.url);
          const machineData = await machineRes.json();
          const item = await fetch(machineData.item.url);
          const itemData = await item.json();
          const itemFrenchName = await getFrenchName(itemData);

          move.data.machines.name = itemFrenchName.name;
        })
      );
    }
  }

  return filteredMoves;
}

export const colorTypes = {
  feu: "bg-[#E72324]",
  eau: "bg-[#2481EF]",
  plante: "bg-[#3da224]",
  électrik: "bg-[#FAC100]",
  sol: "bg-[#92501B]",
  roche: "bg-[#b0aa82]",
  fée: "bg-[#EF70EF]",
  poison: "bg-[#923FCC]",
  insecte: "bg-[#92A212]",
  dragon: "bg-[#4F60E2]",
  psy: "bg-[#ef3f7a]",
  vol: "bg-[#82BAEF]",
  combat: "bg-[#FF8100]",
  normal: "bg-[#A0A2A0]",
  spectre: "bg-[#703F70]",
  glace: "bg-[#3DD9FF]",
  ténèbres: "bg-[#4F3F3D]",
  acier: "bg-[#60A2B9]",
};

export const backgroundColorTypes = {
  feu: "bg-[#FDDCD5]",
  eau: "bg-[#D7EBFF]",
  plante: "bg-[#E4F5DC]",
  électrik: "bg-[#FFF3D5]",
  sol: "bg-[#F6F0DE]",
  roche: "bg-[#F1EDDE]",
  fée: "bg-[#F8EAF9]",
  poison: "bg-[#F0DEED]",
  insecte: "bg-[#EEF1D2]",
  dragon: "bg-[#E7DDFD]",
  psy: "bg-[#FFE3ED]",
  vol: "bg-[#EBEEFD]",
  combat: "bg-[#FFEDDD]",
  normal: "bg-[#EEEDE9]",
  spectre: "bg-[#F7E1F7]",
  glace: "bg-[#DEF5FA]",
  ténèbres: "bg-[#E3DEDA]",
  acier: "bg-[#EEEEF3]",
};
