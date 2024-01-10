/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, HttpException, Param } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import { CountryEnum } from "src/core/port/domain/enums/country.enum";

import { FindBestRouteCommand } from "../../application/commands/find-best-route/find-best-route.command";
import { FindBestRouteResponseDto } from "../../application/commands/find-best-route/find-best-route.response.dto";
import { CountryNotFoundError, DepartureAndArrivalCannotBeSameError } from "../../domain/shipment.error";

@Controller("shipment")
export class ShipmentController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get("/find-best-route/:countryDeparture/:countryArrival")
  async findBestRoute(
    @Param("countryDeparture") countryDeparture: string,
    @Param("countryArrival") countryArrival: string,
  ): Promise<FindBestRouteResponseDto> {
    try {
      const command = new FindBestRouteCommand(countryDeparture as CountryEnum, countryArrival as CountryEnum);
      return await this.commandBus.execute(command);
    } catch (error) {
      if (error instanceof CountryNotFoundError || error instanceof DepartureAndArrivalCannotBeSameError)
        throw new HttpException(error.message, 400);
      throw error;
    }
  }

  @Get("/list-countries")
  async getCountries(): Promise<Array<CountryEnum>> {
    return Object.values(CountryEnum);
  }
}
