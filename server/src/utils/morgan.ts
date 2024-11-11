import { Request, Response } from "express";
import { TokenIndexer } from "morgan";

export default function colorfulMorganFormat(
  tokens: TokenIndexer,
  req: Request,
  res: Response
) {
  const method = tokens.method(req, res);
  const url = tokens.url(req, res);
  const status = tokens.status(req, res);
  const responseTime = tokens["response-time"](req, res);
  const requestBody = JSON.stringify(req.body);
  const responseBody = JSON.stringify(res.locals.body);

  const colors: Record<string, string> = {
    GET: "\x1b[36m",
    POST: "\x1b[32m",
    PUT: "\x1b[33m",
    DELETE: "\x1b[31m",
    status:
      Number(status) >= 500
        ? "\x1b[31m"
        : Number(status) >= 400
          ? "\x1b[33m"
          : "\x1b[32m",
    responseTime: Number(responseTime) >= 1000 ? "\x1b[31m" : "\x1b[32m",
    reset: "\x1b[0m",
  };
  return [
    colors[method] + method,
    url,
    "Request Body: " + requestBody,
    "Response Body: " + responseBody,
    colors.status + status,
    res.getHeader("content-length") || 0,
    "-",
    colors.responseTime + responseTime + "ms",
    colors.reset,
  ].join(" ");
}
