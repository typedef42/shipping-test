import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { ROUTE_SERVICE } from "../port/application/services/route.service";
import { CustomRouteService } from "../port/infrastructure/services/custom-route.service";
import { FindBestRouteCommandHandler } from "./application/commands/find-best-route/activate-account.command";
import { ShipmentController } from "./infrastructure/web/shipment.controller";

const commands = [FindBestRouteCommandHandler];

const repositories: Provider[] = [];

const services: Provider[] = [
  {
    provide: ROUTE_SERVICE,
    useClass: CustomRouteService,
  },
];

const controllers = [ShipmentController];

@Module({
  imports: [CqrsModule],
  providers: [...commands, ...services, ...repositories],
  exports: [...services],
  controllers: [...controllers],
})
export class ShipmentModule {}
