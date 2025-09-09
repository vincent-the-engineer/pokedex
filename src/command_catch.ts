import { PokeAPI } from "./pokeapi.js";
import { type State } from "./state.js";


export async function commandCatch(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("You must provide a pokemon name");
  }
  const name = args[0]
  const pokemon = await state.pokeAPI.fetchPokemon(name);

  const pokemonName = pokemon.name;
  const escaped = Math.random() * pokemon.base_experience > 50;

  console.log(`Throwing a Pokeball at ${pokemonName}...`);
  if (escaped) {
    console.log(`${pokemonName} escaped!`);
    return;
  }
  console.log(`${pokemonName} was caught!`);
  state.pokedex[pokemonName] = pokemon;
}

