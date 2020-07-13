import React, { useEffect } from 'react';
import { Card, Button, Loader } from '@inplayer-org/inplayer-ui';
import { useParams, useHistory } from 'react-router';
import {
  fetchPokemonDetails,
  deletePokemonAction,
} from '../../store/pokemon/slice';
import { useAppDispatch } from '../../store';
import { Container } from '../../components/styled';
import { usePokemonDetailsSelector } from './usePokemonDetailsSelector';

const PokemonDetails = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isLoading, pokemonDetails } = usePokemonDetailsSelector();
  useEffect(() => {
    dispatch(fetchPokemonDetails(pokemonName));
  }, [dispatch]);

  const handleDeletePokemon = () => {
    dispatch(deletePokemonAction(pokemonName));
    history.push('/');
  };

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <Container>
      <Card title={pokemonName}>
        {pokemonDetails?.abilities.map((ability) => (
          <div key={ability.ability.name}>
            <h4>Ability: {ability.ability.name}</h4>
            <ul>
              <li>Is hidden ability: {ability.is_hidden}</li>
              <li>Slot: {ability.slot}</li>
            </ul>
          </div>
        ))}
        <h3>Base experience: {pokemonDetails?.base_experience}</h3>
        <Button
          onClick={handleDeletePokemon}
          buttonModifiers={['buttonDanger']}
          fullWidth
        >
          Delete pokemon
        </Button>
      </Card>
    </Container>
  );
};

export default PokemonDetails;
