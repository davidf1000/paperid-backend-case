import express, { Application, NextFunction, Request, Response } from "express";

export const getDailySummary = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "getDailySummary",
  });
};

export const getMonthlySummary = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "getMonthlySummary",
  });
};
