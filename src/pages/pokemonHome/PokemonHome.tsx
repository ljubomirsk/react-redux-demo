import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card, Button } from '@inplayer-org/inplayer-ui';
import { useSelector } from 'react-redux';
import { fetchPokemon, shufflePokemonAction } from '../../store/pokemon/slice';
import { useAppDispatch } from '../../store';
import { getPokemon } from '../../store/pokemon/selectors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

const Heading = styled.h1`
  margin: 1rem 0;
`;

const PokemonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
  margin: 1rem 0;
`;

const PokemonHome = () => {
  const pokemon = useSelector(getPokemon);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPokemon());
  }, [dispatch]);

  const shuffleItems = () => {
    dispatch(shufflePokemonAction());
  };

  return (
    <Container>
      <Heading>Pokemon List</Heading>
      <PokemonContainer>
        {pokemon.map((pokemonItem) => (
          <Card key={pokemonItem.name} title={pokemonItem.name}>
            <Button>View details</Button>
          </Card>
        ))}
      </PokemonContainer>
      <Button onClick={shuffleItems}>Shuffle</Button>
    </Container>
  );
};

export default PokemonHome;
