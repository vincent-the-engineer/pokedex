import { type State } from "./state.js";


export async function commandHelp(state: State) {
  console.log("\nWelcome to the Pokedex!\nUsage:\n");
  for (const {name, description} of Object.values(state.commands)) {
    console.log(`${name}: ${description}`);
  }
  console.log();
}

