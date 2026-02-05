import http from "node:http";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

import { Route } from "../types";

export class Router {
  private routes: Route[];

  constructor(routes: Route[]) {
    this.routes = routes;
  }

  async process(method: string, path: string, req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
    const route = this.routes.find((item) => item?.method === method && item.path === path)

    if (!route) {
      res.statusCode = 404;
      res.end("Not Found");

      return;
    }

    try {
      await route?.action(req, res);
    } catch (error) {
      const output = readFileSync(join(process.cwd(), "src/templates", 'error.html'))
      res.write(output);
      res.end();
    }
  }
}