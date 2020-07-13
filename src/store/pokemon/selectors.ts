import { RootState } from '../rootReducer';

export const getPokemon = (state: RootState) => state.pokemonReducer.pokemon;
