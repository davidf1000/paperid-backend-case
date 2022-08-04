import express, { Application, NextFunction, Request, Response } from "express";

export const getAllAccounts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "Get all accounts",
  });
};

export const getAccountById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "getAccountById",
  });
};

export const createAccount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "createAccount",
  });
};

export const updateAccountById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "updateAccountById",
  });
};

export const deleteAccountById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "deleteAccountById",
  });
};
