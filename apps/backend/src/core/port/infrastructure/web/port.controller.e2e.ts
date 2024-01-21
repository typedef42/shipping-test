import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "../../../../app.module";

describe("PortController (e2e)", () => {
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

  describe("/port/distance/:portNameA/:portNameB", () => {
    it("should return the distance between two ports", async () => {
      const response = await request(app.getHttpServer()).get("/port/distance/Marseille/Venice");

      expect(response.status).toBe(200);
      expect(response.text).toBeDefined();
      expect(Number(response.text)).not.toBeNaN();
    });

    it("should return 404 if either port is not found", () => {
      return request(app.getHttpServer())
        .get("/port/distance/nonExistingPort/portB")
        .expect(404)
        .expect((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.message).toBe("Port not found");
        });
    });
  });

  describe("/port/list", () => {
    it("should return a list of ports", () => {
      return request(app.getHttpServer())
        .get("/port/list")
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeDefined();
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });

  describe("/port/listCountries", () => {
    it("should return a list of countries", () => {
      return request(app.getHttpServer())
        .get("/port/listCountries")
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeDefined();
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });
});
