import { Module } from "@nestjs/common";

import { PortModule } from "./port/port.module";
import { ShipmentModule } from "./shipment/shipment.module";

@Module({
  imports: [PortModule, ShipmentModule],
})
export class CoreModule {}
