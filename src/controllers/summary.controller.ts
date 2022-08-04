import express, { Application, NextFunction, Request, Response } from "express";

export const getDailySummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      status: "success",
      data: {},
      message: "success",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      data: error.message,
      message: "Problem with server",
    });
  }
};

export const getMonthlySummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      status: "success",
      data: {},
      message: "success",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      data: error.message,
      message: "Problem with server",
    });
  }
  res.json({
    message: "getMonthlySummary",
  });
};
