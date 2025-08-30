import { type State } from "./state.js";


export function commandExit(state: State) {
  console.log("\nClosing the Pokedex... Goodbye!");
  state.rl.close();
  process.exit(0);
}

