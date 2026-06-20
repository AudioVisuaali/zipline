import { Request } from "express";

export function wantsJson(req: Request): boolean {
  return req.accepts(["html", "json"]) === "json";
}
