import { Injectable } from "@nestjs/common";

import { FindBestRouteResponseDto } from "src/core/shipment/application/commands/find-best-route/find-best-route.response.dto";

import { RouteService } from "../../application/services/route.service";
import { Port } from "../../domain/entities/port";
import { CountryEnum } from "../../domain/enums/country.enum";

const availablePorts = {
  FRANCE: ["Marseille", "Le Havre", "Bordeaux"].map((portName) => ({ name: portName, country: CountryEnum.FRANCE })),
  VIETNAM: ["Ho Chi Minh City", "Haiphong", "Da Nang"].map((portName) => ({ name: portName, country: CountryEnum.VIETNAM })),
  ITALY: ["Genoa", "Naples", "Venice"].map((portName) => ({ name: portName, country: CountryEnum.ITALY })),
  SPAIN: ["Barcelona", "Valencia", "Malaga"].map((portName) => ({ name: portName, country: CountryEnum.SPAIN })),
  ARGENTINA: ["Buenos Aires", "Rosario", "Mar del Plata"].map((portName) => ({ name: portName, country: CountryEnum.ARGENTINA })),
  JAPAN: ["Tokyo", "Osaka", "Yokohama"].map((portName) => ({ name: portName, country: CountryEnum.JAPAN })),
  USA: ["New York", "Los Angeles", "Miami"].map((portName) => ({ name: portName, country: CountryEnum.USA })),
};

@Injectable()
export class CustomRouteService implements RouteService {
  private readonly distanceMap: Map<string, string> = new Map();

