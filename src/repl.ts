import { createInterface } from "node:readline";

import { State } from "./state.js";


export function startREPL(state: State) {
  state.readline.prompt();

  state.readline.on('line', async (input: string) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      state.readline.prompt();
      return;
    }

    const commandName = words[0];
    const command = state.commands[commandName];
    if (!command) {
      console.log(
        `Unknown command: "${commandName}". Type "help" for a list of commands.`
      );
      state.readline.prompt();
      return;
    }

    try {
      await command.callback(state);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      } else {
        console.log("An unknown error has occurred.");
     }
    }

    state.readline.prompt();
  });
}


export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "");
}

