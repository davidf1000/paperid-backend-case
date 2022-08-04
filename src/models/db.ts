import { DataSource } from "typeorm";
import { Account } from "./accounts.model";
import { Transaction } from "./transactions.model";
import { User } from "./user.models";
import { config } from "dotenv";

config();

const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "finances",
  entities: [User, Account, Transaction],
  logging: false,
  synchronize: false,
});

export default dataSource;
