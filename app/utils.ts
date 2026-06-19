import crypto from "crypto";

export function generateSlug() {
  return crypto.randomBytes(6).toString("base64url").slice(0, 8);
}
