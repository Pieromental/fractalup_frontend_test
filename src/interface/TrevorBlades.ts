export interface CountryFilterInput {
  name?: { regex: string };
  continent?: { in: string[] };
}
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
