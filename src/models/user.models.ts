import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Account } from "./accounts.model";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  username: string;

  @OneToMany((type) => Account, (account) => account.user) accounts: Account[];
}
