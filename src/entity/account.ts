import { Transaction, Mutation } from "./transaction";

export class Account {
  private id: string;
  private name: string;
  private pin: string;
  private balance: number;
  private transactions: Transaction[];

  constructor(id: string, name: string, pin: string, balance: number) {
    this.id = id;
    this.name = name;
    this.pin = pin;
    this.balance = balance;
    this.transactions = []
  }

  withdraw(amount: number): number {
    if (this.balance < amount) {
      throw new Error("Balance is suficient for withdraw")
    }

    this.balance -= amount;
    this.transactions.push(new Transaction(new Date(), "Cash Withdraw", Mutation.DEBIT, amount, this.balance));

    return this.balance;
  }

  deposit(amount: number): number {
    this.balance += amount;
    this.transactions.push(new Transaction(new Date(), "Cash Deposit", Mutation.CREDIT, amount, this.balance));

    return this.balance;
  }

  transferOut(amount: number, receiver: Account) {
    if (this.balance < amount) {
      throw new Error("Balance is suficient for transfer")
    }

    this.balance -= amount;
    this.transactions.push(new Transaction(new Date(), `Cash Transfer to ${receiver.name}`, Mutation.DEBIT, amount, this.balance));
    receiver.transferIn(amount, this);

    return this.balance;
  }

  transferIn(amount: number, sender: Account) {
    this.balance += amount;
    this.transactions.push(new Transaction(new Date(), `Cash Transfer from ${sender.name}`, Mutation.CREDIT, amount, this.balance));

    return this.balance;
  }
}