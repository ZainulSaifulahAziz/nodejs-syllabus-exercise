import http from "node:http";
import crypto from "crypto";

export function getRequestBody(req: http.IncomingMessage): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    let body: Record<string, any> = {};

    req.on('data', (data) => {
      data.toString().split("&").forEach((item: string) => {
        const convertedItem: Array<string> = item.split("=");
        body[`${convertedItem[0]}`] = convertedItem[1];
      });
    });

    req.on('end', () => {
      resolve(body)
    });
  });
}

export function getRequestParams(req: http.IncomingMessage) {
  let params: Record<string, any> = {};
  let q = req.url?.split('?') || [];
  if (q.length >= 2) {
    q[1]?.split('&').forEach((item) => {
      const convertedItem: string[] = item.split("=");
      params[`${convertedItem[0]}`] = convertedItem[1];
    })
  }
  return params;
}


// Helper function to generate a unique session ID
export function generateSessionId() {
  return crypto.randomBytes(16).toString('hex');
}

// Helper function to parse cookies from the request header
export function parseCookies(request: http.IncomingMessage) {
  const list: Record<string, any> = {};
  const rc = request.headers.cookie;
  rc && rc.split(';').forEach(function (cookie: string) {
    const parts = cookie.split('=');
    list[`${parts.shift()?.trim()}`] = decodeURI(parts.join('='));
  });
  return list;
}