import { createInterface, type Interface } from "readline";

import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";


export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};


export type State = {
  readline: Interface,
  commands: Record<string, CLICommand>,
  pokeAPI: PokeAPI,
  nextLocationsURL: string,
  prevLocationsURL: string,
};


export function initState(cacheTimeToLive: number, cacheReapInterval: number) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  return {
    readline: rl,
    commands: getCommands(),
    pokeAPI: new PokeAPI(cacheTimeToLive, cacheReapInterval),
    nextLocationsURL: "",
    prevLocationsURL: "",
  };
}

