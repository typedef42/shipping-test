export interface Port {
  name: string;
  country: string;
}

export interface Route {
  arrivalPort: any;
  departurePort: any;
  distance: number;
}
