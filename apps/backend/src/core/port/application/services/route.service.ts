import { Port } from "../../domain/entities/port";

export const ROUTE_SERVICE = Symbol();

/**
 * Port for the route service
 */
export interface RouteService {
  getDistance(portSource: Port, portDestination: Port): Promise<number>;
}
