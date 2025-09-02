import { PokeAPI } from "./pokeapi.js";
import { type State } from "./state.js";


export async function commandMapForward(state: State) {
  const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  for (const result of locations.results) {
    console.log(result.name);
  }
}


export async function commandMapBack(state: State) {
  if (!state.prevLocationsURL) {
    throw new Error("you're on the first page");
  }
  const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  for (const result of locations.results) {
    console.log(result.name);
  }
}
