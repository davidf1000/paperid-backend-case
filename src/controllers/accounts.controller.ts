import express, { Application, NextFunction, Request, Response } from "express";
import { Account } from "../models/accounts.model";
import myDataSource from "../models/db";
import { User } from "../models/user.models";

export const getAllAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accounts = await myDataSource.getRepository(Account).find({
      where: { status: true },
      relations: {
        user: true,
      },
    });
    const accountsMapped = accounts
      .filter((x) => x.status)
      .map((x) => ({
        ...x,
        user: {
          id: x.user.id,
          username: x.user.username,
        },
      }));
    res.status(200).json({
      status: "success",
      data: accountsMapped,
      message: "get accounts success",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      data: error.message,
      message: "Problem with server",
    });
  }
};

export const getAccountById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const account = await myDataSource.getRepository(Account).findOne({
      where: { id: req.params.accountId, status: true },
      relations: {
        user: true,
      },
    });
    if (!account) {
      res.status(404).json({
        status: "error",
        data: null,
        message: "account not found",
      });
      return;
    }
    const accountMapped = {
      ...account,
      user: {
        username: account?.user.username,
        userId: account?.user.id,
      },
    };
    res.status(200).json({
      status: "success",
      data: accountMapped,
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

export const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundUser = await myDataSource.getRepository(User).findOne({
      where: {
        id: req.body.userId,
      },
    });
    if (!foundUser) {
      res.status(404).json({
        status: "error",
        data: null,
        message: "User not found",
      });
      return;
    }
    const newAccount = new Account();
    newAccount.name = req.body.name;
    newAccount.user = foundUser;
    const account = myDataSource.getRepository(Account).save(newAccount);

    res.status(200).json({
      status: "success",
      data: account,
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

// get by id, then update it

export const updateAccountById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const account = await myDataSource.getRepository(Account).findOne({
      where: { id: req.params.accountId, status: true },
      relations: {
        user: true,
      },
    });
    if (!account) {
      res.status(404).json({
        status: "error",
        data: null,
        message: "account not found",
      });
      return;
    }
    account.name = req.body.name;
    await myDataSource.getRepository(Account).save(account);
    res.status(200).json({
      status: "success",
      data: account,
      message: "Update Success",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      data: error.message,
      message: "Problem with server",
    });
  }
};

// get, then update status to false
export const deleteAccountById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const account = await myDataSource.getRepository(Account).findOne({
      where: { id: req.params.accountId, status: true },
      relations: {
        user: true,
      },
    });
    if (!account) {
      res.status(404).json({
        status: "error",
        data: null,
        message: "account not found",
      });
      return;
    }
    account.status = false;
    await myDataSource.getRepository(Account).save(account);
    res.status(200).json({
      status: "success",
      data: account,
      message: "Remove Success",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      data: error.message,
      message: "Problem with server",
    });
  }
};
