import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PokemonHome from './pages/pokemonHome/PokemonHome';
import PokemonDetails from './pages/pokemonDetails/PokemonDetails';

const App = () => (
  <Switch>
    <Route path="/details/:pokemonName">
      <PokemonDetails />
    </Route>
    <Route path="/">
      <PokemonHome />
    </Route>
  </Switch>
);

export default App;
