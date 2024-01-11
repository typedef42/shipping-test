import { Port } from "../../domain/entities/port";
import { CountryEnum } from "../../domain/enums/country.enum";

export const ROUTE_SERVICE = Symbol();

/**
 * Port for the route service
 */
export interface RouteService {
  getDistance(portSource: Port, portDestination: Port): Promise<number>;
  availablePorts(country: CountryEnum): Promise<Port[]>;
}
