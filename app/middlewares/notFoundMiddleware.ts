import type { Request, Response } from "express";
import { renderGenericFailurePage } from "../templates/genericErrorPage";

export function notFoundMiddleware(_: Request, res: Response) {
  return res.status(404).send(renderGenericFailurePage("404", "Not found"));
}
