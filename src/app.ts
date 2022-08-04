import express, { Application, NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import {
  createAccount,
  deleteAccountById,
  getAccountById,
  getAllAccounts,
  updateAccountById,
} from "./controllers/accounts.controller";
import { userLogin, userRegister } from "./controllers/auth.controller";
import {
  getDailySummary,
  getMonthlySummary,
} from "./controllers/summary.controller";
import {
  createTransaction,
  deleteTransactionById,
  getAllTransactions,
  getTransactionById,
  updateTransactionById,
} from "./controllers/transactions.controller";
import swaggerSetup from "./swagger.json";

const app: Application = express();
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

// root
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "Paper.id Backend Engineer Test Case by David Fauzi",
  });
});
// auth
app.post("/login", userLogin);
app.post("/register", userRegister);
// accounts
app.get("/accounts", getAllAccounts);
app.post("/accounts", createAccount);
app.get("/accounts", getAccountById);
app.put("/accounts", updateAccountById);
app.delete("/accounts", deleteAccountById);

// transactions
app.get("/transactions", getAllTransactions);
app.post("/transactions", createTransaction);
app.get("/transactions", getTransactionById);
app.put("/transactions", updateTransactionById);
app.delete("/transactions", deleteTransactionById);
// summary
app.get("/daily", getDailySummary);
app.get("/monthly", getMonthlySummary);
export default app;
