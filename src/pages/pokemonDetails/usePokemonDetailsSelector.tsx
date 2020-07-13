import { useSelector } from 'react-redux';
import { getIsLoading, getPokemonDetails } from '../../store/pokemon/selectors';

export const usePokemonDetailsSelector = () => {
  const isLoading = useSelector(getIsLoading);
  const pokemonDetails = useSelector(getPokemonDetails);

  return { isLoading, pokemonDetails };
};
