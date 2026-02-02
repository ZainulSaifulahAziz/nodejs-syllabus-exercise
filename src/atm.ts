import inquirer from "inquirer";

import { mainMenu } from "./menu";
import { Account } from "./entity/account";

const accountA = new Account("1", "John Doe", "123456", 450, );
const accountB = new Account("2", "Michael Roe", "123456", 350);

const OPTIONS = {
  YES: 'Yes',
  NO: 'No',
};

function login() {
  inquirer
    .prompt([
      {
        type: 'password',
        message: 'Enter your PIN',
        name: 'pin',
        mask: '*',
      },
    ])
    .then((answers) =>
      answers.pin !== pin
        ? login()
        : mainMenu(showAccountBalance, withdraw, deposit, transfer)
    );
}

function confirmation() {
  inquirer
    .prompt({
      type: 'list',
      name: 'menu',
      message: 'Have any more transaction?',
      choices: Object.values(OPTIONS),
    })
    .then((answers) => {
      switch (answers.menu) {
        case OPTIONS.YES:
          mainMenu(showAccountBalance, withdraw, deposit, transfer);
          break;
        case OPTIONS.NO:
          login();
          break;
        default:
          break;
      }
    });
}

function showAccountBalance() {
  console.log(`Your Account Balance: $${balance}`);
  confirmation();
}

function _isSufficientBalance(amount: number) {
  return amount < balance;
}

function withdraw(amount: number) {
  if (_isSufficientBalance(amount)) {
    balance -= amount;
    console.log(`Withdraw success, you withdraw $${amount}`);
    console.log(`Your Account Balance: $${balance}`);
  } else {
    console.log(`Your Account Balance: $${balance}, is not sufficient to withdraw $${amount}`);
  }

  confirmation();
}

function deposit(amount: number) {
  balance += amount;
  console.log(`Deposit success, you deposit $${amount}`);
  console.log(`Your Account Balance: $${balance}`);

  confirmation();
}

function _isMatchAccountNumber(accountNumber: string) {
  return receiverAccount === accountNumber;
}

function transfer(receiverNumber: string, amount: number) {
  if (_isMatchAccountNumber(receiverNumber) && _isSufficientBalance(amount)) {
    balance -= amount;
    receiverBalance += amount;

    console.log(`Transfer $${amount} to ${receiverNumber} success`);
    console.log(`Your Account Balance: $${balance}`);
  } else if (!_isMatchAccountNumber(receiverNumber)) {
    console.log(`Account ${receiverNumber} not found`);
  } else if (!_isSufficientBalance(amount)) {
    console.log(`Your Account Balance: $${balance}, is not sufficient to transfer $${amount}`);
  }

  confirmation();
}

function main() {
  login();
}

main();