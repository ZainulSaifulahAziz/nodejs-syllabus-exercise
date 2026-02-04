import ATMController from "../controllers";
import { Method, Path, Route } from "../types";

const atmController = new ATMController();

export const routes: Route[] = [
  { method: Method.GET, path: Path.HOME, action: atmController.homePage },
  { method: Method.GET, path: Path.LOGIN, action: atmController.loginPage },
  { method: Method.GET, path: Path.BALANCE, action: atmController.balancePage },
  { method: Method.GET, path: Path.WITHDRAW, action: atmController.withdrawPage },
  { method: Method.GET, path: Path.DEPOSIT, action: atmController.depositPage },
  { method: Method.GET, path: Path.TRANSFER, action: atmController.transferPage },
  { method: Method.GET, path: Path.TRANSACTION, action: atmController.transactionPage },
  { method: Method.GET, path: Path.LOGOUT, action: atmController.logout },
  { method: Method.GET, path: Path.FAVICON, action: atmController.favicon },
  { method: Method.POST, path: Path.LOGIN, action: atmController.login },
  { method: Method.POST, path: Path.WITHDRAW, action: atmController.withdraw },
  { method: Method.POST, path: Path.DEPOSIT, action: atmController.deposit },
  { method: Method.POST, path: Path.TRANSFER, action: atmController.transfer },
]