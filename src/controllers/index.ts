import { readFileSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import process from "node:process";
import mustache from "mustache";

import AccountRepository from "../repositories/account.repository";
import { getRequestBody } from "../utils";

export default class ATMController {
  homePage(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
    const { id } = req.session;

    if (!id) {
      res.writeHead(302, { location: '/login' }).end();
      return;
    }

    const accountRepository = AccountRepository.getInstance();
    const account = accountRepository.findOne(id);

    const html = readFileSync(path.join(process.cwd(), "src/templates", 'home.html')).toString()
    const output = mustache.render(html, { name: account?.name, code: account?.code });

    res.setHeader("Content-Type", "text/html")
    res.write(output);
    res.end();
  }

  favicon(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
    const output = readFileSync(path.join(process.cwd(), "src/public", 'favicon.ico'))
    res.write(output);
    res.end();
  }

  transactionPage(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
    const { id } = req.session;

    if (!id) {
      res.writeHead(302, { location: '/login' }).end();
      return;
    }

    const accountRepository = AccountRepository.getInstance();
    const account = accountRepository.findOne(id);

    const html = readFileSync(path.join(process.cwd(), "src/templates", 'transaction.html')).toString()
    const output = mustache.render(html, { transactions: account?.transactions });

    res.setHeader("Content-Type", "text/html")
    res.write(output);
    res.end();
  }

  withdrawPage(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
    const { id } = req.session;

    if (!id) {
      res.writeHead(302, { location: '/login' }).end();
      return;
    }

    const html = readFileSync(path.join(process.cwd(), "src/templates", 'withdraw.html'))

    res.setHeader("Content-Type", "text/html")
    res.write(html);
    res.end();
  }

  depositPage(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
    const { id } = req.session;

    if (!id) {
      res.writeHead(302, { location: '/login' }).end();
      return;
    }

    const html = readFileSync(path.join(process.cwd(), "src/templates", 'deposit.html'))

    res.setHeader("Content-Type", "text/html")
    res.write(html);
    res.end();
  }

  transferPage(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
    const { id } = req.session;

    if (!id) {
      res.writeHead(302, { location: '/login' }).end();
      return;
    }

    const html = readFileSync(path.join(process.cwd(), "src/templates", 'transfer.html'))

    res.setHeader("Content-Type", "text/html")
    res.write(html);
    res.end();
  }

  balancePage(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
    const { id } = req.session;

    if (!id) {
      res.writeHead(302, { location: '/login' }).end();
      return;
    }

    const accountRepository = AccountRepository.getInstance();
    const account = accountRepository.findOne(id);

    const html = readFileSync(path.join(process.cwd(), "src/templates", 'balance.html')).toString()
    const output = mustache.render(html, { balance: account?.balance });


    res.setHeader("Content-Type", "text/html")
    res.write(output);
    res.end();
  }

  loginPage(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
    const { id } = req.session;

    if (id) {
      res.writeHead(302, { location: '/' }).end();
      return;
    }

    const html = readFileSync(path.join(process.cwd(), "src/templates", 'login.html'))

    res.setHeader("Content-Type", "text/html")
    res.write(html);
    res.end();
  }

  async login(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
    const body = await getRequestBody(req);
    const accountRepository = AccountRepository.getInstance();
    const account = accountRepository.findOneByCode(body.code)

    if (!account || account?.pin !== body.pin) {
      res.writeHead(302, { location: '/login' }).end();
      return;
    }

    req.session.id = account.id;
    res.writeHead(302, { location: `/` }).end();
    return;
  }

  async withdraw(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
    const { id } = req.session;
    let body = await getRequestBody(req);

    if (!id) {
      res.writeHead(302, { location: '/login' }).end();
      return;
    }

    const accountRepository = AccountRepository.getInstance();
    const account = accountRepository.findOne(id);
    account?.withdraw(Number(body.amount));
    accountRepository.updateOne(id, account!)

    res.writeHead(302, { location: `/` }).end();
    return;
  }

  async deposit(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
    const { id } = req.session;
    let body = await getRequestBody(req);

    if (!id) {
      res.writeHead(302, { location: '/login' }).end();
      return;
    }

    const accountRepository = AccountRepository.getInstance();
    const account = accountRepository.findOne(id);
    account?.deposit(Number(body.amount));
    accountRepository.updateOne(id, account!)

    res.writeHead(302, { location: `/` }).end();
    return;
  }

  async transfer(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
    const { id } = req.session;
    let body = await getRequestBody(req);

    if (!id) {
      res.writeHead(302, { location: '/login' }).end();
      return;
    }

    const accountRepository = AccountRepository.getInstance();
    const account = accountRepository.findOne(id);
    const receiverAccount = accountRepository.findOneByCode(body.accountNumber)

    account?.transferOut(Number(body.amount), receiverAccount!);
    accountRepository.updateOne(id, account!)
    accountRepository.updateOne(receiverAccount?.id!, receiverAccount!)

    res.writeHead(302, { location: `/` }).end();
    return;
  }

  async logout(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
    const { id } = req.session;

    if (!id) {
      res.writeHead(302, { location: '/login' }).end();
      return;
    }

    delete req.session.id;
    res.writeHead(302, { location: `/login` }).end();
    return;
  }
}