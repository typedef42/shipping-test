/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, HttpException, Inject, Param } from "@nestjs/common";

import { PORT_REPOSITORY, PortRepository } from "../../application/persistence/port.repository";
import { ROUTE_SERVICE, RouteService } from "../../application/services/route.service";

@Controller("port")
export class PortController {
  constructor(
    @Inject(PORT_REPOSITORY) private readonly portRepository: PortRepository,
    @Inject(ROUTE_SERVICE) private readonly routeService: RouteService,
  ) {}

  @Get("/distance/:portNameA/:portNameB")
  async distance(@Param("portNameA") portNameA: string, @Param("portNameB") portNameB: string): Promise<any> {
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
  async listPorts(): Promise<any> {
    return this.portRepository.list();
  }

  @Get("/listCountries")
  async listCountries(): Promise<string[]> {
    return this.portRepository.listCountries();
  }
}
