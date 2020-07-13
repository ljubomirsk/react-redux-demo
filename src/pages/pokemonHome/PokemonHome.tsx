import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card, Button } from '@inplayer-org/inplayer-ui';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchPokemon, shufflePokemonAction } from '../../store/pokemon/slice';
import { useAppDispatch } from '../../store';
import { getPokemon } from '../../store/pokemon/selectors';
import { Container } from '../../components/styled';

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
    if (!pokemon.length) {
      dispatch(fetchPokemon());
    }
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
            <NavLink to={`/details/${pokemonItem.name}`}>View details</NavLink>
          </Card>
        ))}
      </PokemonContainer>
      <Button onClick={shuffleItems}>Shuffle</Button>
    </Container>
  );
};

export default PokemonHome;
