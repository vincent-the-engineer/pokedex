import { Cache } from "./pokecache.js";


export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  #cache: Cache;

  constructor(cacheTimeToLive: number, cacheReapInterval: number) {
    this.#cache = new Cache(cacheTimeToLive, cacheReapInterval);
    this.#cache.startReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;
    const cached = this.#cache.get(url);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const shallowLocations = await response.json() as ShallowLocations;
      this.#cache.add(url, shallowLocations);
      return shallowLocations;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Error fetching locations: ${e.message}`);
      } else {
        throw new Error("Unknown error occurred while fetching locations");
      }
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cached = this.#cache.get(url);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const location = await response.json() as Location;
      this.#cache.add(url, location);
      return location;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Error fetching location: ${e.message}`);
      } else {
        throw new Error("Unknown error occurred while fetching location");
      }
     }
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const cached = this.#cache.get(url);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const pokemon = await response.json() as Pokemon;
      this.#cache.add(url, pokemon);
      return pokemon;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Error fetching pokemon: ${e.message}`);
      } else {
        throw new Error("Unknown error occurred while fetching pokemon");
      }
    }
  }
}


export type Location = {
  id: number,
  name: string,
  game_index: number,
  encounter_method_rates: EncounterMethodRate[],
  location: NamedAPIResource,
  names: Name[],
  pokemon_encounters: PokemonEncounter[],
};

export type Pokemon = {
  id: number,
  name: string,
  base_experience: number,
  height: number,
  is_default: boolean,
  order: number,
  weight: number,
  abilities: PokemonAbility[],
  forms: NamedAPIResource[],
  game_indices: VersionGameIndex[],
  held_items: PokemonHeldItem[],
  location_area_encounters: string,
  moves: PokemonMove[],
  past_types: PokemonTypePast[],
  past_abilities: PokemonAbilityPast[],
  sprites: PokemonSprites,
  cries: PokemonCries,
  species: NamedAPIResource,
  stats: PokemonStat[],
  types: PokemonType[],
};

export type ShallowLocations = {
  count: number,
  next: string,
  previous: string,
  results: NamedAPIResource[],
};

export type Encounter = {
  min_level: number,
  max_level: number,
  condition_values: NamedAPIResource[],
  chance: number,
  method: NamedAPIResource,
};

export type EncounterMethodRate = {
  encounter_method: NamedAPIResource,
  version_details: EncounterVersionDetails,
};

export type EncounterVersionDetails = {
  rate: number,
  version: NamedAPIResource,
};

export type Name = {
  name: string,
  language: NamedAPIResource,
};

export type NamedAPIResource = {
  name: string,
  url: string,
};

export type PokemonAbility = {
  is_hidden: boolean,
  slot: number,
  ability: NamedAPIResource,
};

export type PokemonAbilityPast = {
  generation: NamedAPIResource,
  abilities: PokemonAbility[],
};

export type PokemonCries = {
  latest: string,
  legacy: string,
};

export type PokemonEncounter = {
  pokemon: NamedAPIResource,
  version_details: VersionEncounterDetail,
};

export type PokemonFormType = {
  slot: number,
  type: NamedAPIResource,
};

export type PokemonHeldItem = {
  item: NamedAPIResource,
  version_details: PokemonHeldItemVersion[],
};

export type PokemonHeldItemVersion = {
  version: NamedAPIResource,
  rarity: number,
};

export type PokemonMove = {
  move: NamedAPIResource,
  version_group_details: PokemonMoveVersion[],
};

export type PokemonMoveVersion = {
  move_learn_method: NamedAPIResource,
  version_group: NamedAPIResource,
  level_learned_at: number,
  order: number,
};

export type PokemonSprites = {
  front_default: string,
  front_shiny: string,
  front_female: string;
  front_shiny_female: string,
  back_default: string,
  back_shiny: string,
  back_female: string,
  back_shiny_female: string,
};

export type PokemonStat = {
  stat: NamedAPIResource,
  effort: number,
  base_stat: number,
};

export type PokemonType = {
  slot: number,
  type: NamedAPIResource,
};

export type PokemonTypePast = {
  generation: NamedAPIResource,
  types: PokemonType[],
};

export type VersionEncounterDetail = {
  version: NamedAPIResource,
  max_chance: number,
  encounter_details: Encounter[],
};

export type VersionGameIndex = {
  game_index: number,
  version: NamedAPIResource,
};

