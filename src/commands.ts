import { type CLICommand } from "./state.js";
import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMapForward, commandMapBack } from "./command_map.js";


export function getCommands(): Record<string, CLICommand> {
  return {
    catch: {
      name: "catch <pokemon name>",
      description: "Attempt to catch a pokemon",
      callback: commandCatch,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    explore: {
      name: "explore <location name>",
      description: "List the Pokemons in an area",
      callback: commandExplore,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Display the next 20 location areas",
      callback: commandMapForward,
    },
    mapb: {
      name: "mapb",
      description: "Display the previous 20 location areas",
      callback: commandMapBack,
    },
  };
}

