import path from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import process from "node:process";

import { Account } from "../entities/account.entity";

export default class AccountRepository {
  private static instance: AccountRepository;
  private accounts: Account[];

  private constructor() {
    const accountData = readFileSync(path.join(process.cwd(), "src/data", 'account.json'), 'utf8');
    this.accounts = JSON.parse(accountData).map((account: Account) => {
      return new Account(account.id, account.code, account.name, account.pin, account.balance, account.transactions)
    });
  }

  public static getInstance(): AccountRepository {
    if (!AccountRepository.instance) {
      AccountRepository.instance = new AccountRepository();
    }
    return AccountRepository.instance;
  }

  public findOne(id: string) {
    return this.accounts.find((account: Account) => account.id === id);
  }

  public findOneByCode(code: string) {
    return this.accounts.find((account: Account) => account.code === code);
  }

  public updateOne(id: string, data: Account) {
    const accountIndex = this.accounts.findIndex((account) => account.id === id);
    this.accounts[accountIndex] = data;
    writeFileSync(path.join(process.cwd(), "src/data", 'account.json'), JSON.stringify(this.accounts), 'utf8');

    return data;
  }
}