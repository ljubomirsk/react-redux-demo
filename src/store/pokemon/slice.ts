import {
  createSlice,
  PayloadAction,
  CaseReducer,
  Action,
} from '@reduxjs/toolkit';

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
});

const getPokemonError: CaseReducer<
  PokemonState,
  PayloadAction<{ error: string }>
> = () => ({
  ...initialState,
});

const issuesDisplaySlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    getPokemonRequest,
    getPokemonSuccess,
    getPokemonError,
  },
});

export const {
  getPokemonRequest: getPokemonRequestAction,
  getPokemonSuccess: getPokemonSuccessAction,
  getPokemonError: getPokemonErrorAction,
} = issuesDisplaySlice.actions;

export default issuesDisplaySlice.reducer;
