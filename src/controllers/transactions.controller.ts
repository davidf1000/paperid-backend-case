import express, { Application, NextFunction, Request, Response } from "express";
import { Account } from "../models/accounts.model";
import myDataSource from "../models/db";
import { Transaction } from "../models/transactions.model";

export const getAllTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transactions = await myDataSource.getRepository(Transaction).find({
      where: { status: true },
      relations: {
        account: true,
      },
    });
    res.status(200).json({
      status: "success",
      data: transactions,
      message: "Get all transactions success",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      data: error.message,
      message: "Problem with server",
    });
  }
};

export const getTransactionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transaction = await myDataSource.getRepository(Transaction).findOne({
      where: { id: req.params.transactionId, status: true },
      relations: {
        account: true,
      },
    });
    if (!transaction) {
      res.status(404).json({
        status: "error",
        data: null,
        message: "transaction not found",
      });
      return;
    }
    console.log(transaction);

    res.status(200).json({
      status: "success",
      data: transaction,
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

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundAccount = await myDataSource.getRepository(Account).findOne({
      where: {
        id: req.body.financialId,
        status: true,
      },
    });
    if (!foundAccount) {
      res.status(404).json({
        status: "error",
        data: null,
        message: "Account not found for this transaction",
      });
      return;
    }
    console.log(foundAccount);

    const newTransaction = new Transaction();
    const { title, desc, amount, date } = req.body;
    newTransaction.title = title;
    newTransaction.desc = desc;
    newTransaction.amount = amount;
    newTransaction.date = date;
    newTransaction.account = foundAccount;
    console.log(newTransaction);

    const transaction = await myDataSource
      .getRepository(Transaction)
      .save(newTransaction);
    res.status(201).json({
      status: "success",
      data: transaction,
      message: "update transaction success",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      data: error.message,
      message: "Problem with server",
    });
  }
};

export const updateTransactionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transaction = await myDataSource.getRepository(Transaction).findOne({
      where: { id: req.params.transactionId, status: true },
      relations: {
        account: true,
      },
    });
    if (!transaction) {
      res.status(404).json({
        status: "error",
        data: null,
        message: "transaction not found",
      });
      return;
    }
    const { title, desc, amount, date } = req.body;
    transaction.title = title;
    transaction.desc = desc;
    transaction.amount = amount;
    transaction.date = date;
    await myDataSource.getRepository(Transaction).save(transaction);
    res.status(200).json({
      status: "success",
      data: transaction,
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

export const deleteTransactionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transaction = await myDataSource.getRepository(Transaction).findOne({
      where: { id: req.params.transactionId, status: true },
      relations: {
        account: true,
      },
    });
    if (!transaction) {
      res.status(404).json({
        status: "error",
        data: null,
        message: "transaction not found",
      });
      return;
    }
    transaction.status = false;
    await myDataSource.getRepository(Transaction).save(transaction);
    res.status(200).json({
      status: "success",
      data: transaction,
      message: "Delete Success",
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      data: error.message,
      message: "Problem with server",
    });
  }
};
