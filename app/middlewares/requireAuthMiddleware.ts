import { Request, Response, NextFunction } from "express";

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY is missing");
}

export function requireAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or invalid authorization header" });
  }

  const token = authHeader.slice(7);

  if (token !== apiKey) {
    return res.status(401).json({ error: "Invalid token" });
  }

  next();
}