  constructor() {
    this.distanceMap = new Map([
      ["Marseille-Ho Chi Minh City", "10075.9"],
      ["Marseille-Haiphong", "10100"],
      ["Marseille-Da Nang", "9777.1"],
      ["Le Havre-Ho Chi Minh City", "10253.9"],
      ["Le Havre-Haiphong", "9388.9"],
      ["Le Havre-Da Nang", "9892.6"],
      ["Bordeaux-Ho Chi Minh City", "10477.3"],
      ["Bordeaux-Haiphong", "9664.3"],
      ["Bordeaux-Da Nang", "10200"],
      ["Marseille-Genoa", "310.8"],
      ["Marseille-Naples", "781.6"],
      ["Marseille-Venice", "601.8"],
      ["Le Havre-Genoa", "875.8"],
      ["Le Havre-Naples", "1464.3"],
      ["Le Havre-Venice", "1021.9"],
      ["Bordeaux-Genoa", "1000"],
      ["Bordeaux-Naples", "1286.3"],
      ["Bordeaux-Venice", "1013.8"],
      ["Marseille-Barcelona", "338.3"],
      ["Marseille-Valencia", "641.1"],
      ["Marseille-Malaga", "1108.1"],
      ["Le Havre-Barcelona", "1500"],
      ["Le Havre-Valencia", "1115.3"],
      ["Le Havre-Malaga", "1300"],
      ["Bordeaux-Barcelona", "444.5"],
      ["Bordeaux-Valencia", "597.1"],
      ["Bordeaux-Malaga", "958.8"],
      ["Marseille-Buenos Aires", "10802.9"],
      ["Marseille-Rosario", "10805"],
      ["Marseille-Mar del Plata", "11000"],
      ["Le Havre-Buenos Aires", "10981.8"],
      ["Le Havre-Rosario", "10000"],
      ["Le Havre-Mar del Plata", "11253.3"],
      ["Bordeaux-Buenos Aires", "10577.7"],
      ["Bordeaux-Rosario", "10560.2"],
      ["Bordeaux-Mar del Plata", "10835.1"],
      ["Marseille-Tokyo", "10089.7"],
      ["Marseille-Osaka", "10000"],
      ["Marseille-Yokohama", "10109.6"],
      ["Le Havre-Tokyo", "10010"],
      ["Le Havre-Osaka", "9672.5"],
      ["Le Havre-Yokohama", "9762.2"],
      ["Bordeaux-Tokyo", "10208.8"],
      ["Bordeaux-Osaka", "10126.3"],
      ["Bordeaux-Yokohama", "10230.1"],
      ["Marseille-New York", "6000"],
      ["Marseille-Los Angeles", "9688.1"],
      ["Marseille-Miami", "7000"],
      ["Le Havre-New York", "5660"],
      ["Le Havre-Los Angeles", "8918"],
      ["Le Havre-Miami", "7182.6"],
      ["Bordeaux-New York", "5802.1"],
      ["Bordeaux-Los Angeles", "9228.1"],
      ["Bordeaux-Miami", "7235.2"],
      ["Ho Chi Minh City-Genoa", "8000"],
      ["Ho Chi Minh City-Naples", "9421.1"],
      ["Ho Chi Minh City-Venice", "9500"],
      ["Haiphong-Genoa", "8992.6"],
      ["Haiphong-Naples", "8709.3"],
      ["Haiphong-Venice", "8702.3"],
      ["Da Nang-Genoa", "9467.2"],
      ["Da Nang-Naples", "9160.7"],
      ["Da Nang-Venice", "10000"],
      ["Ho Chi Minh City-Barcelona", "10388.8"],
      ["Ho Chi Minh City-Valencia", "9500"],
      ["Ho Chi Minh City-Malaga", "11099.1"],
      ["Haiphong-Barcelona", "9629.8"],
      ["Haiphong-Valencia", "9916.9"],
      ["Haiphong-Malaga", "10372.6"],
      ["Da Nang-Barcelona", "10099.6"],
      ["Da Nang-Valencia", "10000"],
      ["Da Nang-Malaga", "10832.5"],
      ["Ho Chi Minh City-Buenos Aires", "18000"],
      ["Ho Chi Minh City-Rosario", "17231.2"],
      ["Ho Chi Minh City-Mar del Plata", "16606.8"],
      ["Haiphong-Buenos Aires", "17893.9"],
      ["Haiphong-Rosario", "18171"],
      ["Haiphong-Mar del Plata", "17574.3"],
      ["Da Nang-Buenos Aires", "18000"],
      ["Da Nang-Rosario", "17822.8"],
      ["Da Nang-Mar del Plata", "18000"],
      ["Ho Chi Minh City-Tokyo", "4326.7"],
      ["Ho Chi Minh City-Osaka", "3947.9"],
      ["Ho Chi Minh City-Yokohama", "4308.5"],
      ["Haiphong-Tokyo", "3609.6"],
      ["Haiphong-Osaka", "3213.9"],
      ["Haiphong-Yokohama", "3500"],
      ["Da Nang-Tokyo", "3812.3"],
      ["Da Nang-Osaka", "3500"],
      ["Da Nang-Yokohama", "3795.8"],
      ["Ho Chi Minh City-New York", "14285.6"],
      ["Ho Chi Minh City-Los Angeles", "13136.1"],
      ["Ho Chi Minh City-Miami", "15877.8"],
      ["Haiphong-New York", "13176.3"],
      ["Haiphong-Los Angeles", "13000"],
      ["Haiphong-Miami", "14782.3"],
      ["Da Nang-New York", "14000"],
      ["Da Nang-Los Angeles", "12591.9"],
      ["Da Nang-Miami", "15273.9"],
      ["Genoa-Barcelona", "644.7"],
      ["Genoa-Valencia", "944.8"],
      ["Genoa-Malaga", "1412.3"],
      ["Naples-Barcelona", "1200"],
      ["Naples-Valencia", "1250.8"],
      ["Naples-Malaga", "1500"],
      ["Venice-Barcelona", "935.2"],
      ["Venice-Valencia", "1233.8"],
      ["Venice-Malaga", "1700.9"],
      ["Genoa-Buenos Aires", "11099.6"],
      ["Genoa-Rosario", "11105.5"],
      ["Genoa-Mar del Plata", "11330.7"],
      ["Naples-Buenos Aires", "11000"],
      ["Naples-Rosario", "11226.9"],
      ["Naples-Mar del Plata", "10000"],
      ["Venice-Buenos Aires", "11380.5"],
      ["Venice-Rosario", "11389.4"],
      ["Venice-Mar del Plata", "11607.4"],
      ["Genoa-Tokyo", "9820"],
      ["Genoa-Osaka", "9699.4"],
      ["Genoa-Yokohama", "10000"],
      ["Naples-Tokyo", "9847.5"],
      ["Naples-Osaka", "10000"],
      ["Naples-Yokohama", "9865.3"],
      ["Venice-Tokyo", "9562.1"],
      ["Venice-Osaka", "9433.9"],
      ["Venice-Yokohama", "9581.3"],
      ["Genoa-New York", "6501.7"],
      ["Genoa-Los Angeles", "6500"],
      ["Genoa-Miami", "7973.3"],
      ["Naples-New York", "10000"],
      ["Naples-Los Angeles", "10373"],
      ["Naples-Miami", "8520.1"],
      ["Venice-New York", "6681.6"],
      ["Venice-Los Angeles", "9874.8"],
      ["Venice-Miami", "8187.4"],
      ["Barcelona-Buenos Aires", "10000"],
      ["Barcelona-Rosario", "10466.8"],
      ["Barcelona-Mar del Plata", "10500"],
      ["Valencia-Buenos Aires", "10162.3"],
      ["Valencia-Rosario", "10163.9"],
      ["Valencia-Mar del Plata", "10400.2"],
      ["Malaga-Buenos Aires", "9697.3"],
      ["Malaga-Rosario", "9697.2"],
      ["Malaga-Mar del Plata", "9938.1"],
      ["Barcelona-Tokyo", "9800"],
      ["Barcelona-Osaka", "10307.1"],
      ["Barcelona-Yokohama", "10000"],
      ["Valencia-Tokyo", "10709.3"],
      ["Valencia-Osaka", "10606.1"],
      ["Valencia-Yokohama", "10729.8"],
      ["Malaga-Tokyo", "11151.9"],
      ["Malaga-Osaka", "11057.1"],
      ["Malaga-Yokohama", "10000"],
      ["Barcelona-New York", "6166.7"],
      ["Barcelona-Los Angeles", "6400"],
      ["Barcelona-Miami", "7544.9"],
      ["Valencia-New York", "6069.3"],
      ["Valencia-Los Angeles", "9644.3"],
      ["Valencia-Miami", "7392"],
      ["Malaga-New York", "5893"],
      ["Malaga-Los Angeles", "6000"],
      ["Malaga-Miami", "7125.4"],
      ["Buenos Aires-Tokyo", "18200"],
      ["Buenos Aires-Osaka", "18746"],
      ["Buenos Aires-Yokohama", "18374.2"],
      ["Rosario-Tokyo", "18127"],
      ["Rosario-Osaka", "18513.3"],
      ["Rosario-Yokohama", "18133.6"],
      ["Mar del Plata-Tokyo", "18450"],
      ["Mar del Plata-Osaka", "18791"],
      ["Mar del Plata-Yokohama", "18452"],
      ["Buenos Aires-New York", "8524.3"],
      ["Buenos Aires-Los Angeles", "9851.7"],
      ["Buenos Aires-Miami", "7097.7"],
      ["Rosario-New York", "8304.4"],
      ["Rosario-Los Angeles", "8520"],
      ["Rosario-Miami", "6852.5"],
      ["Mar del Plata-New York", "10542"],
      ["Mar del Plata-Los Angeles", "10167.9"],
      ["Mar del Plata-Miami", "7476.1"],
      ["Tokyo-New York", "10850.3"],
      ["Tokyo-Los Angeles", "8815.5"],
      ["Tokyo-Miami", "11997.1"],
      ["Osaka-New York", "5500"],
      ["Osaka-Los Angeles", "9189.5"],
      ["Osaka-Miami", "5600"],
      ["Yokohama-New York", "10876.6"],
      ["Yokohama-Los Angeles", "8834.8"],
      ["Yokohama-Miami", "12021.4"],
    ]);
  }

