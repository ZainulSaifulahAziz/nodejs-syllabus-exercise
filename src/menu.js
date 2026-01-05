const inquirer = require('inquirer');
const MENU = {
  ACCOUNT_BALANCE: 'View account balance',
  WITHDRAW: 'Withdraw cash',
  DEPOSIT: 'Deposit cash',
  TRANSFER: 'Transfer funds',
};

function mainMenu(accountBalance, withdraw, deposit, transfer) {
  inquirer
    .prompt({
      type: 'list',
      name: 'menu',
      message: 'Welcome, Please select your transaction',
      choices: Object.values(MENU),
    })
    .then((answers) => {
      switch (answers.menu) {
        case MENU.ACCOUNT_BALANCE:
          accountBalanceMenu(accountBalance);
          break;
        case MENU.WITHDRAW:
          withdrawMenu(withdraw);
          break;
        case MENU.DEPOSIT:
          depositMenu(deposit);
          break;
        case MENU.TRANSFER:
          transferMenu(transfer);
          break;
        default:
          break;
      }
    });
}

function accountBalanceMenu(accountBalance) {
  accountBalance();
}

function withdrawMenu(withdraw) {
  inquirer
    .prompt({
      type: 'input',
      name: 'amount',
      message: 'Input amount of withdraw',
      validate(value) {
        const valid = !isNaN(parseInt(value));
        return valid || 'Please enter a number';
      },
      filter: Number,
    })
    .then((answers) => {
      withdraw(answers.amount);
    });
}

function depositMenu(deposit) {
  inquirer
    .prompt({
      type: 'input',
      name: 'amount',
      message: 'Input amount of deposit',
      validate(value) {
        const valid = !isNaN(parseInt(value));
        return valid || 'Please enter a number';
      },
      filter: Number,
    })
    .then((answers) => {
      deposit(answers.amount);
    });
}

function transferMenu(transfer) {
  inquirer
  .prompt([{
    type: 'input',
    name: 'receiverNumber',
    message: 'Input account number of receiver',
    validate(value) {
      const valid = !isNaN(parseInt(value));
      return valid || 'Please enter a number';
    },
  },
  {
    type: 'input',
    name: 'amount',
    message: 'Input amount of transfer',
    validate(value) {
      const valid = !isNaN(parseInt(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
  }])
  .then((answers) => {
    transfer(answers.receiverNumber, answers.amount);
  });
}

module.exports = {
  mainMenu,
};