export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static readonly locationAreaEndpoint = "location-area";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/`
                + `${PokeAPI.locationAreaEndpoint}/`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json() as ShallowLocations;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const resourceName = locationName ? `${locationName}/` : "";
    const url = `${PokeAPI.baseURL}/${PokeAPI.locationAreaEndpoint}/`
                + `${resourceName}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json() as Location;
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

