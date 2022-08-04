import { config } from "dotenv";
import type { Server } from "http";
import request, { Response } from "supertest";
import app from "../src/app";

config();

let server: Server;

describe("GET /", () => {
  it("return status code 200", async () => {
    const res: Response = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
  });

  it("return the correct string", async () => {
    const res: Response = await request(app).get("/");
    expect(res.body.message).toEqual(
      "Paper.id Backend Engineer Test Case by David Fauzi"
    );
  });
});

beforeEach(() => {
  server = app.listen(process.env.PORT || 3000);
});
afterEach(() => {
  server.close();
});
