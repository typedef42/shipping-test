import { FindBestRouteResponseDto } from "src/core/shipment/application/commands/find-best-route/find-best-route.response.dto";

import { Port } from "../../domain/entities/port";
import { CountryEnum } from "../../domain/enums/country.enum";

export const ROUTE_SERVICE = Symbol();

/**
 * Port for the route service
 */
export interface RouteService {
  getDistance(portSource: Port, portDestination: Port): Promise<number>;
  availablePorts(country: CountryEnum): Promise<Port[]>;
  getBestRoute(listPortDeparture: Port[], listPortArrival: Port[]): Promise<FindBestRouteResponseDto>;
}
