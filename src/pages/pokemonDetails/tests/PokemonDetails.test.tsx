import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeWrapper } from '@inplayer-org/inplayer-ui';
import { useParams, useHistory } from 'react-router';
import { PokemonDetails as PokemonDetailsType } from '../../../store/pokemon/slice';
import PokemonDetails from '../PokemonDetails';
import '@testing-library/jest-dom/extend-expect';
import { usePokemonDetailsSelector } from '../usePokemonDetailsSelector';
import { useAppDispatch } from '../../../store';

interface UsePokemonDetailsSelector {
  isLoading: boolean;
  pokemonDetails: PokemonDetailsType;
}

jest.mock('../usePokemonDetailsSelector');
jest.mock('react-router');
jest.mock('../../../store');

describe('PokemonDetails', () => {
  const usePokemonDetailsSelectorMock = usePokemonDetailsSelector as jest.Mock<
    ReturnType<typeof usePokemonDetailsSelector>
  >;

  const useParamsMock = useParams as jest.Mock<ReturnType<typeof useParams>>;
  useParamsMock.mockReturnValue({
    pokemonName: 'testName',
  });

  const useHistoryMock = useHistory as jest.Mock;
  const pushMock = jest.fn();
  useHistoryMock.mockReturnValue({
    push: pushMock,
  });

  const useAppDispatchMock = useAppDispatch as jest.Mock<
    ReturnType<typeof useAppDispatch>
  >;
  const mockDispatch = jest.fn();
  useAppDispatchMock.mockReturnValue(mockDispatch);

  test('render DetailsComponent', () => {
    usePokemonDetailsSelectorMock.mockReturnValue({
      isLoading: false,
      pokemonDetails: {
        abilities: [
          {
            ability: { name: 'test', url: '/test' },
            is_hidden: false,
            slot: 2,
          },
        ],
        base_experience: 123,
      },
    });
    render(
      <ThemeWrapper>
        <PokemonDetails />
      </ThemeWrapper>
    );

    const deleteButton = screen.getByText(/delete pokemon/i);
    const baseExperience = screen.getByText(/base experience/i);

    expect(deleteButton).toBeInTheDocument();
    expect(baseExperience).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalled();
  });

  test('render DetailsComponent with multiple abilities', () => {
    usePokemonDetailsSelectorMock.mockReturnValue({
      isLoading: false,
      pokemonDetails: {
        abilities: [
          {
            ability: { name: 'first', url: '/test' },
            is_hidden: false,
            slot: 2,
          },
          {
            ability: { name: 'second', url: '/test' },
            is_hidden: false,
            slot: 5,
          },
        ],
        base_experience: 123,
      },
    });
    render(
      <ThemeWrapper>
        <PokemonDetails />
      </ThemeWrapper>
    );

    const firstAbility = screen.getByText(/first/i);
    const secondAbility = screen.getByText(/second/i);

    expect(firstAbility).toBeInTheDocument();
    expect(secondAbility).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalled();
  });

  test('history.push to have been called on button click', () => {
    usePokemonDetailsSelectorMock.mockReturnValue({
      isLoading: false,
      pokemonDetails: {
        abilities: [
          {
            ability: { name: 'first', url: '/test' },
            is_hidden: false,
            slot: 2,
          },
          {
            ability: { name: 'second', url: '/test' },
            is_hidden: false,
            slot: 5,
          },
        ],
        base_experience: 123,
      },
    });
    render(
      <ThemeWrapper>
        <PokemonDetails />
      </ThemeWrapper>
    );

    const button = screen.getByText(/delete/i);
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalled();
  });

  test('renders Loader', () => {
    usePokemonDetailsSelectorMock.mockReturnValue({
      isLoading: true,
      pokemonDetails: {
        abilities: [
          {
            ability: { name: 'test', url: '/test' },
            is_hidden: false,
            slot: 2,
          },
        ],
        base_experience: 123,
      },
    });
    const { container } = render(
      <ThemeWrapper>
        <PokemonDetails />
      </ThemeWrapper>
    );

    const loader = container.querySelector('svg');

    expect(loader).toBeInTheDocument();
  });
});
