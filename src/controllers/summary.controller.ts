import { NextFunction, Request, Response } from "express";
import myDataSource from "../models/db";
import { Transaction } from "../models/transactions.model";

export const getSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const date = req.query.date,
      type = req.query.type,
      userId = req.query.userId,
      financialId = req.query.financialId;
    // date is a must, type is a must
    // to query, must input either of user(profile) or financial account id, or both
    if (
      !type ||
      !date ||
      !Date.parse(String(date)) ||
      (!userId && !financialId)
    ) {
      res.status(400).json({
        status: "error",
        data: null,
        message: "Invalid request",
      });
      return;
    }

    // fetch transactions
    const transactions = await myDataSource.getRepository(Transaction).find({
      where: { status: true },
      relations: {
        account: {
          user: true,
        },
      },
    });

    // filter for each query
    // date
    const transactionsDate = transactions.filter((x) => {
      const date1 = new Date(x.date);
      const date2 = new Date(String(date));
      if (type === "daily") {
        return (
          date1.getUTCFullYear() === date2.getUTCFullYear() &&
          date1.getUTCMonth() === date2.getUTCMonth() &&
          date1.getUTCDate() === date2.getUTCDate()
        );
      } else {
        return (
          date1.getUTCFullYear() === date2.getUTCFullYear() &&
          date1.getUTCMonth() === date2.getUTCMonth()
        );
      }
    });
    let filteredTransactions = transactionsDate;

    // userId
    if (userId) {
      filteredTransactions = filteredTransactions.filter(
        (x) => x.account.user.id === userId
      );
    }
    // financialId
    if (financialId) {
      filteredTransactions = filteredTransactions.filter(
        (x) => x.account.id === financialId
      );
    }
    // calculate
    // totalExpense
    // totalIncome
    // netIncome
    // maximumExpense (transaction object)
    let totalExpense = 0,
      totalIncome = 0,
      maximumExpense: any = null;

    filteredTransactions.forEach((x) => {
      if (x.amount > 0) {
        totalIncome += x.amount;
      } else {
        totalExpense += x.amount;
      }
      if (!maximumExpense) {
        maximumExpense = x;
      } else {
        if (x.amount > maximumExpense.amount) {
          maximumExpense = x;
        }
      }
    });

    res.status(200).json({
      status: "success",
      data: {
        type: type,
        totalIncome,
        totalExpense: totalExpense * -1,
        netIncome: totalIncome + totalExpense,
        maximumExpense,
      },
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
