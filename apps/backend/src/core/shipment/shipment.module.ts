import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { FindBestRouteCommandHandler } from "./application/commands/find-best-route/activate-account.command";
import { ShipmentController } from "./infrastructure/web/shipment.controller";

const commands = [FindBestRouteCommandHandler];

const repositories: Provider[] = [];

const services: Provider[] = [];

const controllers = [ShipmentController];

@Module({
  imports: [CqrsModule],
  providers: [...commands, ...services, ...repositories],
  controllers: [...controllers],
})
export class ShipmentModule {}
