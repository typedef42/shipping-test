/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, HttpException, Inject, Param } from "@nestjs/common";

import { ROUTE_SERVICE, RouteService } from "src/core/port/application/services/route.service";
import { CountryEnum } from "src/core/port/domain/enums/country.enum";

import { Route } from "../../domain/entities/shipment";

@Controller("shipment")
export class ShipmentController {
  constructor(@Inject(ROUTE_SERVICE) private readonly routeService: RouteService) {}

  @Get("/find-best-route/:countryDeparture/:countryArrival")
  async findBestRoute(
    @Param("countryDeparture") countryDeparture: CountryEnum,
    @Param("countryArrival") countryArrival: CountryEnum,
  ): Promise<any> {
    try {
      const portsDeparture = await this.routeService.availablePorts(countryDeparture);
      const portsArrival = await this.routeService.availablePorts(countryArrival);

      // Generate all possible routes using flatMap
      const allRoutes = portsDeparture.flatMap((portA) =>
        portsArrival.map(async (portB) => {
          const distance = await this.routeService.getDistance(portA, portB);
          return { departurePort: portA, arrivalPort: portB, distance };
        }),
      );

      // Resolve all promises and get distances
      const resolvedRoutes = await Promise.all(allRoutes);

      // Find the cheapest route using reduce
      const cheapestRoute = resolvedRoutes.reduce(
        (acc: Route | null, curr: Route) => {
          if (!acc || curr.distance < acc.distance) {
            return curr;
          }
          return acc;
        },
        null as Route | null,
      );

      if (!cheapestRoute) {
        throw new HttpException("Cheapest route not found.", 403); // Throw an error if no cheapest route is found
      }

      return { cheapestRoute, allAvailableRoutes: resolvedRoutes };
    } catch (error) {
      throw new HttpException("Cannot compute Ports distance", 403);
    }
  }
}
