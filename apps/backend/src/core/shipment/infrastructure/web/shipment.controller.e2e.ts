import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "../../../../app.module";

describe("ShipmentController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("/shipment/find-best-route/:countryDeparture/:countryArrival", () => {
    it("should return the best route between two countries", () => {
      return request(app.getHttpServer())
        .get("/shipment/find-best-route/VIETNAM/FRANCE")
        .expect(200)
        .expect(({ body }) => {
          expect(body).toHaveProperty("sourcePort");
          expect(body).toHaveProperty("destPort");
        });
    });

    it("should return 400 if either country is not found", () => {
      return request(app.getHttpServer())
        .get("/shipment/find-best-route/nonExistingCountry/FRANCE")
        .expect(400)
        .expect(({ body }) => {
          expect(body).toHaveProperty("message", "Country nonExistingCountry not found");
        });
    });

    it("should return 400 if both countries are the same", () => {
      return request(app.getHttpServer())
        .get("/shipment/find-best-route/FRANCE/FRANCE")
        .expect(400)
        .expect(({ body }) => {
          expect(body).toHaveProperty("message", "Departure and arrival countries cannot be the same");
        });
    });
  });

  describe("/shipment/list-countries", () => {
    it("should return a list of countries", () => {
      return request(app.getHttpServer())
        .get("/shipment/list-countries")
        .expect(200)
        .expect(({ body }) => {
          expect(body).toBeDefined();
          expect(Array.isArray(body)).toBe(true);
        });
    });
  });
});