  async getDistance(portSource: Port, portDestination: Port): Promise<number> {
    let distance = this.distanceMap.get(`${portSource.name}-${portDestination.name}`);

    if (!distance) {
      distance = this.distanceMap.get(`${portDestination.name}-${portSource.name}`);
    }

    if (!distance) {
      throw new Error(`distance not found for ${portSource.name}-${portDestination.name}`);
    }

    return parseFloat(distance);
  }

  async availablePorts(country: CountryEnum): Promise<Port[]> {
    return availablePorts[country];
  }

  async getBestRoute(portSources: Array<Port>, portDestinations: Array<Port>): Promise<FindBestRouteResponseDto> {
    let minDistance = Infinity;
    let resultPortSource: Port = portSources[0];
    let resultPortDes: Port = portDestinations[0];
    const distanceCache: Record<string, number> = {};

    for (const portSource of portSources) {
      for (const portDest of portDestinations) {
        const portPair = JSON.stringify([portSource, portDest]);
        if (!distanceCache[portPair]) {
          distanceCache[portPair] = await this.getDistance(portSource, portDest);
        }
        const distance = distanceCache[portPair];
        if (distance < minDistance) {
          minDistance = distance;
          resultPortSource = portSource;
          resultPortDes = portDest;
        }
      }
    }
    return { distance: minDistance, sourcePort: resultPortSource, destPort: resultPortDes };
  }
}
