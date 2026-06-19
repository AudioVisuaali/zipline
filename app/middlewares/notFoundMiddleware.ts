import type { Request, Response } from "express";

export function notFoundMiddleware(_: Request, res: Response) {
  return res.status(404).json({ error: "Not found" });
}
