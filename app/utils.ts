import { Request, Response } from "express";
import crypto from "crypto";

const envValue = process.env.API_BASE_URL;
if (!envValue) {
  throw new Error("API_BASE_URL is missing");
}
if (!/^https?:\/\/.+/.test(envValue)) {
  throw new Error(
    "API_BASE_URL must be a valid URL starting with http:// or https://",
  );
}
export const apiBaseUrl = envValue;

export function createUrl(path: string) {
  return new URL(path, apiBaseUrl).href;
}

export function generateSlug(length = 7) {
  return crypto
    .randomBytes(6)
    .toString("base64url")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, length);
}

function wantsJson(req: Request): boolean {
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
