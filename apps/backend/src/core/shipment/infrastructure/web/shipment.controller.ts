/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import { CountryEnum } from "src/core/port/domain/enums/country.enum";
import { validateCountries } from "src/utils/country.utils";

import { FindBestRouteCommand } from "../../application/commands/find-best-route/find-best-route.command";
import { FindBestRouteResponseDto } from "../../application/commands/find-best-route/find-best-route.response.dto";

@Controller("shipment")
export class ShipmentController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get("/find-best-route/:countryDeparture/:countryArrival")
  async findBestRoute(
    @Param("countryDeparture") countryDeparture: string,
    @Param("countryArrival") countryArrival: string,
  ): Promise<FindBestRouteResponseDto> {
    const error = validateCountries(countryDeparture, countryArrival);
    if (error) {
      throw new BadRequestException(error);
    }
    const command = new FindBestRouteCommand(countryDeparture as CountryEnum, countryArrival as CountryEnum);
    return await this.commandBus.execute(command);
  }

  @Get("/list-countries")
  async getCountries(): Promise<Array<CountryEnum>> {
    return Object.values(CountryEnum);
  }
}
