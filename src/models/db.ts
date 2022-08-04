import { DataSource } from "typeorm";
import { Account } from "./accounts.model";
import { Transaction } from "./transactions.model";
import { User } from "./user.models";

const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "finances",
  entities: [User, Account, Transaction],
  logging: false,
  synchronize: false
});

export default myDataSource;
