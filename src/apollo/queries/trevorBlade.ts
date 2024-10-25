import gql from 'graphql-tag';

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      continent {
        code
        name
      }
    }
  }
`;

export const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      code
      name
    }
  }
`;

export const GET_FILTERED_COUNTRIES = gql`
  query GetFilteredCountries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      code
      name
      continent {
        code
        name
      }
      currency
    }
  }
`;
