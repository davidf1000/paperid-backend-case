import express, { Application, NextFunction, Request, Response } from "express";

export const getAllTransactions = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "Get all Transactions",
  });
};

export const getTransactionById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "getTransactionById",
  });
};

export const createTransaction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "createTransaction",
  });
};

export const updateTransactionById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "updateTransactionById",
  });
};

export const deleteTransactionById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "deleteTransactionById",
  });
};
