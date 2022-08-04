import express, { Application, NextFunction, Request, Response } from "express";
import { Account } from "../models/accounts.model";
import myDataSource from "../models/db";

export const getAllAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accounts = await myDataSource.getRepository(Account).find();
  console.log(accounts);
  
  res.json(accounts);
};

export const getAccountById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accounts = myDataSource.getRepository(Account).find();
  res.json(accounts);

  //   res.json({
  //     message: "getAccountById",
  //   });
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
