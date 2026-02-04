import http from "node:http";
import { Router } from "./routes/router";
import { routes } from "./routes"
import { generateSessionId, parseCookies } from "./utils";

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOSTNAME || "localhost";
const sessions: Record<string, any> = {};

const router = new Router(routes);
const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
  const { method = "GET", url = "/" } = req;
  const cookies = parseCookies(req);
  let sessionId = cookies.sessionId;

  if (!sessionId || !sessions[sessionId]) {
    sessionId = generateSessionId();
    sessions[sessionId] = { sessionId, created: Date.now() };
    res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly; Path=/`);
  }

  const fullUrl = new URL(url, `http://${req.headers.host}`);
  const path = fullUrl.pathname;

  req.sessions = sessions[sessionId]

  await router.process(method, path, req, res)
});

server.listen(PORT, HOST);
server.on("listening", () => {
  console.log(`Server listening on port ${PORT}`);
})