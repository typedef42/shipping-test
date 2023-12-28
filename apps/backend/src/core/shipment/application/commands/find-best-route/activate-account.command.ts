/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommandHandler } from "@nestjs/cqrs";

import { CountryEnum } from "../../../../port/domain/enums/country.enum";

export class FindBestRouteCommand {
  constructor(
    public readonly countryDeparture: CountryEnum,
    public readonly countryArrival: CountryEnum,
  ) {}
}

@CommandHandler(FindBestRouteCommand)
export class FindBestRouteCommandHandler {
  constructor() {}

  async execute(command: FindBestRouteCommand): Promise<{ todo: string }> {
    return { todo: "todo" };
  }
}
