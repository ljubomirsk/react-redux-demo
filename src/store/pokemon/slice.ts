import {
  createSlice,
  PayloadAction,
  CaseReducer,
  Action,
} from '@reduxjs/toolkit';
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { AppThunk } from '..';

interface PokemonInfo {
  name: string;
  url: string;
}

interface PokemonPayload {
  pokemon: Array<PokemonInfo>;
}

interface Ability {
  ability: PokemonInfo;
  is_hidden: boolean;
  slot: 1;
}

// there are more props but we will use only these
interface PokemonDetails {
  abilities: Array<Ability>;
  base_experience: number;
}

interface PokemonState extends PokemonPayload {
  pokemonSelected?: PokemonDetails;
  isFetching: boolean;
}

const initialState: PokemonState = {
  pokemon: [],
  pokemonSelected: undefined,
  isFetching: false,
};

const getPokemonRequest: CaseReducer<PokemonState, Action> = (state) => ({
  ...state,
  isFetching: true,
});

const getPokemonSuccess: CaseReducer<
  PokemonState,
  PayloadAction<PokemonPayload>
> = (state, { payload: { pokemon } }) => ({
  ...state,
  pokemon,
  isFetching: false,
});

const getPokemonError: CaseReducer<
  PokemonState,
  PayloadAction<{ error: string }>
> = () => ({
  ...initialState,
});

const shufflePokemon: CaseReducer<PokemonState, Action> = (state) => {
  const { pokemon } = state;
  const newPokemon = [...pokemon];

  newPokemon.sort(() => {
    const randomNumber = Math.random();
    if (randomNumber > 0.5) {
      return 1;
    }
    return -1;
  });

  return {
    ...state,
    pokemon: newPokemon,
  };
};

const getPokemonDetailsSuccess: CaseReducer<
  PokemonState,
  PayloadAction<PokemonDetails>
> = (state, { payload }) => ({
  ...state,
  pokemonSelected: payload,
  isFetching: false,
});

const deletePokemon: CaseReducer<PokemonState, PayloadAction<string>> = (
  state,
  { payload: pokemonName }
) => {
  const { pokemon } = state;
  const indexToDelete = pokemon.findIndex((item) => item.name === pokemonName);
  const newPokemon = [
    ...pokemon.slice(0, indexToDelete),
    ...pokemon.slice(indexToDelete + 1),
  ];

  return {
    ...state,
    pokemon: newPokemon,
  };
};

const issuesDisplaySlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    getPokemonRequest,
    getPokemonSuccess,
    getPokemonError,
    shufflePokemon,
    getPokemonDetailsSuccess,
    deletePokemon,
  },
});

export const {
  getPokemonRequest: getPokemonRequestAction,
  getPokemonSuccess: getPokemonSuccessAction,
  getPokemonError: getPokemonErrorAction,
  shufflePokemon: shufflePokemonAction,
  getPokemonDetailsSuccess: getPokemonDetailsSuccessAction,
  deletePokemon: deletePokemonAction,
} = issuesDisplaySlice.actions;

export default issuesDisplaySlice.reducer;

export const fetchPokemon = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getPokemonRequestAction());
    const {
      data: { results },
    } = await axios.get<{ results: Array<PokemonInfo> }>(
      'https://pokeapi.co/api/v2/pokemon?limit=10&offset=200'
    );
    dispatch(getPokemonSuccessAction({ pokemon: results }));
  } catch (err) {
    dispatch(getPokemonErrorAction(err.toString()));
  }
};

export const fetchPokemonDetails = (pokemonName: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(getPokemonRequestAction());
    const { data } = await axios.get<PokemonDetails>(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    dispatch(getPokemonDetailsSuccessAction(data));
  } catch (err) {
    dispatch(getPokemonErrorAction(err.toString()));
  }
};
