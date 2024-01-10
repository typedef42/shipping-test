import { Module, Provider } from "@nestjs/common";

import { PORT_REPOSITORY } from "./application/persistence/port.repository";
import { ROUTE_SERVICE } from "./application/services/route.service";
import { InMemPortRepository } from "./infrastructure/persistence/in-mem.port.repository";
import { CustomRouteService } from "./infrastructure/services/custom-route.service";
import { PortController } from "./infrastructure/web/port.controller";
import { PortMapper } from "./port.mapper";

const repositories: Provider[] = [
  {
    provide: PORT_REPOSITORY,
    useClass: InMemPortRepository,
  },
];

const services: Provider[] = [
  {
    provide: ROUTE_SERVICE,
    useClass: CustomRouteService,
  },
];

const mapper: Provider[] = [PortMapper];

const controllers = [PortController];

@Module({
  providers: [...services, ...repositories, ...mapper],
  exports: [...services],
  controllers: [...controllers],
})
export class PortModule {}
