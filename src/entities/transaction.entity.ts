import { Mutation } from "../types";

export class Transaction {
  date: Date;
  description: string;
  mutation: Mutation;
  amount: number;
  balance: number

  constructor(date: Date, description: string, mutation: Mutation, amount: number, balance: number) {
    this.date = date;
    this.description = description;
    this.mutation = mutation;
    this.amount = amount;
    this.balance = balance;
  };
}