import http from "node:http";

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT"
}

export enum Path {
  STYLING = "/index.css",
  HOME = "/",
  BALANCE = "/balance",
  LOGIN = "/login",
  LOGOUT = "/logout",
  TRANSACTION = "/transaction",
  TRANSFER = "/transfer",
  WITHDRAW = "/withdraw",
  DEPOSIT = "/deposit",
  FAVICON = "/favicon.ico",
}

export type Route = {
  method: Method,
  path: Path,
  action: Function
}

export enum Mutation {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT"
}