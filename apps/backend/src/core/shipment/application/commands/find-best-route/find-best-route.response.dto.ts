import { Port } from "src/core/port/domain/entities/port";

export class FindBestRouteResponseDto {
  distance: number;
  sourcePort: Port;
  destPort: Port;
}
