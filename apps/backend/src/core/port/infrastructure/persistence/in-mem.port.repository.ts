/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";

import { PortRepository } from "../../application/persistence/port.repository";
import { Port } from "../../domain/entities/port";
import { CountryEnum } from "../../domain/enums/country.enum";

@Injectable()
export class InMemPortRepository implements PortRepository {
  private readonly entityMap: Map<string, Port> = new Map();

  constructor() {
    const availablePorts = {
      FRANCE: ["Marseille", "Le Havre", "Bordeaux"].map((portName) => {
        this.entityMap.set(portName, { name: portName, country: CountryEnum.FRANCE });
      }),
      VIETNAM: ["Ho Chi Minh City", "Haiphong", "Da Nang"].map((portName) => {
        this.entityMap.set(portName, { name: portName, country: CountryEnum.VIETNAM });
      }),
      ITALY: ["Genoa", "Naples", "Venice"].map((portName) => {
        this.entityMap.set(portName, { name: portName, country: CountryEnum.ITALY });
      }),
      SPAIN: ["Barcelona", "Valencia", "Malaga"].map((portName) => {
        this.entityMap.set(portName, { name: portName, country: CountryEnum.SPAIN });
      }),
      ARGENTINA: ["Buenos Aires", "Rosario", "Mar del Plata"].map((portName) => {
        this.entityMap.set(portName, { name: portName, country: CountryEnum.ARGENTINA });
      }),
      JAPAN: ["Tokyo", "Osaka", "Yokohama"].map((portName) => {
        this.entityMap.set(portName, { name: portName, country: CountryEnum.JAPAN });
      }),
      USA: ["New York", "Los Angeles", "Miami"].map((portName) => {
        this.entityMap.set(portName, { name: portName, country: CountryEnum.USA });
      }),
    };
  }

  async findByName(portName: string): Promise<Port | undefined> {
    try {
      const entity = this.entityMap.get(portName);
      return entity;
    } catch (error) {
      console.log(`cannot find port: ${portName}: ${error}`);
      throw error;
    }
  }

  async list(): Promise<Port[]> {
    return Array.from(this.entityMap.values());
  }

  async listCountries(): Promise<string[]> {
    return Object.values(CountryEnum);
  }
}
