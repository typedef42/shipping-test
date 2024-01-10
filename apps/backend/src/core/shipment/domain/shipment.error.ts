export class CountryNotFoundError extends Error {
  constructor(country: string) {
    super(`Country ${country} not found`);
  }
}

export class DepartureAndArrivalCannotBeSameError extends Error {
  constructor() {
    super(`Departure and arrival countries cannot be the same`);
  }
}
