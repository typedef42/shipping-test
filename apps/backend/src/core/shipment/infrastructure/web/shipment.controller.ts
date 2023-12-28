/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

@Controller("shipment")
export class ShipmentController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get("/find-best-route/:countryDeparture/:countryArrival")
  async findBestRoute(@Param("countryDeparture") countryDeparture: string, @Param("countryArrival") countryArrival: string) {
    return HttpStatus.OK;
  }
}
