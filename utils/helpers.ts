import { getFrenchFirstType } from "./apiCall";

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

export function getVersion(generation: string) {
  const versionsCorrespondantes = [] as string[];
  Object.keys(versionToGeneration).forEach((version) => {
    if (
      versionToGeneration[version as keyof typeof versionToGeneration] ===
      generation
    ) {
      versionsCorrespondantes.push(version);
    }
  });

  return versionsCorrespondantes;
}

export async function getMovesByGeneration(moves: Move[], generation: string) {
  const versionsCorrespondantes = getVersion(generation);

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

    const moveLevelLearnedAt: VersionGroupDetail[] =
      move.version_group_details.filter(
        (detail) => detail.level_learned_at > 0
      );

    const nameInEnglish = await getEnglishName(data);

    const typeMoveInFrench = await getFrenchFirstType(data.type.url);

    move.version_group_details = moveLevelLearnedAt;

    move.move.name =
      nameFrench === undefined ? nameInEnglish.name : nameFrench.name;
    move.data = {
      ...data,
      type: typeMoveInFrench.name,
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

export const generationNumbers: { [key: string]: string } = {
  "generation-i": "1",
  "generation-ii": "2",
  "generation-iii": "3",
  "generation-iv": "4",
  "generation-v": "5",
  "generation-vi": "6",
  "generation-vii": "7",
  "generation-viii": "8",
  "generation-ix": "9",
};

export async function getPokedexInFrench(pokedexs: any) {
  const pokedexName = await Promise.all(
    pokedexs.map(async (pokedex: any) => {
      const res = await fetch(pokedex.pokedex.url);
      const data = await res.json();

      const name = await getFrenchName(data);

      const globalName = !name ? pokedex.pokedex : name;

      return { name: globalName.name, entry_number: pokedex.entry_number };
    })
  );

  return pokedexName;
}
