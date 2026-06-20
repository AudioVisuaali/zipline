import { Request, Response, NextFunction } from "express";
import { wantsJson } from "../accept";
import { renderGenericFailurePage } from "../templates/genericErrorPage";

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY is missing");
}

export function requireAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.body.secret === apiKey) {
    return next();
  }
  if (wantsJson(req)) {
    return res.status(401).json({ error: "Invalid token" });
  }

  return res
    .status(401)
    .send(renderGenericFailurePage("401", "Invalid authorization"));
}
