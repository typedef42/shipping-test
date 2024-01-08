/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject } from "@nestjs/common";
import { CommandHandler } from "@nestjs/cqrs";

import { ROUTE_SERVICE, RouteService } from "src/core/port/application/services/route.service";

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

    const [listPortDeparture, listPortArrival] = await Promise.all([
      this.routeService.availablePorts(countryDeparture),
      this.routeService.availablePorts(countryArrival),
    ]);

    return await this.routeService.getBestRoute(listPortDeparture, listPortArrival);
  }
}
