import { useLazyQuery } from '@vue/apollo-composable';
import { GET_COUNTRIES, GET_CONTINENTS } from 'src/apollo/queries/trevorBlade';

export function useCountries() {
  const { load, result, loading, error } = useLazyQuery(GET_COUNTRIES);

  return {
    countries: result,
    loading,
    load,
    error,
  };
}

export function useContinents() {
  const { load, result, loading, error } = useLazyQuery(GET_CONTINENTS);

  return {
    load,
    continents: result,
    loading,
    error,
  };
}
