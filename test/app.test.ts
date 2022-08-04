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

describe("POST /register", () => {
  it("Unauthorized", async () => {
    const res: Response = await request(app).post("/register");
    expect(res.statusCode).toEqual(401);
  });
});

describe("POST /login", () => {
  it("Unauthorized", async () => {
    const res: Response = await request(app).post("/login");
    expect(res.statusCode).toEqual(500);
  });
});

describe("GET /users/:userId", () => {
  it("Unauthorized", async () => {
    const res: Response = await request(app).get("/users/123");
    expect(res.statusCode).toEqual(401);
  });
});

describe("GET /accounts", () => {
  it("Unauthorized", async () => {
    const res: Response = await request(app).get("/accounts");
    expect(res.statusCode).toEqual(401);
  });
});

describe("POST /accounts", () => {
  it("Unauthorized", async () => {
    const res: Response = await request(app).post("/accounts");
    expect(res.statusCode).toEqual(401);
  });
});

describe("GET /accounts/:accountId", () => {
  it("Unauthorized", async () => {
    const res: Response = await request(app).get("/accounts/123");
    expect(res.statusCode).toEqual(401);
  });
});

describe("PUT /accounts/:accountId", () => {
  it("Unauthorized", async () => {
    const res: Response = await request(app).put("/accounts/123");
    expect(res.statusCode).toEqual(401);
  });
});

describe("DELETE /accounts/:accountsId", () => {
  it("Unauthorized", async () => {
    const res: Response = await request(app).delete("/accounts/123");
    expect(res.statusCode).toEqual(401);
  });
});

describe("GET /transactions", () => {
  it("Unauthorized", async () => {
    const res: Response = await request(app).get("/transactions");
    expect(res.statusCode).toEqual(401);
  });
});

describe("POST /transactions", () => {
  it("Unauthorized", async () => {
    const res: Response = await request(app).post("/transactions");
    expect(res.statusCode).toEqual(401);
  });
});

describe("GET /transactions/:transactionId", () => {
  it("Unauthorized", async () => {
    const res: Response = await request(app).get("/transactions/123");
    expect(res.statusCode).toEqual(401);
  });
});

describe("PUT /transactions/:transactionId", () => {
  it("Unauthorized", async () => {
    const res: Response = await request(app).put("/transactions/123");
    expect(res.statusCode).toEqual(401);
  });
});

describe("DELETE /transactions/:transactionId", () => {
  it("Unauthorized", async () => {
    const res: Response = await request(app).delete("/transactions/123");
    expect(res.statusCode).toEqual(401);
  });
});

describe("GET /summary", () => {
  it("Unauthorized", async () => {
    const res: Response = await request(app).get("/summary");
    expect(res.statusCode).toEqual(401);
  });
});

describe("GET /randomwrongpath", () => {
  it("Method not allowd", async () => {
    const res: Response = await request(app).get("/randomwrongpath");
    expect(res.statusCode).toEqual(405);
  });
});
