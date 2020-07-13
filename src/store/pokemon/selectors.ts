import { RootState } from '../rootReducer';

export const getPokemon = (state: RootState) => state.pokemonReducer.pokemon;

export const getIsLoading = (state: RootState) =>
  state.pokemonReducer.isFetching;

export const getPokemonDetails = (state: RootState) =>
  state.pokemonReducer.pokemonSelected;
