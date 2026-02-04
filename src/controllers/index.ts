import { readFileSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import process from "node:process";
import mustache from "mustache";

import AccountRepository from "../repositories/account.repository";
import { getRequestBody } from "../utils";
import { IncomingMessage } from "../types";

export default class ATMController {
  homePage(req: IncomingMessage, res: http.ServerResponse<IncomingMessage>) {
    const { id } = req.sessions;

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

  favicon(req: IncomingMessage, res: http.ServerResponse<IncomingMessage>) {
    const output = readFileSync(path.join(process.cwd(), "src/public", 'favicon.ico'))
    res.write(output);
    res.end();
  }

  transactionPage(req: IncomingMessage, res: http.ServerResponse<IncomingMessage>) {
    const { id } = req.sessions;

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

  withdrawPage(req: IncomingMessage, res: http.ServerResponse<IncomingMessage>) {
    const { id } = req.sessions;

    if (!id) {
      res.writeHead(302, { location: '/login' }).end();
      return;
    }

    const html = readFileSync(path.join(process.cwd(), "src/templates", 'withdraw.html'))

    res.setHeader("Content-Type", "text/html")
    res.write(html);
    res.end();
  }

  depositPage(req: IncomingMessage, res: http.ServerResponse<IncomingMessage>) {
    const { id } = req.sessions;

    if (!id) {
      res.writeHead(302, { location: '/login' }).end();
      return;
    }

    const html = readFileSync(path.join(process.cwd(), "src/templates", 'deposit.html'))

    res.setHeader("Content-Type", "text/html")
    res.write(html);
    res.end();
  }

  transferPage(req: IncomingMessage, res: http.ServerResponse<IncomingMessage>) {
    const { id } = req.sessions;

    if (!id) {
      res.writeHead(302, { location: '/login' }).end();
      return;
    }

    const html = readFileSync(path.join(process.cwd(), "src/templates", 'transfer.html'))

    res.setHeader("Content-Type", "text/html")
    res.write(html);
    res.end();
  }

  balancePage(req: IncomingMessage, res: http.ServerResponse<IncomingMessage>) {
    const { id } = req.sessions;

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

  loginPage(req: IncomingMessage, res: http.ServerResponse<IncomingMessage>) {
    const { id } = req.sessions;

    if (id) {
      res.writeHead(302, { location: '/' }).end();
      return;
    }

    const html = readFileSync(path.join(process.cwd(), "src/templates", 'login.html'))

    res.setHeader("Content-Type", "text/html")
    res.write(html);
    res.end();
  }

  async login(req: IncomingMessage, res: http.ServerResponse<IncomingMessage>) {
    const body = await getRequestBody(req);
    const accountRepository = AccountRepository.getInstance();
    const account = accountRepository.findOneByCode(body.code)

    if (!account || account?.pin !== body.pin) {
      res.writeHead(302, { location: '/login' }).end();
      return;
    }

    req.sessions.id = account.id;
    res.writeHead(302, { location: `/` }).end();
    return;
  }

  async withdraw(req: IncomingMessage, res: http.ServerResponse<IncomingMessage>) {
    const { id } = req.sessions;
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

  async deposit(req: IncomingMessage, res: http.ServerResponse<IncomingMessage>) {
    const { id } = req.sessions;
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

  async transfer(req: IncomingMessage, res: http.ServerResponse<IncomingMessage>) {
    const { id } = req.sessions;
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

  async logout(req: IncomingMessage, res: http.ServerResponse<IncomingMessage>) {
    const { id } = req.sessions;

    if (!id) {
      res.writeHead(302, { location: '/login' }).end();
      return;
    }

    delete req.sessions.id;
    res.writeHead(302, { location: `/login` }).end();
    return;
  }
}