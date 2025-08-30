import { createInterface } from "node:readline";

import { initState } from "./state.js";


export function startREPL() {
  const state = initState();

  state.rl.prompt();

  state.rl.on('line', (input: string) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const commandName = words[0];
    const command = state.commands[commandName];
    if (!command) {
      console.log(
        `Unknown command: "${commandName}". Type "help" for a list of commands.`
      );
      state.rl.prompt();
      return;
    }

    try {
      command.callback(state);
    } catch (e) {
      console.log(e);
    }

    state.rl.prompt();
  });
}


export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "");
}

