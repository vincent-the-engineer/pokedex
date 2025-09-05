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
}


export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: EncounterMethodRate[];
  location: NamedAPIResource;
  names: Name[];
  pokemon_encounters: PokemonEncounter[],
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

export type PokemonEncounter = {
  pokemon: NamedAPIResource,
  version_details: VersionEncounterDetail,
};

export type VersionEncounterDetail = {
  version: NamedAPIResource,
  max_chance: number,
  encounter_details: Encounter[],
};

