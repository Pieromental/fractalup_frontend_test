import { useQuery } from '@vue/apollo-composable';
import { GET_COUNTRIES, GET_CONTINENTS } from 'src/apollo/queries/trevorBlade';

export function useCountries() {
  const { result, loading, error } = useQuery(GET_COUNTRIES);

  return {
    countries: result,
    loading,
    error,
  };
}

export function useContinents() {
  const { result, loading, error } = useQuery(GET_CONTINENTS);

  return {
    continents: result,
    loading,
    error,
  };
}
