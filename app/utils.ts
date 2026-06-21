import { Request, Response } from "express";
import crypto from "crypto";
import { config } from "./config";

export function createUrl(path: string) {
  return new URL(path, config.baseUrl).href;
}

export function generateSlug(length = 7) {
  return crypto
    .randomBytes(6)
    .toString("base64url")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, length);
}

export function wantsJson(req: Request): boolean {
  return req.accepts(["html", "json"]) === "json";
}

export function returnResponse(
  req: Request,
  res: Response,
  status: number,
  jsonResponse: () => object,
  htmlResponse: () => string,
) {
  if (wantsJson(req)) {
    return res.status(status).json(jsonResponse());
  }

  return res.status(status).send(htmlResponse());
}
