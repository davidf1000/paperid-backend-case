import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Account } from "./accounts.model";
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  amount: number;

  @Column()
  date: string;

  @ManyToOne((type) => Account, (account) => account.transactions)
  account: Account;
}
