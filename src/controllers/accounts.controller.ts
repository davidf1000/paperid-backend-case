import { NextFunction, Request, Response } from "express";
import { Account } from "../models/accounts.model";
import myDataSource from "../models/db";
import { User } from "../models/user.models";

export const getAllAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.page || 0),
      perPage = Number(req.query.perPage || 10);
    const [accounts, total] = await myDataSource
      .getRepository(Account)
      .findAndCount({
        where: { status: true },
        relations: {
          user: true,
        },
        take: perPage,
        skip: page * perPage,
      });
    let accountsFiltered = accounts;
    if (req.query.userId) {
      accountsFiltered = accountsFiltered.filter(
        (x) => x.user.id === req.query.userId
      );
    }
    res.status(200).json({
      status: "success",
      data: accountsFiltered,
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

export const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundDuplicateAccount = await myDataSource
      .getRepository(Account)
      .findOne({
        where: {
          name: req.body.name,
          status: true
        },
      });
    if (foundDuplicateAccount) {
      res.status(404).json({
        status: "error",
        data: null,
        message: "Cannot create duplicate financial account",
      });
      return;
    }
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
    const account = await myDataSource.getRepository(Account).save(newAccount);

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
