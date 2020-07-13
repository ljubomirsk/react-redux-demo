import { combineReducers } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import pokemonReducer from './pokemon/slice';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
