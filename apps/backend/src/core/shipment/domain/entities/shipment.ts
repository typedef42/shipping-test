import { Port } from "src/core/port/domain/entities/port";

export interface Route {
  departurePort: Port;
  arrivalPort: Port;
  distance: number;
}
