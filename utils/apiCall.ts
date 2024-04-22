import { getFrenchName, getEnglishName } from "./helpers";

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

export async function getPokemonData(id: number | string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  const data = await res.json();

  return data;
}

export async function getInformationsForPokemon(id: number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  const data = await res.json();

  return data;
}

export async function getAbilitiesForPokemon(data: any) {
  const abilities = await Promise.all(
    data.map(async (ability: any) => {
      const res = await fetch(ability.ability.url);
      const data = await res.json();
      const getFrenchAbility = await getFrenchName(data);
      ability.ability.name = getFrenchAbility.name;
      return ability;
    })
  );

  return abilities;
}

export async function getEggsForPokemon(data: any) {
  const eggs = await Promise.all(
    data.map(async (egg: any) => {
      const res = await fetch(egg.url);
      const data = await res.json();
      const getFrenchEgg = await getFrenchName(data);
      egg.name = getFrenchEgg.name;
      return egg;
    })
  );
  return eggs;
}

export async function getPokemonGrowthRate(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  return data.levels[data.levels.length - 1].experience;
}

export async function getPokemonGender(gender: number) {
  let male;
  let female;

  switch (gender) {
    case 0:
      male = "100";
      female = "0";
      break;
    case 1:
      male = "87.5";
      female = "12.5";
      break;
    case 2:
      male = "75";
      female = "25";
      break;
    case 3:
      male = "62.5";
      female = "37.5";
      break;
    case 4:
      male = "50";
      female = "50";
      break;
    case 5:
      male = "37.5";
      female = "62.5";
      break;
    case 6:
      male = "25";
      female = "75";
      break;
    case 7:
      male = "12.5";
      female = "87.5";
      break;
    case 8:
      male = "0";
      female = "100";
      break;
    default:
      male = "0";
      female = "0";
  }

  return { male, female };
}

export async function getStatsForPokemon({
  pokemonId,
  pokemonStats,
}: {
  pokemonId: number;
  pokemonStats: any;
}) {
  for (let i = 0; i < pokemonStats.length; i++) {
    const isHP = i === 0;
    const statName = await fetch(pokemonStats[i].stat.url);
    const data = await statName.json();
    const statNameInFrench = await getFrenchName(data);

    pokemonStats[i].stat.frenchName = statNameInFrench.name;

    if (pokemonId === 292 && isHP) {
      pokemonStats[i].maxStat = 1;
      pokemonStats[i].minStat = 1;
    } else {
      const base = 2 * pokemonStats[i].base_stat;
      const addedValue = isHP ? 100 + 10 : 5;
      const multiplier = isHP ? 1 : 0.9;

      pokemonStats[i].maxStat = Math.floor(
        Math.floor(((base + 31 + 63) * 100) / 100 + addedValue) *
          (isHP ? 1 : 1.1)
      );
      pokemonStats[i].minStat = Math.floor(
        Math.floor((base * 100) / 100 + addedValue) * multiplier
      );
    }
  }

  return pokemonStats;
}

export async function getEvolutionOfPokemon(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function evolveMethodForPokemon(evolution: any) {
  if (evolution.trigger.name === "recoil-damage") {
    return "perdre 294 PV ou plus par contrecoup sans être mis K.O.";
  } else if (evolution.trigger.name === "strong-style-move") {
    return `Utiliser 20 fois ou plus la capacité Multitoxik sous Style Puissant.`;
  } else if (evolution.trigger.name === "agile-style-move") {
    return `Utiliser 20 fois ou plus la capacité Sprint Bouclier sous Style Rapide `;
  } else if (evolution.trigger.name === "other") {
    // a check
    return "Autre";
  } else if (evolution.trigger.name === "take-damage") {
    return `Perdre 49 PV ou plus + marcher sous la grande arche de pierres de la Fosse des Sables`;
  } else if (evolution.trigger.name === "three-critical-hits") {
    return `Attaque critique 3 fois`;
  } else if (evolution.trigger.name === "tower-of-waters") {
    return "Gravir la Tour de l'Eau";
  } else if (evolution.trigger.name === "tower-of-darkness") {
    return "Gravir la Tour des Ténèbres";
  } else if (evolution.trigger.name === "spin") {
    return "Objet en Sucre + tourner sur soi-même";
  } else if (evolution.trigger.name === "shed") {
    return "Niveau 20, emplacement libre et Poké Ball dans l'inventaire";
  } else if (evolution.trigger.name === "use-item") {
    const url = evolution.item.url;
    const res = await fetch(url);
    const data = await res.json();
    const itemNameInFrench = await getFrenchName(data);
    return `Avec une ${itemNameInFrench.name}`;
  } else if (
    evolution.trigger.name === "trade" &&
    evolution.held_item !== null
  ) {
    const url = evolution.held_item.url;
    const res = await fetch(url);
    const data = await res.json();
    const itemNameInFrench = await getFrenchName(data);
    return `Echange en tenant ${itemNameInFrench.name}`;
  } else if (
    evolution.trigger.name === "level-up" &&
    evolution.held_item !== null
  ) {
    const url = evolution.held_item.url;
    const res = await fetch(url);
    const data = await res.json();
    const itemNameInFrench = await getFrenchName(data);
    return `Gain de niveau avec ${itemNameInFrench.name}`;
  } else if (
    evolution.trigger.name === "level-up" &&
    evolution.min_happiness !== null &&
    evolution.time_of_day === "day"
  ) {
    return "Bonheur, Jour";
  } else if (
    evolution.trigger.name === "level-up" &&
    evolution.min_happiness !== null &&
    evolution.time_of_day === "night"
  ) {
    return "Bonheur, Nuit";
  } else if (
    evolution.trigger.name === "level-up" &&
    evolution.min_happiness !== null
  ) {
    return "Bonheur";
  } else if (
    evolution.trigger.name === "level-up" &&
    evolution.min_level !== null
  ) {
    return `Niveau ${evolution.min_level}`;
  } else if (
    evolution.trigger.name === "level-up" &&
    evolution.location !== null
  ) {
    const url = evolution.location.url;
    const res = await fetch(url);
    const data = await res.json();

    const locationName =
      (await getFrenchName(data)) ?? (await getEnglishName(data));

    return `Près de ${locationName.name}`;
  } else if (
    evolution.trigger.name === "level-up" &&
    evolution.known_move_type !== null
  ) {
    const url = evolution.known_move_type.url;
    const res = await fetch(url);
    const data = await res.json();
    const typeName = await getFrenchName(data);

    return `Gagner un niveau en ayant une capacité ${typeName.name}`;
  } else {
    return "";
  }
}
