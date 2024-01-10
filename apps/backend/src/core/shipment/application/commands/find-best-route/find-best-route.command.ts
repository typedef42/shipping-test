/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject } from "@nestjs/common";
import { CommandHandler } from "@nestjs/cqrs";

import { ROUTE_SERVICE, RouteService } from "src/core/port/application/services/route.service";
import { CountryNotFoundError, DepartureAndArrivalCannotBeSameError } from "src/core/shipment/domain/shipment.error";

import { CountryEnum } from "../../../../port/domain/enums/country.enum";
import { FindBestRouteResponseDto } from "./find-best-route.response.dto";

export class FindBestRouteCommand {
  constructor(
    public readonly countryDeparture: CountryEnum,
    public readonly countryArrival: CountryEnum,
  ) {}
}

@CommandHandler(FindBestRouteCommand)
export class FindBestRouteCommandHandler {
  constructor(@Inject(ROUTE_SERVICE) private readonly routeService: RouteService) {}

  async execute(command: FindBestRouteCommand): Promise<FindBestRouteResponseDto> {
    const { countryDeparture, countryArrival } = command;
    if (!Object.values(CountryEnum).includes(countryDeparture)) {
      throw new CountryNotFoundError(countryDeparture);
    }
    if (!Object.values(CountryEnum).includes(countryArrival)) {
      throw new CountryNotFoundError(countryArrival);
    }
    if (countryDeparture === countryArrival) throw new DepartureAndArrivalCannotBeSameError();

    const [listPortDeparture, listPortArrival] = await Promise.all([
      this.routeService.availablePorts(countryDeparture),
      this.routeService.availablePorts(countryArrival),
    ]);

    return await this.routeService.getBestRoute(listPortDeparture, listPortArrival);
  }
}
