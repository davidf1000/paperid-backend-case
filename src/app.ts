import express, { Application, NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./swagger.json";

const app: Application = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "Paper.id Backend Engineer Test Case by David Fauzi",
  });
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

export default app;
