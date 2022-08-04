import bodyParser from "body-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import { connect } from "http2";
import swaggerUi from "swagger-ui-express";
import { ConnectionOptionsReader } from "typeorm";
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
import { getSummary } from "./controllers/summary.controller";
import {
  createTransaction,
  deleteTransactionById,
  getAllTransactions,
  getTransactionById,
  updateTransactionById,
} from "./controllers/transactions.controller";
import { auth } from "./middleware/auth";
import myDataSource from "./models/db";
import swaggerSetup from "./swagger.json";

const app: Application = express();
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
// db
myDataSource
  .initialize()
  .then(async (connection) => {
    console.log("Data Source has been initialized!");
    // await connection.runMigrations();
    // await connection.synchronize()
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
app.get("/users/:userId", auth, getProfileUser);
// accounts
app.get("/accounts", auth, getAllAccounts);
app.post("/accounts", auth, createAccount);
app.get("/accounts/:accountId", auth, getAccountById);
app.put("/accounts/:accountId", auth, updateAccountById);
app.delete("/accounts/:accountId", auth, deleteAccountById);

// transactions
app.get("/transactions", auth, getAllTransactions);
app.post("/transactions", auth, createTransaction);
app.get("/transactions/:transactionId", auth, getTransactionById);
app.put("/transactions/:transactionId", auth, updateTransactionById);
app.delete("/transactions/:transactionId", auth, deleteTransactionById);
// summary
app.get("/summary", auth, getSummary);
export default app;
