import { useLazyQuery } from '@vue/apollo-composable';
import {
  GET_COUNTRIES,
  GET_CONTINENTS,
  GET_FILTERED_COUNTRIES,
  GET_COUNTRY,
} from 'src/apollo/queries/trevorBlade';

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

interface StringQueryOperatorInput {
  eq?: string;
  in?: string[];
  ne?: string;
  nin?: string[];
  regex?: string;
}

interface CountryFilterInput {
  code?: StringQueryOperatorInput;
  continent?: StringQueryOperatorInput;
  currency?: StringQueryOperatorInput;
  name?: StringQueryOperatorInput;
}

export function useFilteredCountries() {
  const { load, result, loading, error } = useLazyQuery(GET_FILTERED_COUNTRIES);

  const fetchCountries = async (
    inputSearch: string = '',
    selectedContinents: string[] = []
  ) => {
    const filter: CountryFilterInput = {
      name: inputSearch ? { regex: inputSearch } : undefined,
      continent:
        selectedContinents.length > 0 ? { in: selectedContinents } : undefined,
    };

    const variables = filter.name || filter.continent ? { filter } : {};

    try {
      await load(null, variables);
      console.log('Consulta exitosa:', result.value);
    } catch (err) {
      console.error('Error al hacer la consulta:', err);
    }
  };

  return { fetchCountries, countriesFiltered: result, loading, error };
}
export function useCountryByCode() {
  const { load, result, loading, error } = useLazyQuery(GET_COUNTRY);

  const fetchCountryByCode = async (code: string) => {
    if (!code) {
      console.error('El código del país es requerido.');
      return null;
    }

    try {
      await load(null, { code });
      console.log('Consulta exitosa:', result.value);
    } catch (err) {
      console.error('Error al obtener el país:', err);
      return null;
    }
  };

  return { fetchCountryByCode, countryByCode: result, loading, error };
}
