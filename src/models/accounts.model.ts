import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Transaction } from "./transactions.model";
import { User } from "./user.models";
@Entity()
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @ManyToOne((type) => User, (user) => user.accounts) user: User;

  @OneToMany((type) => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}
