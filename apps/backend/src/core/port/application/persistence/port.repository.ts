import { Port } from "../../domain/entities/port";

export const PORT_REPOSITORY = Symbol();

/**
 * Port for the data layer (storage) of Port
 */
export interface PortRepository {
  findByName(portName: string): Promise<Port | undefined>;
  list(): Promise<Port[]>;
  listCountries(): Promise<string[]>;
}
