export interface DataLanguage {
  name: string;
  language: {
    name: string;
    url: string;
  };
}

export interface VersionGroupDetail {
  level_learned_at: number;
  version_group: {
    name: string;
  };
}

export interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: VersionGroupDetail[];
  data: {
    type: string;
    machines: {
      name: string;
      url: string;
      machine: {
        url: string;
        name: string;
      };
    }[];
    [key: string]: any;
  };
}

export interface Moves {
  moves: Move[];
}

export interface Machine {
  machine: {
    url: string;
    name: string;
  };
  version_group: {
    name: string;
  };
  name: string;
}

export interface PokedexType {
  entry_number: number;
  pokedex: {
    name: string;
    url: string;
  };
}

export interface PokedexNameType {
  name: string;
  entry_number: number;
}

export interface EvolutionsProps {
  pokedex_id: number;
  name: string;
  condition: string;
}

export interface EvolutionsType {
  pre: EvolutionsProps[];
  next: EvolutionsProps[];
  mega: {
    orbe: string;
    sprites: {
      regular: string;
      shiny: string;
    };
  };
}

export interface PokemonType {
  pokedex_id: number;
  generation: number;
  category?: string;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  url: string;
  sprites: {
    regular: string;
    shiny: string;
    gmax: string[];
  };
  types: {
    name: string;
    image: string;
  }[];
  talents: {
    name: string;
    tc: boolean;
  }[];
  stats: {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
  };
  resistances: {
    name: string;
    multiplier: number;
  }[];
  evolution: EvolutionsType;
  height: string;
  weight: string;
  egg_groups: string[];
  sexe: {
    male: number;
    female: number;
  };
  level_100: number;
  catch_rate: number;
  formes?: string;
}

export interface PokemonStats {
  hp: number;
  atk: number;
  def: number;
  spe_atk: number;
  spe_def: number;
  vit: number;
}

export interface StatsArray {
  base_stat: number;
  name: string;
  maxStat?: number;
  minStat?: number;
}

export interface FrenchNameType {
  name: string;
  url: string;
}
