import type { CLICommand } from "./command.js";


export function commandHelp(commands: Record<string, CLICommand>) {
  console.log("\nWelcome to the Pokedex!\nUsage:\n");
  for (const {name, description} of Object.values(commands)) {
    console.log(`${name}: ${description}`);
  }
  console.log();
}

