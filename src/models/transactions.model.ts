import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Account } from "./accounts.model";
@Entity({ name: "Transaction" })
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  amount: number;

  @Column()
  date: string;

  @Column({ default: true })
  status: boolean;

  @ManyToOne((type) => Account, (account) => account.transactions)
  account: Account;
}
