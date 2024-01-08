import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { PortModule } from "../port/port.module";
import { FindBestRouteCommandHandler } from "./application/commands/find-best-route/find-best-route.command";
import { ShipmentController } from "./infrastructure/web/shipment.controller";

const commands = [FindBestRouteCommandHandler];

const repositories: Provider[] = [];

const services: Provider[] = [];

const controllers = [ShipmentController];

@Module({
  imports: [CqrsModule, PortModule],
  providers: [...commands, ...services, ...repositories],
  controllers: [...controllers],
})
export class ShipmentModule {}
