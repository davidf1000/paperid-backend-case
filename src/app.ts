import express, { Application, NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import {
  createAccount,
  deleteAccountById,
  getAccountById,
  getAllAccounts,
  updateAccountById,
} from "./controllers/accounts.controller";
import {
  getProfileUser,
  userLogin,
  userRegister,
} from "./controllers/auth.controller";
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
import myDataSource from "./models/db";
import swaggerSetup from "./swagger.json";

const app: Application = express();
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
// db
myDataSource
  .initialize()
  .then(async (connection) => {
    console.log("Data Source has been initialized!");
    await connection.runMigrations();
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// root
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "Paper.id Backend Engineer Test Case by David Fauzi",
  });
});
// auth
app.post("/login", userLogin);
app.post("/register", userRegister);
app.get("/users:userId", getProfileUser);
// accounts
app.get("/accounts", getAllAccounts);
app.post("/accounts", createAccount);
app.get("/accounts/:accountId", getAccountById);
app.put("/accounts/:accountId", updateAccountById);
app.delete("/accounts/:accountId", deleteAccountById);

// transactions
app.get("/transactions", getAllTransactions);
app.post("/transactions", createTransaction);
app.get("/transactions/:transactionId", getTransactionById);
app.put("/transactions/:transactionId", updateTransactionById);
app.delete("/transactions/:transactionId", deleteTransactionById);
// summary
app.get("/daily", getDailySummary);
app.get("/monthly", getMonthlySummary);
export default app;
