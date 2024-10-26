export interface Country {
  code: string;
  name: string;
  continent: {
    name: string;
  };
  currency: string;
}

export interface CountriesData {
  countries: Country[];
}

export interface Variables {
  filter: CountryFilterInput;
}

export interface StringQueryOperatorInput {
  eq?: string;
  in?: string[];
  ne?: string;
  nin?: string[];
  regex?: string;
}

export interface CountryFilterInput {
  code?: StringQueryOperatorInput;
  continent?: StringQueryOperatorInput;
  currency?: StringQueryOperatorInput;
  name?: StringQueryOperatorInput;
}
