import { CountryEnum } from "../../domain/enums/country.enum";
import { CustomRouteService } from "./custom-route.service";

describe("CustomRouteService", () => {
  let service: CustomRouteService;

  beforeEach(() => {
    service = new CustomRouteService();
  });

  describe("getDistance", () => {
    it("should return the distance between two ports", async () => {
      const portSource = { name: "Ho Chi Minh City", country: CountryEnum.VIETNAM };
      const portDestination = { name: "Valencia", country: CountryEnum.ITALY };
      const expectedDistance = 9500;

      const distance = await service.getDistance(portSource, portDestination);

      expect(distance).toBe(expectedDistance);
    });

    it("should throw an error if distance is not found", async () => {
      const portSource = { name: "Unknown Port", country: CountryEnum.VIETNAM };
      const portDestination = { name: "Valencia", country: CountryEnum.SPAIN };

      await expect(service.getDistance(portSource, portDestination)).rejects.toThrowError(
        "distance not found for Unknown Port-Valencia",
      );
    });
  });

  describe("availablePorts", () => {
    it("should return the available ports for a given country", async () => {
      const country = CountryEnum.VIETNAM;
      const expectedPorts = [
        { name: "Ho Chi Minh City", country: CountryEnum.VIETNAM },
        { name: "Haiphong", country: CountryEnum.VIETNAM },
        { name: "Da Nang", country: CountryEnum.VIETNAM },
      ];

      const ports = await service.availablePorts(country);

      expect(ports).toEqual(expectedPorts);
    });
  });
});
