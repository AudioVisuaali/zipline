import type { Request, Response, NextFunction } from "express";

export function errorHandlerMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}
