/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, HttpException, Inject, Param } from "@nestjs/common";

import { PORT_REPOSITORY, PortRepository } from "../../application/persistence/port.repository";
import { ROUTE_SERVICE, RouteService } from "../../application/services/route.service";
import { CountryEnum } from "../../domain/enums/country.enum";
import { PortResponseDto } from "../../dtos/port.response.dto";
import { PortMapper } from "../../port.mapper";

@Controller("port")
export class PortController {
  constructor(
    @Inject(PORT_REPOSITORY) private readonly portRepository: PortRepository,
    @Inject(ROUTE_SERVICE) private readonly routeService: RouteService,
    private readonly mapper: PortMapper,
  ) {}

  @Get("/distance/:portNameA/:portNameB")
  async distance(@Param("portNameA") portNameA: string, @Param("portNameB") portNameB: string): Promise<number> {
    const portA = await this.portRepository.findByName(portNameA);
    const portB = await this.portRepository.findByName(portNameB);

    if (!portA || !portB) {
      throw new HttpException("Port not found", 404);
    }

    try {
      const distance = await this.routeService.getDistance(portA, portB);
      return distance;
    } catch (error) {
      throw new HttpException("Cannot compute Ports distance", 403);
    }
  }

  @Get("/list")
  async listPorts(): Promise<Array<PortResponseDto>> {
    const listPort = await this.portRepository.list();
    return this.mapper.toResponses(listPort);
  }

  @Get("/available/:country")
  async availablePorts(@Param("country") country: string): Promise<Array<PortResponseDto>> {
    const countryEnum = CountryEnum[country as keyof typeof CountryEnum];
    if (!countryEnum) {
      throw new HttpException("Country not found", 404);
    }

    try {
      const ports = await this.routeService.availablePorts(countryEnum);
      return this.mapper.toResponses(ports);
    } catch (error) {
      throw new HttpException("Unable to compute distance between ports due to missing or invalid data", 403);
    }
  }
}
