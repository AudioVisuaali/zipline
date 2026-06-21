import { Request, Response, NextFunction } from "express";
import { renderGenericFailurePage } from "../templates/genericErrorPage";
import { returnResponse } from "../utils";

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

  return returnResponse(
    req,
    res,
    401,
    () => ({ error: "Invalid token" }),
    () => renderGenericFailurePage("401", "Invalid authorization"),
  );
}
