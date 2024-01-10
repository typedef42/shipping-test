import { Injectable } from "@nestjs/common";

import { Mapper } from "src/libs/ddd/mapper.interface";

import { Port } from "./domain/entities/port";
import { PortResponseDto } from "./dtos/port.response.dto";

@Injectable()
export class PortMapper implements Mapper<Port, PortResponseDto> {
  toResponse(entity: Port): PortResponseDto {
    return new PortResponseDto(entity.name, entity.country);
  }
  toResponses(entities: Array<Port>): Array<PortResponseDto> {
    return entities.map((entity) => this.toResponse(entity));
  }
}
