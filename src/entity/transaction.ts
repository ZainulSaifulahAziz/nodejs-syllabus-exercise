export enum Mutation {
  DEBIT,
  CREDIT
}

export class Transaction {
  private date: Date;
  private description: string;
  private mutation: Mutation;
  private amount: number;
  private balance: number

  constructor(date: Date, description: string, mutation: Mutation, amount: number, balance: number){
    this.date = date;
    this.description = description;
    this.mutation = mutation;
    this.amount = amount;
    this.balance = balance;
  };
}