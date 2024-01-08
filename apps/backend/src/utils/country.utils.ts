import { CountryEnum } from "src/core/port/domain/enums/country.enum";

export function validateCountries(countryDeparture: string, countryArrival: string): string {
  if (!isValidCountry(countryDeparture)) {
    return `Invalid departure country: ${countryDeparture}`;
  }
  if (!isValidCountry(countryArrival)) {
    return `Invalid arrival country: ${countryArrival}`;
  }
  if (countryDeparture === countryArrival) {
    return "Departure and arrival countries cannot be the same";
  }
  return "";
}

function isValidCountry(country: string): boolean {
  return Object.values(CountryEnum).includes(country as CountryEnum);
}
