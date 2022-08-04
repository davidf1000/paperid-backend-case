import express, { Application, NextFunction, Request, Response } from "express";


const app: Application = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "Paper.id Backend Engineer Test Case by David Fauzi",
  });
});

export default app;
