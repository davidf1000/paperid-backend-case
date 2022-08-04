import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Transaction } from "./transactions.model";
import { User } from "./user.models";

@Entity({ name: "Account" })
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  status: boolean;

  @ManyToOne((type) => User, (user) => user.accounts) user: User;

  @OneToMany((type) => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}
