import { startREPL } from "./repl.js";
import { initState } from "./state.js";


function main() {
  const state = initState(3600000, 60000);  // TTL 1 hour, reap interval 1 minute
  startREPL(state);
}

main();

